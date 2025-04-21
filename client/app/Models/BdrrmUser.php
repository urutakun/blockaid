<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BdrrmUser extends Model
{
    protected $fillable = ['first_name', 'middle_name', 'last_name', 'name_extension', 'birthday', 'sex', 'civil_status', 'religion', 'mobile', 'email', 'barangay', 'purok']; 
}
