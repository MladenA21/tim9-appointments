<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\FreeSlotsRequest;
use App\Http\Requests\ReseravtionRequest;
use App\Models\Reservation;
use App\Models\User;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Request;
use TypeError;

/**
 * @group Reservations
 */
class ReservationsController extends Controller
{
    /**
     * Get allowed days and work hours for booking for specific organization
     * @authenticated
     */
    public function allowed_days_and_timeslots($id) {

        $organization = User::selectRaw('id, name, days, time_from, time_to')->where('type', 'organization')->where('id', $id)->first();

        if(is_null($organization)) {
            return response()->json(['message' => 'organization doesnt exist'], 404);
        }

        return response()->json([
            'days' => json_decode($organization->days),
            'time_from' => $organization->time_from,
            'time_to' => $organization->time_to,
        ], 200);
    }


    /**
     * Make a reservation
     * 
     * This route has an extra layer of validation.
     * 1. If the date is in the future.
     * 2. If the datetime passed is in coordination with the days and work hours provided from the organization.
     * 3. If the time slot is already taken for the organization
     * @authenticated
     */
    public function reserve(ReseravtionRequest $request) {
        $data = $request->validated();
        $organization = User::where('id', $data['organization'])->where('type', 'organization')->first();
        $data['dateTime'] = Carbon::parse($data['dateTime']);

        // Check if date is in the past
        if($data['dateTime'] <= Carbon::now()) {
            return response()->json(['message' => "Can't make a reservation in the past"]);
        }

        // Check if organization exists
        if(is_null($organization)) {
            return response()->json(['message' => "Organization doesn't exist"], 404);
        }

        // Check if the organization works that day
        if(!in_array($data['dateTime']->dayName, json_decode($organization->days))) {
            return response()->json(['message' => "The organization doesn't work that day of the week.", 'allowed_days' => json_decode($organization->days)], 404);   
        }

        // Check if the organization works those hours
        if(!($organization->time_from <= (int)$data['dateTime']->format('H') && $organization->time_to > (int)$data['dateTime']->format('H'))) {
            return response()->json([
                'message' => "The organization doesn't work those hours of the day.", 
                'time_from' => $organization->time_from,
                'time_to' => $organization->time_to,
            ], 404);
        }

        // Check if slot is taken
        if(!is_null(Reservation::where('user_id', $data['organization'])->where(function($q) use($data) {
            return $q->whereBetween('dateTime', [
                $data['dateTime']->copy()->subMinutes($data['dateTime']->minute)->subSeconds($data['dateTime']->second + 1),
                $data['dateTime']->copy()->subMinutes($data['dateTime']->minute)->subSeconds($data['dateTime']->second + 1)->addHour()
            ])->orWhere('dateTime', '=',  $data['dateTime']);
        })->first())) {
            return response()->json(['message' => "Reservation slot is already taken"], 400);
        }

        Reservation::create([
            'user_id' => $data['organization'],
            'reserved_from' => auth()->user() ? auth()->user()->id :  null,
            'dateTime' => $data['dateTime']->copy()->subMinutes($data['dateTime']->minute)->subSeconds($data['dateTime']->second)
        ]);

        return response(['Message' => 'reservation successfully submitted']);
    }

    /**
     * Get all the reservations from the requested organization
     * @authenticated
     */
    public function reservations($id) {
        $reservations = Reservation::with(['organization' => function($q) {
            return $q->selectRaw('id, name, time_from, time_to');
        }, 'reserved_from' => function($q) {
            return $q->selectRaw('id, name, email');
        }])->where('user_id', $id)->latest()->get()->toArray();

        if(count($reservations) == 0) {
            return response()->json(['message'=> "The organization doesn't have any reservations yet"], 404);
        }

        return response()->json($reservations, 200);
    }

    /**
     * Delete the reservation
     * @authenticated
     */
    public function destroy($id, $reservation_id) {
        $reservations = Reservation::where('id',$reservation_id)->where('user_id', $id)->first();

        if(is_null($reservations)) {
            return response()->json(['message'=> "Reservation doesn't exist"], 404);
        }

        $reservations->delete();
        return response()->json(['message' => 'Sucessfully deleted reservation'], 200);
    }

    /**
     * All reservations for the day
     * @authenticated
    */
    public function reservations_for_the_day(FreeSlotsRequest $request, $id) {
        $org = User::where('type', 'organization')->find($id);
        $reservations = Reservation::with(['organization' => function($q) {
            return $q->selectRaw('id, name, time_from, time_to');
        }, 'reserved_from' => function($q) {
            return $q->selectRaw('id, name, email');
        }])->where('user_id', $id)->whereDate('dateTime', Carbon::parse($request->get('date'))->format('Y-m-d'))->orderBy('dateTime', 'asc')->get();


        if(is_null($org)) {
            return response()->json(['message' =>  "Organization doesn't exist", 404]);
        }

        if(!in_array(Carbon::parse($request->get('date'))->dayName, json_decode($org->days))) {
            return response()->json(['message' => "The organization doesn't work that day of the week.", 'allowed_days' => json_decode($org->days)], 404);   
        }
        
        return response()->json($reservations, 200);
    }


    /**
     * Free slots for the day
     * @authenticated
     */
    public function free_slots_of_the_day(FreeSlotsRequest $request, $id) {
        
        $org = User::where('type', 'organization')->find($id);
        $reservaations = Reservation::where('user_id', $id)->whereDate('dateTime', Carbon::parse($request->get('date'))->format('Y-m-d'))->orderBy('dateTime', 'asc')->get();
        
        if(is_null($org)) {
            return response()->json(['message' =>  "Organization doesn't exist", 404]);
        }

        if(!in_array(Carbon::parse($request->get('date'))->dayName, json_decode($org->days))) {
            return response()->json(['message' => "The organization doesn't work that day of the week.", 'allowed_days' => json_decode($org->days)], 404);   
        }
        
        $slots = [];

        for($i=$org->time_from;$i<$org->time_to;$i++) {
            $shouldAdd = true;

            foreach($reservaations as $reservation) {
                if((int)Carbon::parse($reservation->dateTime)->format('H') == $i) {
                    $shouldAdd = false;
                }
            }

            if($shouldAdd) {
                array_push($slots, $i);
            }
        }
        
        return response()->json($slots, 200);
    }
}
