<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    protected $fillable = ['id', 'request_id', 'status', 'quantity', 'shipped_at', 'approved_by', 'received_by',  'is_flagged'];

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
            $randomId = 'SP_' . random_int(100000, 999999);
        } while (self::where('id', $randomId)->exists());

        return $randomId;
    }

    public function qrCodes(){
        return $this->hasMany(QRCode::class, 'shipment_id', 'id');
    }
}
