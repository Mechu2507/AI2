<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Models\Save;


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

    public function store(Request $request)
    {
        
        $invite = DB::table('invitations')->insert([
            'employees_user_id' => $request->input('employees_user_id'),
            'employers_user_id' => $request->input('employers_user_id'),
            'status_id' => $request->input('status_id'),
            'call_date' => $request->input('call_date')
        ]);
        
        return response()->json(['success' => true, 'data' => $invite], 201);
    }

    public function getUserInvites($employers_user_id)
    {
        $invitations = Invitation::with(['employee', 'status'])
                              ->where('employers_user_id', $employers_user_id)
                              ->whereHas('status', function($query) {
                                $query->where('id', 1);
                              })
                              ->get();

        $employeeDetails = $invitations->map(function($invitation) {
            $employee = $invitation->employee;
            return [
                'id' => $invitation->id,
                'user_id' => $employee->id, 
                'firstname' => $employee->firstname,
                'lastname' => $employee->lastname,
                'telephone' => $employee->telephone,
                'email' => $employee->email,
                'expected_salary' => $employee->expected_salary,
                'expected_job' => $employee->expected_job,
                'call_date' => $invitation->call_date,
                'status' => $invitation->status->status
            ];
        });

        return response()->json(['success' => true, 'data' => $employeeDetails]);
    }

    public function getUserArchives($employers_user_id)
    {
        $invitations = Invitation::with(['employee', 'status'])
                              ->where('employers_user_id', $employers_user_id)
                              ->whereHas('status', function($query) {
                                  $query->whereIn('id', [2, 3]);
                              })
                              ->get();

        $employeeDetails = $invitations->map(function($invitation) {
            $employee = $invitation->employee;
            return [
                'firstname' => $employee->firstname,
                'lastname' => $employee->lastname,
                'telephone' => $employee->telephone,
                'email' => $employee->email,
                'expected_salary' => $employee->expected_salary,
                'expected_job' => $employee->expected_job,
                'call_date' => $invitation->call_date,
                'status' => $invitation->status->status
            ];
        });

        return response()->json(['success' => true, 'data' => $employeeDetails]);
        }

    public function updateStatus($id, Request $request)
    {
        $invite = Invitation::findOrFail($id);

        $validatedData = $request->validate([
            'status_id' => 'required',
        ]);

        DB::table('invitations')->where('id', $id)->update([
            'status_id' => $request->status_id,
        ]);

        return response()->json([
            'data' => $invite,
            'message' => 'Status updated successfully',
        ]);

    }

    public function save(Request $request)
    {
        $validatedData = $request->validate([
            'employees_user_id' => 'required',
            'employers_user_id' => 'required',
        ]);

        $saved = DB::table('saves')->insert([
            'employees_user_id' => $request->input('employees_user_id'),
            'employers_user_id' => $request->input('employers_user_id'),
        ]);

        return response()->json(['success' => true, 'data' => $saved], 201);
    }

    public function forlater($employers_user_id)
    {
        $saves = Save::with('employee')
                ->where('employers_user_id', $employers_user_id)
                ->get();

    $savedEmployees = $saves->map(function($save) {
        return $save->employee; 
    });

    return response()->json(['success' => true, 'data' => $savedEmployees]);
    }
}
