<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReseravtionRequest;
use App\Models\Reservation;
use App\Models\User;
use Carbon\Carbon;


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
     * 1. Validates if the date is in the future.
     * 2. Validates if the datetime passed is in coordination with the days and work hours provided from the organization.
     * 
     * @authenticated
     */
    public function reserve(ReseravtionRequest $request) {
        $data = $request->validated();
        $organization = User::where('id', $data['organization'])->where('type', 'organization')->first();
        $data['dateTime'] = Carbon::parse($data['dateTime']);

        if($data['dateTime'] <= Carbon::now()) {
            return response()->json(['message' => "Can't make a reservation in the past"]);
        }

        if(is_null($organization)) {
            return response()->json(['message' => "Organization doesn't exist"], 404);
        }

        if(!in_array($data['dateTime']->dayName, json_decode($organization->days))) {
            return response()->json(['message' => "The organization doesn't work that day of the week.", 'allowed_days' => json_decode($organization->days)], 404);   
        }

        if(!($organization->time_from <= (int)$data['dateTime']->format('H') && $organization->time_to >= (int)$data['dateTime']->format('H'))) {
            return response()->json([
                'message' => "The organization doesn't work those hours of the day.", 
                'time_from' => $organization->time_from,
                'time_to' => $organization->time_to,
            ], 404);
        }

        Reservation::create([
            'user_id' => $data['organization'],
            'reserved_from' => auth()->user() ? auth()->user()->id :  null,
            'dateTime' => $data['dateTime']
        ]);

        return response(['Message' => 'reservation successfully submitted']);
    }

    /**
     * Get all the reservations from the requested organization
     * @authenticated
     */
    public function reservations($id) {
        $reservations = Reservation::with(['organization' => function($q) {
            return $q->selectRaw('id, name, days, time_from, time_to');
        }, 'reserved_from' => function($q) {
            return $q->selectRaw('id, name, email');
        }])->where('user_id', $id)->get()->toArray();

        if(count($reservations) == 0) {
            return response()->json(['message'=> "The organization doesn't have any reservations yet"], 404);
        }

        for($i=0;$i < count($reservations); $i++) {
            $reservations[$i]['organization']['days'] = json_decode($reservations[$i]['organization']['days']);
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
}
