<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function store(Request $request){
        $report = Report::create([
            'request_id' =>  $request->request_id,
            'shipment_id' =>  $request->shipment_id,
            'total_sent' =>  $request->total_sent,
            'total_received' =>  $request->total_received,
            'total_distributed' =>  $request->total_distributed,
            'distribution_date' =>  now(),
            'beneficiaries' =>  json_encode($request->beneficiaries),
        ]);


        return response()->json([
            'success' => 'Report Generated successfully',
            'report' => $report
        ]);
    }
}
