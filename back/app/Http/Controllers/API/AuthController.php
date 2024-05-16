<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

/**
 * @group Authentication
 */
class AuthController extends Controller
{
    /**
     * Active user session
     *
     * This endpoint returns the active users/organizations info.
     * @authenticated
     */
    public function session()
    {
        $user = User::find(auth()->user()->id)->toArray();
        return response()->json([...$user , 'days' => json_decode($user['days'])], 200);
    }


    /**
     * Logout
     */
    public function logout()
    {
        $user = User::find(Auth::user()->id);
        $user->tokens()->delete();

        return response()->json(['message' => 'logged out.'], 200)
        ->withCookie(Cookie::forget('auth_token'));
    }

    /**
     * Register
     */
    public function register(AuthRequest $request)
    {
        $data = $request->validated();

        $data['days'] = json_encode($data['days']);
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        $success['token'] =  $user->createToken('auth_token')->plainTextToken;
        $success['name'] =  $user->name;

        return response()->json($user, 200)->withCookie(Cookie::make("auth_token", $success['token'], 60 * 60 * 8));
    }

    /**
     * Login
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::find(Auth::user()->id);
            $token = $user->createToken('auth_token')->plainTextToken;
            $success['name'] =  $user->name;
            $success['success'] =  true;
            return response()->json($user, 200)
            ->withCookie(Cookie::make("auth_token", $token, 60 * 60 * 8));
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
}
