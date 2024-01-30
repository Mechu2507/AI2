<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\EmployersController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\RoleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('signup', [UserController::class, 'signup']);

// Route::post('login', [UserController::class, 'login']);

Route::get('users', [UserController::class, 'index']);



//Route::get('logout', [UserController::class, 'logout']);

Route::get('rents', [RentController::class, 'index']);

Route::post('rents', [RentController::class, 'store']);


Route::get('/users/{user_id}/rents', [RentController::class, 'getUserRents']);

Route::put('/user/{user_id}', [UserController::class, 'updateProfile']);

Route::delete('/rents/{id}', [RentController::class, 'destroy']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::put('rents/{id}', [RentController::class, 'update']);
Route::put('users/{id}', [UserController::class, 'update']);


Route::get('roles', [RoleController::class, 'index']);

Route::get('employees', [EmployeesController::class, 'index']);

Route::get('employers', [EmployersController::class, 'index']);
Route::get('employers/{id}', [EmployersController::class, 'show']);

Route::post('invites', [EmployersController::class, 'store']);
Route::get('/users/{user_id}/invites', [EmployersController::class, 'getUserInvites']);
Route::get('/users/{user_id}/archives', [EmployersController::class, 'getUserArchives']);
Route::put('invites/{id}/update-status', [EmployersController::class, 'updateStatus']);
Route::post('saved', [EmployersController::class, 'save']);
Route::get('/forlater/{employers_user_id}', [EmployersController::class, 'forlater']);

Route::get('complete_employer', [UserController::class, 'complete']);
Route::get('complete_employee', [UserController::class, 'complete']);

Route::get('getUserDetails', [AuthController::class, 'getUserDetails']);

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);

});
