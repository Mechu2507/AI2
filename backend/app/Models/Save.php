<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Save extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'id',
        'employees_user_id',
        'employers_user_id',
    ];

    public function employee()
    {
        return $this->belongsTo(User::class, 'employees_user_id');
    }

    public function employer()
    {
        return $this->belongsTo(User::class, 'employers_user_id');
    }
}
