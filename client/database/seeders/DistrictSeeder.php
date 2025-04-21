<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('districts')->insert([
            [
                'name' => 'Bogac District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bongaitan District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Caramcam District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Castillo Village District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Central District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Gamaon District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'John Bosco District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Manggawong District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Marketsite District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Panaghiusa District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Riverside District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Saint Paul District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Union Site District',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
