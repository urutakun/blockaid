<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReliefRequest extends Model
{
    protected $fillable = ['id', 'email', 'title', 'reason', 'households', 'quantity', 'file_path', 'status', 'deny_reason', 'denied_by'];
    public $incrementing = false;
    protected $primaryKey = 'id';
    protected $keyType = 'string';

    protected static function boot(){
        parent::boot();

        static::creating(function ($request) {
            $request->id = self::generateUniqueRequestId();
        });
    }

    private static function generateUniqueRequestId() {
        do {
            $randomId = 'RR_' . random_int(100000, 999999);
        } while (self::where('id', $randomId)->exists());

        return $randomId;
    }

    public function districts(){
        return $this->belongsToMany(District::class, 'district_relief_request');
    }
}
