<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ReliefRequest;
use App\Models\Shipment;
use Illuminate\Http\Request;
use App\Models\Report;

class DSWDPanelController extends Controller
{
    public function index(){
        $shipment_total = Shipment::pluck('quantity');
        return inertia('dswd/dswdDashboard', ['shipment_total' => $shipment_total]);
    }

    public function show(){
        $requests = ReliefRequest::with('districts')->where('status', 'pending')->get();
        $shipments = Shipment::orderBy('created_at', 'desc')->get();
        return inertia('dswd/Shipments', ['requests' => $requests, 'shipments' => $shipments]);
    }

    public function showReports(){
        $reports = Report::with(['request', 'shipment'])->orderBy('created_at', 'desc')->get();
        return inertia('dswd/DswdReports', ['reports' => $reports]);
    }
}
