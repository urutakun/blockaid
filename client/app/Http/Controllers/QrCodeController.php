<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QRCode;
use Illuminate\Http\Request;

class QrCodeController extends Controller
{
    public function getQrCodes($shipmentId)
    {
        $qrCodes = QrCode::where('shipment_id', $shipmentId)->get();
        return response()->json($qrCodes);
    }
}
