<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 50, 500);
        $taxAmount = $subtotal * 0.1; // 10% tax
        $shippingCost = fake()->randomFloat(2, 5, 25);
        $total = $subtotal + $taxAmount + $shippingCost;
        
        return [
            'order_code' => Order::generateOrderCode(),
            'customer_name' => fake()->name(),
            'customer_email' => fake()->email(),
            'customer_phone' => fake()->phoneNumber(),
            'shipping_address' => fake()->address(),
            'billing_address' => fake()->boolean(20) ? fake()->address() : null,
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'shipping_cost' => $shippingCost,
            'total' => $total,
            'status' => fake()->randomElement(['pending', 'processing', 'shipped', 'delivered']),
            'payment_status' => fake()->randomElement(['pending', 'paid']),
            'payment_method' => fake()->randomElement(['credit_card', 'bank_transfer', 'cash_on_delivery']),
            'notes' => fake()->optional()->sentence(),
            'shipped_at' => fake()->optional(0.7)->dateTimeBetween('-1 month', 'now'),
            'delivered_at' => fake()->optional(0.3)->dateTimeBetween('-2 weeks', 'now'),
        ];
    }
}