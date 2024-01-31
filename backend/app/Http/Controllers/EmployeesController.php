<?php
namespace App\Http\Controllers;

use App\Models\Invitation;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Models\Save;
use Illuminate\Support\Facades\Auth;


class EmployeesController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['']]);
    }

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

    // public function getUserInvites($employers_user_id)
    // {
    //     $invitations = Invitation::with(['employer', 'status'])
    //                           ->where('employers_user_id', $employers_user_id)
    //                           ->whereHas('status', function($query) {
    //                               $query->where('id', 1);
    //                           })
    //                           ->get();

    //     $employerDetails = $invitations->map(function($invitation) {
    //         $employer = $invitation->employer;
    //         return [
    //             'company_name' => $employer->company_name,
    //             'telephone' => $employer->telephone,
    //             'email' => $employer->email,
    //             'industry' => $employer->industry,
    //             'location' => $employer->location,
    //             'call_date' => $invitation->call_date,
    //             'status' => $invitation->status->status
    //         ];
    //     });

    //     return response()->json(['success' => true, 'data' => $employerDetails]);
    // }

    public function getUserArchives($employers_user_id)
    {
        $invitations = Invitation::with(['employer', 'status'])
                              ->where('employers_user_id', $employers_user_id)
                              ->whereHas('status', function($query) {
                                  $query->whereIn('id', [2, 3]);
                              })
                              ->get();

        $employerDetails = $invitations->map(function($invitation) {
            $employer = $invitation->employer;
            return [
                'company_name' => $employer->company_name,
                'telephone' => $employer->telephone,
                'email' => $employer->email,
                'industry' => $employer->industry,
                'location' => $employer->location,
                'call_date' => $invitation->call_date,
                'status' => $invitation->status->status
            ];
        });

        return response()->json(['success' => true, 'data' => $employerDetails]);
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

    public function update(Request $request, $id)
    {
        if(Auth::payload()->get('role') == 2){
            abort(403, 'Unauthorized action.');
        }

        $user = User::findOrFail($id);

        $validated = $request->validate([
            'firstname' => 'required|min:2|max:20',
            'lastname' => 'required|min:2|max:20',
            'telephone' => 'regex:/^[0-9]{9,12}$/',
            'company_name' => 'max:50',
            'company_address' => 'max:50',
            'education' => 'max:50',
            'experience' => 'max:2000',
            'interests' => 'max:200',
            'skills' => 'max:2000',
            'languages' => 'max:50',
            'portfolio' => 'max:2000',
            'successes' => 'max:50',
            'expected_salary' => 'numeric',
            'expected_job' => 'max:50',
            'photo' => 'max:200',

        ]);

        DB::table('users')->where('id', $id)->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'telephone' => $request->telephone,
            'company_name' => $request->company_name,
            'company_address' => $request->company_address,
            'education' => $request->education,
            'experience' => $request->experience,
            'interests' => $request->interests,
            'skills' => $request->skills,
            'languages' => $request->languages,
            'portfolio' => $request->portfolio,
            'successes' => $request->successes,
            'expected_salary' => $request->expected_salary,
            'expected_job' => $request->expected_job,
            'photo' => $request->photo,
        ]);

        return response()->json([
            'data' => $user,
            'message' => 'User updated successfully',
        ]);

        return response()->json(['success' => true, 'message' => 'Profile updated successfully', 'data' => $user]);
    }

    public function getInvites($employees_user_id)
    {
        if(Auth::payload()->get('role') == 2){
            abort(403, 'Unauthorized action.');
        }

        $invitations = Invitation::with(['employer', 'status'])
                              ->where('employees_user_id', $employees_user_id)
                              ->get();

        $employerDetails = $invitations->map(function($invitation) {
            $employer = $invitation->employer;
            return [
                'company_name' => $employer->company_name,
                'company_address' => $employer->company_address,
                'call_date' => $invitation->call_date,
                'status' => $invitation->status->status
            ];
        });

        return response()->json(['success' => true, 'data' => $employerDetails]);
    }
}
