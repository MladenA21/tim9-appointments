<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * @group Users/Organizations
 */
class UsersController extends Controller
{

    /**
     * Get all organizations
     * @authenticated
     */
    public function all_organizations() {
        $organizations = User::selectRaw('id, name, days, time_from, time_to')->where('type', 'organization')->get()->toArray();
        
        for($i=0;$i < count($organizations); $i++) {
            $organizations[$i]['days'] = json_decode($organizations[$i]['days']);
        }

        return response()->json($organizations, 200);
    }
}
