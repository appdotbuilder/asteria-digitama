<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product = Product::factory()->create();
        $price = $product->current_price;
        $quantity = fake()->numberBetween(1, 5);
        $total = $price * $quantity;
        
        return [
            'order_id' => Order::factory(),
            'product_id' => $product->id,
            'product_name' => $product->name,
            'product_sku' => $product->sku,
            'price' => $price,
            'quantity' => $quantity,
            'total' => $total,
            'product_options' => json_encode([
                'size' => fake()->randomElement(['Small', 'Medium', 'Large']),
                'color' => fake()->colorName(),
            ]),
        ];
    }
}