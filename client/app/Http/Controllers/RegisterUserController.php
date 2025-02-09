<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class RegisterUserController extends Controller
{
    public function create(){
        return inertia('auth/Register');
    }

    public function store(){
        // validate
        $validated = request()->validate([
            'first_name' => ['required', 'max:255'],
            'middle_name' => ['required', 'max:255'],
            'last_name' => ['required', 'max:255'],
            'email' => ['required', 'email'],
            'mobile' => ['required', 'digits:11'],
            'birthday' => ['required', 'date'],
            'password' => ['required', Password::default(), 'confirmed']
        ]);

        // create
        $user = User::create($validated);

        // login
        Auth::login($user);

        // redirect
        return redirect('/');
    }
}
