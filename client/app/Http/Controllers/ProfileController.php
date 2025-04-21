<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BdrrmUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{

    public function index(){
        $user = Auth::user();

        if ($user->role === 'beneficiary') {
            $bdrrmUser = BdrrmUser::where('mobile', $user->mobile)->first();
        } else {
            $bdrrmUser = null;
        }

        return inertia('Profile', ['profile' => $bdrrmUser]);
    }

    public function edit(){
        request()->validate([
            'first_name' => ['nullable','max:255'],
            'last_name' => ['nullable','max:255'],
            'birthday' => ['nullable'],
            'mobile' => [],
            'image' => ['nullable', 'mimes:jpg,png,jpeg', 'max:2048']
        ]);

        $user = Auth::user();


        // Check if user has profile picture
        if(request()->hasFile('image')){
            if($user->image && $user->image !== 'blank_profile.png'){
                Storage::delete('public/uploads/' . $user->image);
            }

            $file = request()->file('image');
            $file_path = $file->store('uploads', 'public');
            $imageName = basename($file_path);
            $user->image = $imageName;
        }


        if (request()->filled('first_name')) {
            $user->first_name = request()->first_name;
        }

        if (request()->filled('last_name')) {
            $user->last_name = request()->last_name;
        }

        if (request()->filled('birthday')) {
            $user->birthday = request()->birthday;
        }

        if (request()->filled('mobile')) {
            $user->mobile = request()->mobile;
        }

        $user->save();

        return redirect('/profile');


    }
}
