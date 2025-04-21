<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BdrrmUser;
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
            'last_name' => ['required', 'max:255'],
            'email' => ['required', 'email'],
            'mobile' => ['required', 'digits:11'],
            'birthday' => ['required', 'date'],
            'password' => ['required', Password::default(), 'confirmed']
        ]);


        $existsInBdrrm = BdrrmUser::where('first_name', $validated['first_name'])
        ->where('last_name', $validated['last_name'])
        ->where('birthday', $validated['birthday'])
        ->where('mobile', $validated['mobile'])
        ->exists();

        if(!$existsInBdrrm){
            return redirect()->back()->withErrors(['error' => 'No record found in BDRRM database.']);
        }


        // create
        $user = User::create($validated);

        // login
        Auth::login($user);

        // redirect
        return redirect('/');
    }
}
