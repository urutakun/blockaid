<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class AdminPanelController extends Controller
{
    public function index(){
        $beneficiaries = User::where('role', 'beneficiary')->get();
        return inertia('admin/AdminPanel', ['beneficiaries' => $beneficiaries]);
    }

    public function create(){
        $admins = User::whereIn('role', ['admin', 'dswd', 'barangay'])->get();
        return inertia('admin/UserManagement', ['admins' => $admins]);
    }

    public function store(){
        // validate
        $validated = request()->validate([
            'first_name' => ['required', 'max:255'],
            'middle_name' => ['nullable'],
            'last_name' => ['nullable'],
            'mobile' => ['nullable'],
            'birthday' => ['nullable'],
            'email' => ['required', 'email'],
            'role' => ['required', 'in:dswd,barangay'],
            'password' => ['required', Password::default(), 'confirmed'],
        ]);

        $user = User::create([
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'] ?? null,
            'last_name' => $validated['last_name'] ?? null,
            'mobile' => $validated['mobile'] ?? null,
            'birthday' => $validated['birthday'] ?? null,
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => $validated['role'],
        ]);

        return redirect('/admin/user-management')->with('success', 'Admin created successfully');

    }
}
