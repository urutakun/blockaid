<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Shipment;
use Illuminate\Http\Request;
use App\Models\ReliefRequest;

class TrackController extends Controller
{
    public function index(){
        $shipments = Shipment::whereIn('status', ['in_transit', 'received', 'distributed'])->orderBy('shipped_at', 'desc')->get();
        return inertia('Track', ['shipments' => $shipments]);
    }

    public function show($id){
        $relief_request = ReliefRequest::with('districts')->find($id);
        return response()->json($relief_request);
    }
}
