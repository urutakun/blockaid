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
        Schema::create('shipments', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('request_id');
            $table->string('approved_by');
            $table->string('received_by')->default('Not Yet Received');
            $table->enum('status', ['pending', 'in_transit', 'received', 'distributed'])->default('pending');
            $table->integer('quantity');
            $table->integer('received_quantity')->default(0);
            $table->integer('distributed_quantity')->default(0);
            $table->boolean('is_flagged')->default(false);
            $table->enum('flag_status', ['none', 'transit_discrepancy', 'distribution_discrepancy', 'multiple_discrepancy'])->default('none');
            $table->timestamp('flagged_at')->nullable();
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('received_at')->nullable();
            $table->timestamp('distributed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
