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
        Schema::create('relief_requests', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('email');
            $table->string('title');
            $table->text('reason');
            $table->integer('households');
            $table->integer('quantity');
            $table->string('file_path');
            $table->enum('status', ['pending', 'approved', 'denied', 'in_transit', 'received', 'distributed'])->default('pending');
            $table->string('denied_by')->nullable();
            $table->text('deny_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('relief_requests');
    }
};
