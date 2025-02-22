<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

class DashboardController
{
    public function index(){
        return inertia('Dashboard');
    }

    public function success(){
        return inertia('Success');
    }
}
