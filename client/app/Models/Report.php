<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'id',
        'request_id',
        'shipment_id',
        'total_sent',
        'total_received',
        'total_distributed',
        'distribution_date',
        'beneficiaries',
        'is_flagged'
    ];

    protected $casts = [
        'beneficiaries' => 'array'
    ];

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
            $randomId = 'RP_' . random_int(100000, 999999);
        } while (self::where('id', $randomId)->exists());

        return $randomId;
    }

    public function request(){
        return $this->belongsTo(ReliefRequest::class, 'request_id');
    }

    public function shipment(){
        return $this->belongsTo(Shipment::class, 'shipment_id');
    }

}
