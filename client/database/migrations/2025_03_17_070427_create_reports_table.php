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
        Schema::create('reports', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('request_id');
            $table->string('shipment_id');
            $table->integer('total_sent');
            $table->integer('total_received');
            $table->integer('total_distributed');
            $table->timestamp('distribution_date');
            $table->json('beneficiaries');
            $table->boolean('is_flagged')->default(false);
            $table->timestamps();

            $table->foreign('request_id')->references('id')->on('relief_requests');
            $table->foreign('shipment_id')->references('id')->on('shipments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
