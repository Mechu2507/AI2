<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'employees_user_id',
        'employers_user_id',
        'status_id',
        'call_date',
    ];

    public function employee()
    {
        return $this->belongsTo(User::class, 'employees_user_id');
    }

    public function employer()
    {
        return $this->belongsTo(User::class, 'employers_user_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
