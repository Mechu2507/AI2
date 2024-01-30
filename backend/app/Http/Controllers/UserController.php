<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function index()
    {
        $users = User::select('id', 'firstname', 'lastname', 'telephone', 'email')
            ->get();
        return response()->json(['success' => true, 'data' => $users], 200);
    }

    public function signup(Request $request)
    {
        $validated = $request->validate([
            'firstname' => 'required|min:2|max:20',
            'lastname' => 'required|min:2|max:20',
            'telephone' => 'required|min:10|max:30',
            'email' => 'required|email|unique:users',
            'userRoles' => 'required|'
        ]);
        if ($validated) {
            DB::table('users')->insert([
                'firstname' => $request->input('firstname'),
                'lastname' => $request->input('lastname'),
                'telephone' => $request->input('telephone'),
                'email' => $request->input('email'),
                'password' => $request->input('password'),
                'role_id' => $request->input('userRoles'),
            ]);
        }
    }

    public function login(Request $request)
    {

        $email = $request->input('email');
        $user = User::where('email', $email)->get();
        $password = $user->value('password');

        if (!$user)
            return response()->json(['success' => false, 'message' => 'Login Fail, no matches in our database']);

        if (Auth::check()) {
            $user = Auth::user();

            session(['id' => $user->id, 'firstname' => $user->firstname, 'lastname' => $user->lastname, 'telephone' => $user->telephone, 'email' => $user->email]);
        } else {
            //return response()->json(['error' => 'Authentication failed'], 401);
        }

        return response()->json(['success' => true, 'message' => 'We\'ve found a match', 'data' => $user[0], 'pass' => $password], 200);
    }

    public function logout()
    {
        session()->flush();
        Auth::logout();
        return response()->json(['message' => 'Logout successful']);
    }

    public function updateProfile(Request $request, $user_id)
    {
        $user = User::find($user_id);

        $validated = $request->validate([
            'firstname' => 'required|min:2|max:20',
            'lastname' => 'required|min:2|max:20',
            'telephone' => 'required|regex:/^[0-9]{9,12}$/',
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
        DB::table('users')->where('id', $user_id)->update([
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
        $user = User::find($user_id);
        return response()->json(['success' => true, 'message' => 'Profile updated successfully', 'data' => $user]);

    }




    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'telephone' => 'required',
            'company_name' => 'required',
            'company_address' => 'required',

        ]);

        DB::table('users')->where('id', $id)->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'telephone' => $request->telephone,
            'company_name' => $request->company_name,
            'company_address' => $request->company_address,

        ]);

        return response()->json([
            'data' => $user,
            'message' => 'User updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['success' => true, 'message' => 'User deleted successfully']);
    }

}
