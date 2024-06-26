<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Invitation;
use App\Models\Save;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class EmployersControllerTest extends TestCase
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
                         '*' => [
                             'id', 'firstname', 'lastname', 'telephone', 'email'
                         ]
                     ]
                 ]);
    }

    /** @test */
    public function can_show_employee()
    {
        $user = User::factory()->create(['role_id' => 1]);
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->getJson("/api/employers/{$user->id}");

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         '*' => [
                             'id', 'firstname', 'lastname', 'telephone', 'email'
                         ]
                     ]
                 ]);
    }

    /** @test */
    public function employer_can_store_invite()
    {
        $employer = User::factory()->create(['role_id' => 2]);
        $employee = User::factory()->create(['role_id' => 1]);
        $token = JWTAuth::fromUser($employer);

        $inviteData = [
            'employees_user_id' => $employee->id,
            'employers_user_id' => $employer->id,
            'status_id' => 1,
            'call_date' => now()->toDateString()
        ];

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->postJson('/api/invites', $inviteData);

        $response->assertStatus(201)
                 ->assertJson([
                     'success' => true,
                     'data' => true
                 ]);
    }

    /** @test */
    public function cannot_store_invite_as_employee()
    {
        $employee = User::factory()->create(['role_id' => 1]);
        $token = JWTAuth::fromUser($employee);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->postJson('/api/invites', []);

        $response->assertStatus(403);
    }

    /** @test */
    public function employer_can_get_user_invites()
    {
        $employer = User::factory()->create(['role_id' => 2]);
        $employee = User::factory()->create(['role_id' => 1]);
        $token = JWTAuth::fromUser($employer);

        Invitation::factory()->create([
            'employees_user_id' => $employee->id,
            'employers_user_id' => $employer->id,
            'status_id' => 1,
            'call_date' => now()->toDateString()
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->getJson("/api/users/{$employer->id}/invites");

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         '*' => [
                             'id', 'user_id', 'firstname', 'lastname', 'telephone', 'email', 'expected_salary', 'expected_job', 'call_date', 'status'
                         ]
                     ]
                 ]);
    }

    /** @test */
    public function employer_can_get_user_archives()
    {
        $employer = User::factory()->create(['role_id' => 2]);
        $employee = User::factory()->create(['role_id' => 1]);
        $token = JWTAuth::fromUser($employer);

        Invitation::factory()->create([
            'employees_user_id' => $employee->id,
            'employers_user_id' => $employer->id,
            'status_id' => 2,
            'call_date' => now()->toDateString()
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->getJson("/api/users/{$employer->id}/archives");

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         '*' => [
                             'firstname', 'lastname', 'telephone', 'email', 'expected_salary', 'expected_job', 'call_date', 'status'
                         ]
                     ]
                 ]);
    }

    /** @test */
    public function employer_can_update_invite_status()
    {
        $employer = User::factory()->create(['role_id' => 2]);
        $employee = User::factory()->create(['role_id' => 1]);
        $token = JWTAuth::fromUser($employer);

        $invite = Invitation::factory()->create([
            'employees_user_id' => $employee->id,
            'employers_user_id' => $employer->id,
            'status_id' => 1,
            'call_date' => now()->toDateString()
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->putJson("/api/invites/{$invite->id}/update-status", ['status_id' => 2]);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Status updated successfully',
                 ]);
    }

    /** @test */
    public function employer_can_save_employee_for_later()
    {
        $employer = User::factory()->create(['role_id' => 2]);
        $employee = User::factory()->create(['role_id' => 1]);
        $token = JWTAuth::fromUser($employer);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->postJson('/api/saved', [
                             'employees_user_id' => $employee->id,
                             'employers_user_id' => $employer->id,
                         ]);

        $response->assertStatus(201)
                 ->assertJson([
                     'success' => true,
                     'data' => true
                 ]);
    }

    /** @test */
    public function employer_can_get_saved_employees()
    {
        $employer = User::factory()->create(['role_id' => 2]);
        $employee = User::factory()->create(['role_id' => 1]);
        $token = JWTAuth::fromUser($employer);

        Save::factory()->create([
            'employees_user_id' => $employee->id,
            'employers_user_id' => $employer->id,
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                         ->getJson("/api/forlater/{employers_user_id}");

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         '*' => [
                             'id', 'firstname', 'lastname', 'telephone', 'email'
                         ]
                     ]
                 ]);
    }

    /** @test */
    public function employer_can_update_profile()
    {
    $employer = User::factory()->create(['role_id' => 2]);
    $token = JWTAuth::fromUser($employer);

    $updateData = [
        'firstname' => 'UpdatedName',
        'lastname' => 'UpdatedLastName',
        'email' => 'updated@example.com',
        'company_name' => 'Updated Company',
        'company_address' => 'Updated Address',
    ];

    $response = $this->withHeaders(['Authorization' => "Bearer $token"])
                     ->putJson("/api/employers/{$employer->id}/update", $updateData);

    $response->assertStatus(200)
             ->assertJson([
                 'data' => array_merge(['id' => $employer->id], $updateData),
                 'message' => 'User updated successfully'
             ]);

    $this->assertDatabaseHas('users', array_merge(['id' => $employer->id], $updateData));
    }

}

