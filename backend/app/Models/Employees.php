<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employees extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'education',
        'experience',
        'interests',
        'skills',
        'languages',
        'portfolio',
        'success',
        'expected_salary',
        'photo'
    ];
}
