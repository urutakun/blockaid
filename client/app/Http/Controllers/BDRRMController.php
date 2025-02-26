<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ReliefRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class BDRRMController extends Controller
{
    public function index(){
        $beneficiaries = User::where('role', 'beneficiary')->get();
        $email = Auth::user()->email;
        $requests = ReliefRequest::where('email', $email)->get();
        return inertia('bdrrm/bdrrmDashboard', ['beneficiaries' => $beneficiaries, 'requests' => $requests]);
    }

    public function store(){
        $validatedData = request()->validate([
            'title' => ['required', 'max:255'],
            'reason' => ['required'],
            'households' => ['required', 'integer', 'min:1'],
            'quantity' => ['required', 'integer', 'min:1'],
            'file' => ['required', 'mimes:pdf,doc,docx', 'max:2048'],
        ]);

        $validatedData['email'] = Auth::user()->email;

        if(request()->hasFile('file')){
            $filePath = request()->file('file')->store('files', 'public');
            $validatedData['file_path'] = $filePath;
        }

        unset($validatedData['file']);

        ReliefRequest::create($validatedData);

        return redirect('/bdrrm/request')->with('success', 'Request Added Successfully');
    }

    public function showRequests(){
        if(!Auth::check()){
            return redirect('/login');
        }

        $email = Auth::user()->email;
        $requests = ReliefRequest::where('email', $email)->get();
        return inertia('bdrrm/Request', ['requests' => $requests]);
    }
}
