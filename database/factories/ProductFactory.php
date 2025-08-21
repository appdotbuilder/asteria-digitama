<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(3, true);
        $price = fake()->randomFloat(2, 10, 500);
        $salePrice = fake()->boolean(30) ? fake()->randomFloat(2, 5, $price - 5) : null;
        
        return [
            'category_id' => Category::factory(),
            'name' => ucwords($name),
            'slug' => Str::slug($name),
            'description' => fake()->paragraph(3),
            'features' => json_encode([
                'Premium quality printing',
                'Customizable design',
                'Fast delivery',
                'Eco-friendly materials'
            ]),
            'price' => $price,
            'sale_price' => $salePrice,
            'image' => 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=600&fit=crop',
            'gallery' => json_encode([
                'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=600&fit=crop&sig=1',
                'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=600&fit=crop&sig=2',
            ]),
            'stock_quantity' => fake()->numberBetween(0, 100),
            'track_stock' => true,
            'status' => 'active',
            'sku' => 'AD-' . strtoupper(Str::random(6)),
            'weight' => fake()->randomFloat(2, 10, 1000),
            'dimensions' => json_encode([
                'length' => fake()->numberBetween(10, 30),
                'width' => fake()->numberBetween(10, 30),
                'height' => fake()->numberBetween(1, 5),
            ]),
        ];
    }
}