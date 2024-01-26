<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\Employees;
use App\Models\User;


class EmployersController extends Controller
{

    public function index()
    {
        // $cars = Car::select('id', 'photo1', 'photo2', 'brand', 'model', 'fuel_type', 'price', 'gearbox', 'available')
        //     ->get();

        $employees = Employees::select('id', 'user_id', 'education', 'experience', 'interests', 'skills', 'languages', 'portfolio', 'success', 'expected_salary', 'photo')
            ->get();

        $users = User::select('id', 'firstname', 'lastname', 'telephone', 'email', 'role_id')
            ->where('role_id', '=', '1')
            ->get();    
        // return response()->json(['success' => true, 'data' => $cars], 200);    
        return response()->json(['success' => true, 'data' => [$employees, $users]], 200);    
        
    }

}
