<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminPanelController extends Controller
{
    public function index(){
        $beneficiaries = User::where('role', 'beneficiary')->get();
        return inertia('admin/AdminPanel', ['beneficiaries' => $beneficiaries]);
    }

    public function create(){
        $admins = User::where('role', ['admin', 'DSWD', 'LGU'])->get();
        return inertia('admin/UserManagement', ['admins' => $admins]);
    }
}
