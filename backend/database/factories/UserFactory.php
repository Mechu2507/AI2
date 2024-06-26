<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = \App\Models\User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'firstname' => $this->faker->firstName,
            'lastname' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('password'), 
            'role_id' => 1, 
            'telephone' => $this->faker->phoneNumber,
            'education' => $this->faker->word,
            'experience' => $this->faker->word,
            'interests' => $this->faker->word,
            'skills' => $this->faker->word,
            'languages' => $this->faker->word,
            'portfolio' => $this->faker->url,
            'successes' => $this->faker->word,
            'expected_salary' => $this->faker->numberBetween(30000, 100000),
            'company_name' => $this->faker->company,
            'company_address' => $this->faker->word,
            'photo' => $this->faker->imageUrl(),
        ];
    }
}
