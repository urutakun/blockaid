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
        Schema::create('bdrrm_users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('name_extension')->nullable();
            $table->date('birthday');
            $table->string('sex');
            $table->string('civil_status');
            $table->string('religion');
            $table->string('mobile');
            $table->string('email')->nullable();
            $table->string('barangay');
            $table->string('district');
            $table->string('purok');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bdrrm_users');
    }
};
