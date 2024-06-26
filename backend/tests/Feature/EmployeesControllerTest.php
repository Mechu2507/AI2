<?php

namespace Tests\Feature;

// tests/Feature/EmployeesControllerTest.php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Invitation;
use Tymon\JWTAuth\Facades\JWTAuth;

class EmployeesControllerTest extends TestCase
{
    //use RefreshDatabase;

    /** @test */
    public function can_list_employees()
    {
        $user = User::factory()->create(['role_id' => 1]);

        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->getJson('/api/employees');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         '*' => ['id', 'firstname', 'lastname', 'email']
                     ]
                 ]);
    }

    // /** @test */
    // public function can_update_employee()
    // {
    //     $user = User::factory()->create(['role_id' => 1]);

    //     $token = JWTAuth::fromUser($user);

    //     $response = $this->withHeaders(['Authorization' => "Bearer $token"])
    //                      ->putJson("/api/employees/{$user->id}/update", [
    //                          'firstname' => 'UpdatedName',
    //                          'lastname' => 'UpdatedLastName',
    //                          'telephone' => '123456789'
    //                      ]);

    //     $response->assertStatus(200)
    //              ->assertJson([
    //                  'data' => [
    //                      'id' => $user->id,
    //                      'firstname' => 'UpdatedName',
    //                      'lastname' => 'UpdatedLastName',
    //                      'telephone' => '123456789'
    //                  ],
    //                  'message' => 'User updated successfully'
    //              ]);
    // }

    /** @test */
    public function can_update_employee()
    {
    $user = User::factory()->create(['role_id' => 1]);

    $token = JWTAuth::fromUser($user);

    $updateData = [
        'firstname' => 'UpdatedName',
        'lastname' => 'UpdatedLastName',
        'telephone' => '123-456-789',
        'company_name' => 'Updated Company',
        'company_address' => 'Updated Address',
        'education' => 'Updated Education',
        'experience' => 'Updated Experience',
        'interests' => 'Updated Interests',
        'skills' => 'Updated Skills',
        'languages' => 'Updated Languages',
        'portfolio' => 'Updated Portfolio',
        'successes' => 'Updated Successes',
        'expected_salary' => 100000,
        'expected_job' => 'Updated Job',
        'photo' => 'Updated Photo',
    ];

    $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                     ->putJson("/api/employees/{$user->id}/update", $updateData);

    $response->assertStatus(200)
             ->assertJson([
                 'data' => array_merge(['id' => $user->id], $updateData),
                 'message' => 'User updated successfully'
             ]);

    $this->assertDatabaseHas('users', array_merge(['id' => $user->id], $updateData));
    }


    /** @test */
    public function can_get_employee_invites()
    {
        $user = User::factory()->create(['role_id' => 1]);
        $employer = User::factory()->create(['role_id' => 2]);
        $invitation = Invitation::create([
            'employees_user_id' => $user->id,
            'employers_user_id' => $employer->id,
            'status_id' => 1,
            'call_date' => now()
        ]);

        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->getJson("/api/getInvites/{$user->id}");

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         '*' => ['company_name', 'company_address', 'call_date', 'status']
                     ]
                 ]);
    }
}
