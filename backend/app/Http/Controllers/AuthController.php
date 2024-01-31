<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(){
        $credentials = request(['email', 'password']);
        if(!$token = auth()->attempt($credentials)){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = Auth::user();
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'firstname' => $user->firstname,
                'lastname'=> $user->lastname,
                'role_id' => $user->role_id,
            ],
            'token_type' => 'bearer',

            'expires_in' => Auth::factory()->getTTL() * 60
        ]);

    }

    public function logout(){
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token){
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',

            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }

    public function me(){
        return response()->json(auth()->user());
    }

    public function getUserDetails(){
        $user = Auth::user();
        return response()->json([
            'user' => [
                'id' => $user->id,
                'firstname' => $user->firstname,
                'lastname'=> $user->lastname,
                'role_id' => $user->role_id,
                'email' => $user->email,
                'telephone' => $user->telephone,
                'education' => $user->education,
                'experience' => $user->experience,
                'interests' => $user->interests,
                'skills' => $user->skills,
                'languages' => $user->languages,
                'portfolio' => $user->portfolio,
                'successes' => $user->successes,
                'expected_salary' => $user->expected_salary,
                'expected_job' => $user->expected_job,
                'company_name' => $user->company_name,
                'company_address' => $user->company_address,
            ]
        ]);
    }

    public function refresh(){
        return $this->respondWithToken(Auth::refresh());
    }
}
