<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SMSController extends Controller
{
    public function send(Request $request){
        $apiKey = config('services.smsapi.key');

        // adneg = 639533722664
        // $recipients = ['639064603723', '639458378967', '639667618308', '639976905149'];
        $recipients = '639458378967';

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
        ])->post('https://app.philsms.com/api/v3/sms/send', [
            // 'recipient'     => join(",", $recipients),
            'recipient'     => $recipients,
            'sender_id'     => 'PhilSMS',
            'type'          => 'plain',
            'message'       => $request->message,
        ]);

        return response()->json($response->json());

    }
}
