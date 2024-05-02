<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reserved_from',
        'dateTime'
    ];

        /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'dateTime',
    ];

    public function organization() {
        return $this->belongsTo(User::class,'user_id', 'id');
    }

    public function reserved_from() {
        return $this->belongsTo(User::class,'reserved_from', 'id');
    }
}
