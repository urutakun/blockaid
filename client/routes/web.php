<?php

use App\Http\Controllers\AdminPanelController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LiveAlertController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterUserController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TrackController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home
Route::get('/', [DashboardController::class, 'index']);

// Login
Route::get('/login', [SessionController::class, 'create'])->name('login');
Route::post('/login', [SessionController::class, 'store']);

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
