<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Shipment;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    public function index(){
        $shipment_ids = Shipment::pluck('id');
        return inertia('admin/Transactions', ['shipment_ids' => $shipment_ids]);
    }
}
