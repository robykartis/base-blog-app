<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Tags;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Users
        $user1 = User::create([
            'name' => 'Admin',
            'email' => 'admin@email.com',
            'username' => 'admin',
            'role' => 'admin',
            'profile_photo_path_url' => 'assets/image/user/',
            'profile_photo_thumbnail_url' => 'assets/image/user/thumbnail/',
            'password' => Hash::make('123'),
        ]);
        $user2 = User::create([
            'name' => 'User',
            'username' => 'user',
            'email' => 'user@email.com',
            'role' => 'user',
            'profile_photo_path_url' => 'assets/image/user/',
            'profile_photo_thumbnail_url' => 'assets/image/user/thumbnail/',
            'password' => Hash::make('123'),
        ]);

        // Category
        $category1 = Category::create([
            'user_id' => $user1->id,
            'name' => 'Laptop',
            'slug' => 'laptop',
        ]);
        $category2 =  Category::create([
            'user_id' => $user2->id,
            'name' => 'Komputer',
            'slug' => 'komputer',
        ]);

        // Posts
        $post1 = Product::create([
            'user_id' => $user1->id,
            'category_id' => $category1->id,
            'title' => 'Laptop Apple M1',
            'slug' => 'laptop-apple-m1',
            'body' => 'Laptop Apple M1 description body',
        ]);

        $post2 = Product::create([
            'user_id' => $user2->id,
            'category_id' => $category1->id,
            'title' => 'Laptop Lenovo',
            'slug' => 'laptop-lenovo',
            'body' => 'Laptop Lenovo description body',
        ]);
        $post3 = Product::create([
            'user_id' => $user1->id,
            'category_id' => $category2->id,
            'title' => 'Komputer Lenovo',
            'slug' => 'komputer-lenovo',
            'body' => 'Komputer Lenovo description body',
        ]);

        // Tags
        $tags1 = Tags::create([
            'product_id' => $post1->id,
            'tag' => 'Apple M1',
        ]);
        $tags1 = Tags::create([
            'product_id' => $post3->id,
            'tag' => 'Windows 11',
        ]);
        $tags2 = Tags::create([
            'product_id' => $post2->id,
            'tag' => 'Windows',
        ]);
    }
}
