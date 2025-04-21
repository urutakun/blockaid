<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QRCode;
use App\Models\ReliefRequest;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ReliefRequestController extends Controller
{
    public function approve($id)
    {

        $request = ReliefRequest::find($id);
        $dswd_admin = Auth::user();
        $admin_name = $dswd_admin->first_name . " " . $dswd_admin->last_name;

        if (!$request) {
            return redirect()->back()->with('error', 'Relief request not found');
        }

        $request->update(['status' => 'approved']);

        // create shipment
        $shipment = Shipment::create([
            'request_id' => $request->id,
            'status' => 'pending',
            'quantity' => $request->quantity,
            'approved_by' => $admin_name,
            'shipped_at' => now()
        ]);

        for ($i = 1; $i <= $request->quantity; $i++) {

            $qrData = [
                'shipment_id' => $shipment->id,
                'request_id' => $request->id,
                'box_number' => $i,
                'affected' => $request->districts->pluck('name')->toArray(),
                'timestamp' => now(),
            ];

            QRCode::create([
                'box_number' => $i,
                'qr_data' => json_encode($qrData),
                'shipment_id' => $shipment->id,
                'timestamp' => now(),
            ]);

        }


        if (!$shipment) {
            return redirect()->back()->with('error', 'Failed to create shipment');
        }

        return redirect()->back()->with([
            'success' => 'Request approved and shipment created successfully',
        ]);
    }

    public function updateStatus (Request $request,  $id ) {
       $shipment = Shipment::find($id);
       $relief_request = ReliefRequest::find($request->req_id);

       if(!$shipment){
            return redirect()->back()->with('error', 'Shipment not found');
       }

       $flagMessage = null;

       if($request->totalReceived){
           $shipment->received_quantity = $request->totalReceived;
           $shipment->received_at = now();
           $shipment->received_by = $request->received_by;
           if($shipment->received_quantity !== $shipment->quantity){
               $shipment->is_flagged = true;
               $shipment->flag_status = 'transit_discrepancy';
               $shipment->flagged_at = now();
               $flagMessage = "Shipment has been flagged, Expected ". $shipment->quantity . " box/es, received " . $shipment->received_quantity;
            }
        }

        if($request->totalDistributed){
            $shipment->distributed_quantity = $request->totalDistributed;
            $shipment->distributed_at = now();
            if($shipment->distributed_quantity !== $shipment->received_quantity){
                $shipment->is_flagged = true;
                if($shipment->flag_status === 'transit_discrepancy'){
                    $shipment->flag_status = 'multiple_discrepancy';
                }
                else{
                    $shipment->flag_status = 'distribution_discrepancy';
                }
                $shipment->flagged_at = now();
                $flagMessage = "Shipment has been flagged, Expected ". $shipment->received_quantity . " box/es, distributed " . $shipment->distributed_quantity;
            }
       }

       $shipment->status = $request->status;
       $relief_request->status = $request->status;
       $shipment->save();
       $relief_request->save();

       $response = [
           'success' => 'Shipment status updated successfully'
       ];

       if ($flagMessage) {
            $response['warning'] = $flagMessage;
        }

         return response()->json($response);
    }

    public function deny(Request $request, $id ){
        $relief_request = ReliefRequest::find($id);

        if (!$relief_request) {
            return redirect()->back()->with('error', 'Relief request not found');
        }

        $validated = $request->validate([
            'reason' => 'required|string',
            'otherReason' => 'nullable|string|required_if:reason,Other'
        ]);

        $dswd_admin = Auth::user();
        $admin_name = $dswd_admin->first_name . " " . $dswd_admin->last_name;

        $reason = $validated['reason'] !== "Other" ? $validated['reason'] : $validated['otherReason'];

        $relief_request->update(['status' => 'denied', 'denied_by' => $admin_name, 'deny_reason' => $reason]);

        return redirect()->back()->with(['success' => 'Request denied successfully']);
    }
}
