<?php

namespace Database\Factories;

use App\Models\Save;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SaveFactory extends Factory
{
    protected $model = Save::class;

    public function definition()
    {
        return [
            'employees_user_id' => User::factory()->create(['role_id' => 1])->id,
            'employers_user_id' => User::factory()->create(['role_id' => 2])->id,
        ];
    }
}
