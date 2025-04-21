<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    public function reliefRequest(){
        return $this->belongsToMany(ReliefRequest::class, 'district_relief_request');
    }
}
