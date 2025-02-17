<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class SessionController extends Controller
{
    public function create(){
        return inertia('auth/Login');
    }

    public function store(){
        // validate
        $validated = request()->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($validated)) {
            request()->session()->regenerate();
            $user = Auth::user();

            // Redirect based on role
            if ($user->role === 'admin') {
                return redirect('admin/beneficiaries');
            }
            elseif ($user->role == 'dswd'){
                return redirect('dswd/dashboard');
            }
            else {
                return redirect('/');
            }

        }

        return back()->withErrors(['email' => 'Invalid credentials']);
    }

    public function destroy(){
        return Auth::logout();
    }
}
