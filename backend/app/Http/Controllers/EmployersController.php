<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class EmployersController extends Controller
{

    public function index()
    {

        $users = User::where('role_id', 1)->get();

        return response()->json(['success' => true, 'data' => $users], 200);    
        
    }

    public function show($id)
    {

        $users = DB::table('users')->where('id', $id)->get();

        return response()->json(['success' => true, 'data' => $users], 200);
    }

}
