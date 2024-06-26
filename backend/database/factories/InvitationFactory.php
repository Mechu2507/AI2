<?php

namespace Database\Factories;

use App\Models\Invitation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvitationFactory extends Factory
{
    protected $model = Invitation::class;

    public function definition()
    {
        return [
            'employees_user_id' => User::factory()->create(['role_id' => 1])->id,
            'employers_user_id' => User::factory()->create(['role_id' => 2])->id,
            'status_id' => 1,
            'call_date' => $this->faker->date()
        ];
    }
}
