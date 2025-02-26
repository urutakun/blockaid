<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class LiveAlertController extends Controller
{
    public function index(){
        $weatherAPIKey = config('services.weatherapi.key');

        $response = Http::get('http://api.weatherapi.com/v1/forecast.json', [
            'key' => $weatherAPIKey,
            'q' => '8.1836,126.356',
            'days' => 14
        ]);

        $alert_response = Http::get('http://api.weatherapi.com/v1/alerts.json', [
            'key' => $weatherAPIKey,
            'q' => '8.1836,126.356'
        ]);

        $weather = $response->json();
        $alert = $alert_response->json();

        return inertia('LiveAlert', ['weather' => $weather, 'alerts' => $alert]);
    }
}
