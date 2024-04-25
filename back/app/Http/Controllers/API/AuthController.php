<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function session()
    {
        return response()->json(User::find(auth()->user()->id), 200);
    }

    public function logout()
    {
        $user = User::find(Auth::user()->id);
        $user->tokens()->delete();

        return response()->json(['message' => 'logged out.'], 200)
        ->withCookie(Cookie::forget('auth_token'));
    }


    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed',
        ]);

        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        $success['token'] =  $user->createToken('auth_token')->plainTextToken;
        $success['name'] =  $user->name;

        return response()->json($success, 200)->withCookie(Cookie::make("auth_token", $success['token'], 60 * 60 * 8));;
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::find(Auth::user()->id);
            $token = $user->createToken('auth_token')->plainTextToken;
            $success['name'] =  $user->name;
            $success['success'] =  true;
            return response()->json($success, 200)
            ->withCookie(Cookie::make("auth_token", $token, 60 * 60 * 8));
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
}
