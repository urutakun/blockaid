<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ReliefRequest;
use Illuminate\Http\Request;

class DSWDPanelController extends Controller
{
    public function index(){
        return inertia('dswd/dswdDashboard');
    }

    public function show(){
        $requests = ReliefRequest::where('status', 'pending')->get();
        return inertia('dswd/Shipments', ['requests' => $requests]);
    }
}
