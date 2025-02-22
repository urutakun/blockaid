<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class BDRRMController extends Controller
{
    public function index(){
        $beneficiaries = User::where('role', 'beneficiary')->get();
        return inertia('bdrrm/bdrrmDashboard', ['beneficiaries' => $beneficiaries]);
    }
}
