<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    public function index(){
        return inertia('Track'); 
    }
}
