<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\ReliefRequest;
use App\Models\Report;
use App\Models\Shipment;
use App\Models\User;
use Illuminate\Http\Request;
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
            'districts' => ['required', 'array'],
            'districts.*' => 'exists:districts,id',
            'file' => ['required', 'mimes:pdf,doc,docx', 'max:2048'],
        ]);

        $validatedData['email'] = Auth::user()->email;

        if(request()->hasFile('file')){
            $filePath = request()->file('file')->store('files', 'public');
            $validatedData['file_path'] = $filePath;
        }

        unset($validatedData['file']);

        $reliefRequest = ReliefRequest::create($validatedData);
        $reliefRequest->districts()->sync(request()->districts);

        return redirect('/bdrrm/request')->with('success', 'Request Added Successfully');
    }

    public function showRequests(){
        if(!Auth::check()){
            return redirect('/login');
        }

        $email = Auth::user()->email;
        $requests = ReliefRequest::with('districts')->where('email', $email)->orderBy('created_at', 'desc')->get();
        $districts = District::all();

        return inertia('bdrrm/Request', ['requests' => $requests, 'districts' => $districts]);
    }

    public function requestShipment($id){
        $shipment = Shipment::where('request_id', $id)->first();
        return $shipment;
    }

    public function distributeShipment($id){
        $request = ReliefRequest::with('districts')->where('id', $id)->first();
        $shipment = Shipment::where('request_id', $id)->first();
        return inertia('bdrrm/Distribute', ['request' => $request, 'shipment' => $shipment]);
    }

    public function showReports(){
        $reports = Report::with(['request', 'shipment'])->orderBy('created_at', 'desc')->get();
        return inertia('bdrrm/BdrrmReports', ['reports' => $reports]);
    }
}
