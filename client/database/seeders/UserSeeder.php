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
        $admins = [
            [
                'first_name' => 'Walter',
                'last_name' => 'Gagate',
                'email' => 'waltergagate443@gmail.com',
                'role' => 'admin',
                'password' => Hash::make('walterrific')
            ],
            [
                'first_name' => 'Mark',
                'last_name' => 'Dublado',
                'email' => 'mark@mangagoy.bislig.gov',
                'role' => 'bdrrm',
                'password' => Hash::make('mark@123')
            ],
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'johndoe@dswd.gov.ph',
                'role' => 'dswd',
                'password' => Hash::make('john@123')
            ],
        ];

        foreach($admins as $admin){
            DB::table('users')->insert($admin);
        }

    }
}
