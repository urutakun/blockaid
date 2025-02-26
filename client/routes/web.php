<?php

use App\Http\Controllers\AdminPanelController;
use App\Http\Controllers\BDRRMController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DSWDPanelController;
use App\Http\Controllers\LiveAlertController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterUserController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TrackController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home
Route::get('/', [DashboardController::class, 'index']);
Route::get('/success', [DashboardController::class, 'success']);

// Login
Route::get('/login', [SessionController::class, 'create'])->name('login');
Route::post('/login', [SessionController::class, 'store']);
Route::post('/logout', [SessionController::class, 'destroy']);

// Register
Route::get('/register', [RegisterUserController::class, 'create']);
Route::post('/register', [RegisterUserController::class, 'store']);

// Live Alert
Route::get('/live-alert', [liveAlertController::class, 'index']);

// Track Relief
Route::get('/track', [TrackController::class, 'index']);

// Profile
Route::get('/profile', [ProfileController::class, 'index'])->middleware('auth');
Route::post('/profile/edit', [ProfileController::class, 'edit'])->middleware('auth');

// Admin
Route::get('/admin/beneficiaries', [AdminPanelController::class, 'index'])->middleware('auth');
Route::get('admin/user-management', [AdminPanelController::class, 'create'])->middleware('auth');
Route::post('admin/register', [AdminPanelController::class, 'store'])->middleware('auth');
Route::delete('admin/beneficiaries/delete/{id}', [AdminPanelController::class, 'destroy'])->middleware('auth');
Route::put('admin/beneficiaries/edit/{id}', [AdminPanelController::class, 'edit'])->middleware('auth');
Route::delete('admin/user-management/delete/{id}', [AdminPanelController::class, 'destroy'])->middleware('auth');
Route::put('admin/user-management/edit/{id}', [AdminPanelController::class, 'edit'])->middleware('auth');

// DSWD
Route::get('/dswd/dashboard', [DSWDPanelController::class, 'index'])->middleware('auth');
Route::get('/dswd/shipments', [DSWDPanelController::class, 'show'])->middleware('auth');

// BDRRM
Route::get('/bdrrm/dashboard', [BDRRMController::class, 'index'])->middleware('auth');
Route::get('/bdrrm/request', [BDRRMController::class, 'showRequests']);
Route::post('/bdrrm/request', [BDRRMController::class, 'store']);
