<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'first_name' => 'Walter',
                'email' => 'waltergagate443@gmail.com',
                'role' => 'admin',
                'password' => Hash::make('walterrific')
            ],
            [
                'first_name' => 'Morellia',
                'middle_name' => 'Cute',
                'last_name' => 'Kawaii',
                'email' => 'morellia@gmail.com',
                'mobile' => '09123456781',
                'role' => 'beneficiary',
                'password' => Hash::make('morellia@123')
            ],
        ]);
    }
}
