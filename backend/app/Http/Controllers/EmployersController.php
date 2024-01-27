<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class EmployersController extends Controller
{

    public function index()
    {

        $users = User::where('role_id', 1)->get();

        return response()->json(['success' => true, 'data' => $users], 200);    
        
    }

}
