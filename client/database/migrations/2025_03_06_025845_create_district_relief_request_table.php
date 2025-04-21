<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('district_relief_request', function (Blueprint $table) {
            $table->id();
            $table->string('relief_request_id');
            $table->foreign('relief_request_id')->references('id')->on('relief_requests')->onDelete('cascade');
            $table->foreignId('district_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('district_relief_request');
    }
};
