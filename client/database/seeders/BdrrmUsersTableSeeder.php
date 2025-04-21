<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class BdrrmUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('en_PH');
        $civilStatuses = ['Single', 'Married', 'Widowed', 'Separated'];
        $religions = ['Roman Catholic', 'Iglesia ni Cristo', 'Born Again Christian', 'Muslim'];
        $sexes = ['Male', 'Female'];
        $districts = ['Bogac District', 'Bongaitan District', 'Caramcam District', 'Castillo Village District', 'Central District', 'Gamaon District', 'John Bosco District', 'Manggawong District', 'Marketsite District', 'Panaghiusa District', 'Riverside District', 'Saint Paul District', 'Union Site District'];

        $customUsers = [
            [
                'first_name' => 'Morellia',
                'middle_name' => 'Adlawan',
                'last_name' => 'Macapagal',
                'name_extension' => '',
                'birthday' => '2003-01-20',
                'sex' => 'Female',
                'civil_status' => 'Single',
                'religion' => 'Roman Catholic',
                'mobile' => '09458378967',
                'email' => 'morellia@gmail.com',
                'barangay' => 'Mangagoy',
                'district' => 'Bogac District',
                'purok' => 'Purok 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Genda',
                'middle_name' => 'Capunong',
                'last_name' => 'Necio',
                'name_extension' => '',
                'birthday' => '1976-02-24',
                'sex' => 'Female',
                'civil_status' => 'Married',
                'religion' => 'Roman Catholic',
                'mobile' => '09958378967',
                'email' => 'genda@gmail.com',
                'barangay' => 'Mangagoy',
                'district' => 'Caramcam District',
                'purok' => 'Purok 3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Rambo',
                'middle_name' => 'Rat',
                'last_name' => 'Tan',
                'name_extension' => 'Jr.',
                'birthday' => '2002-11-09',
                'sex' => 'Male',
                'civil_status' => 'Single',
                'religion' => 'Roman Alcoholic',
                'mobile' => '09959224318',
                'email' => 'rambo@gmail.com',
                'barangay' => 'Mangagoy',
                'district' => 'Bongaitan District',
                'purok' => 'Purok 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Jhonatan',
                'middle_name' => 'Cina',
                'last_name' => 'Cila',
                'name_extension' => '',
                'birthday' => '2001-05-08',
                'sex' => 'Male',
                'civil_status' => 'Single',
                'religion' => 'Roman Alcoholic',
                'mobile' => '09667618308',
                'email' => 'jhonatan@gmail.com',
                'barangay' => 'Mangagoy',
                'district' => 'Castillo Village District',
                'purok' => 'Purok 4',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        foreach($customUsers as $user){
            DB::table('bdrrm_users')->insert($user);
        }


        for($i = 0; $i < 100; $i++){
            DB::table('bdrrm_users')->insert([
                'first_name' => $faker->firstName,
                'middle_name' => $faker->lastName,
                'last_name' => $faker->lastName,
                'name_extension' => $faker->randomElement([null, 'Jr.', 'Sr.', 'III']),
                'birthday' => $faker->date('Y-m-d', '2005-12-31'),
                'sex' => $faker->randomElement($sexes),
                'civil_status' => $faker->randomElement($civilStatuses),
                'religion' => $faker->randomElement($religions),
                'mobile' => '09' . $faker->numerify('#########'),
                'email' => $faker->unique()->safeEmail,
                'barangay' => 'Mangagoy',
                'district' => $faker->randomElement($districts),
                'purok' => 'Purok ' . $faker->numberBetween(1, 10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
