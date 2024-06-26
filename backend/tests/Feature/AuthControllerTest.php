<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthControllerTest extends TestCase
{
    //use RefreshDatabase;

    /** @test */
    public function user_can_login_with_valid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password')
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'password'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'token',
                     'user' => [
                         'id',
                         'firstname',
                         'lastname',
                         'role_id',
                     ],
                     'token_type',
                     'expires_in'
                 ]);
    }

    /** @test */
    public function user_cannot_login_with_invalid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password')
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'wrong-password'
        ]);

        $response->assertStatus(401)
                 ->assertJson([
                     'error' => 'Unauthorized'
                 ]);
    }

    /** @test */
    public function authenticated_user_can_get_own_details()
    {
        $user = User::factory()->create();

        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->postJson('/api/auth/me');

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $user->id,
                     'firstname' => $user->firstname,
                     'lastname' => $user->lastname,
                     'email' => $user->email,
                 ]);
    }

    /** @test */
    public function authenticated_user_can_logout()
    {
        $user = User::factory()->create();

        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->postJson('/api/auth/logout');

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Successfully logged out'
                 ]);
    }

    /** @test */
    public function can_refresh_token()
    {
        $user = User::factory()->create();

        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->postJson('/api/auth/refresh');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'token',
                     'token_type',
                     'expires_in'
                 ]);
    }

    /** @test */
    public function get_user_details()
    {
        $user = User::factory()->create();

        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->getJson('/api/getUserDetails');

        $response->assertStatus(200)
                 ->assertJson([
                     'user' => [
                         'id' => $user->id,
                         'firstname' => $user->firstname,
                         'lastname' => $user->lastname,
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
                         'photo' => $user->photo,
                     ]
                 ]);
    }
}
