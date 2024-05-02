<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ReservationsController;
use App\Http\Controllers\API\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('session', [AuthController::class, 'session']);

    Route::get('/organization/{id}/days-and-time', [ReservationsController::class, 'allowed_days_and_timeslots']);

    Route::get('/organization/{id}/reservations',                       [ReservationsController::class, 'reservations']);
    Route::delete('/organization/{id}/reservations/{reservation_id}',   [ReservationsController::class, 'destroy']);
    Route::post('reserve',                                              [ReservationsController::class, 'reserve']);

    Route::get('organizations', [UsersController::class, 'all_organizations']);
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
