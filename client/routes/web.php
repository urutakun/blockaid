<?php

use App\Http\Controllers\AdminPanelController;
use App\Http\Controllers\BDRRMController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DSWDPanelController;
use App\Http\Controllers\LiveAlertController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\RegisterUserController;
use App\Http\Controllers\ReliefRequestController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SMSController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\TransactionsController;
use App\Models\ReliefRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home
Route::get('/', [DashboardController::class, 'index']);
Route::get('/success', [DashboardController::class, 'success']);

// Contact
Route::get('/contact-us', [ContactController::class, 'index']);


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
Route::get('/track/{id}', [TrackController::class, 'show']);

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
Route::get('admin/transactions', [TransactionsController::class, 'index'])->middleware('auth');

// DSWD
Route::get('/dswd/dashboard', [DSWDPanelController::class, 'index'])->middleware('auth');
Route::get('/dswd/shipments', [DSWDPanelController::class, 'show'])->middleware('auth');
Route::put('/dswd/shipments/approve/{id}', [ReliefRequestController::class, 'approve'])->middleware('auth');
Route::put('/dswd/shipments/deny/{id}', [ReliefRequestController::class, 'deny'])->middleware('auth');
Route::get('/dswd/shipments/{id}/qrcodes', [QrCodeController::class, 'getQrCodes']);
Route::put('/dswd/shipments/{id}/status', [ReliefRequestController::class, 'updateStatus']);
Route::get('/dswd/reports', [DSWDPanelController::class, 'showReports']);


// BDRRM
Route::get('/bdrrm/dashboard', [BDRRMController::class, 'index'])->middleware('auth');
Route::get('/bdrrm/request', [BDRRMController::class, 'showRequests']);
Route::post('/bdrrm/request', [BDRRMController::class, 'store']);
Route::get('/bdrrm/request/{id}', [BDRRMController::class, 'requestShipment']);
Route::get('/bdrrm/distribute/{id}', [BDRRMController::class, 'distributeShipment']);
Route::get('/bdrrm/reports', [BDRRMController::class, 'showReports']);

// REPORTS
Route::post('/reports', [ReportsController::class, 'store'])->middleware('auth');

// SMS
Route::post('/notification/message', [SMSController::class, 'send']);
