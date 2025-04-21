<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;

class AdminPanelController extends Controller
{
    public function index(){
        $beneficiaries = User::where('role', 'beneficiary')->get();
        return inertia('admin/AdminPanel', ['beneficiaries' => $beneficiaries]);
    }

    public function create(){
        $admins = User::whereIn('role', ['admin', 'dswd', 'bdrrm'])->get();
        return inertia('admin/UserManagement', ['admins' => $admins]);
    }

    public function store(){

        $validated = request()->validate([
            'first_name' => ['required', 'max:255'],
            'last_name' => ['required', 'max:255'],
            'mobile' => ['nullable'],
            'birthday' => ['nullable'],
            'email' => ['required', 'email'],
            'role' => ['required', 'in:dswd,bdrrm'],
            'password' => ['required', Password::default(), 'confirmed'],
        ]);

        User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'mobile' => $validated['mobile'] ?? null,
            'birthday' => $validated['birthday'] ?? null,
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => $validated['role'],
        ]);

        return redirect('/admin/user-management')->with('success', 'Admin created successfully');
    }

    public function edit($id){
        $user = User::find($id);

        if(!$user){
            return Redirect::back()->with('error', 'Record Not Found');
        }

        request()->validate([
            'first_name' => ['nullable', 'max:255'],
            'last_name' => ['nullable', 'max:255'],
            'email' => ['nullable', 'email'],
            'mobile' => ['nullable', 'digits:11'],
            'birthday' => ['nullable', 'date'],
            'password' => ['nullable', Password::default(), 'confirmed']
        ]);

        $user->update(array_filter(request()->only([
            'first_name', 'last_name', 'email', 'mobile', 'birthday', 'password'
        ])));

        $user->save();

        return Redirect::back()->with('success', 'Record updated successfully!');
    }

    public function destroy($id){
        $user = User::find($id);

        if(!$user){
            return Redirect::back()->with('error', 'Record Not Found');
        }

        $user->delete();
        return Redirect::back()->with('success', 'Record Deleted Successfully');
    }
}
