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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_code')->unique()->comment('Unique order tracking code');
            $table->string('customer_name')->comment('Customer full name');
            $table->string('customer_email')->comment('Customer email address');
            $table->string('customer_phone')->comment('Customer phone number');
            $table->text('shipping_address')->comment('Full shipping address');
            $table->text('billing_address')->nullable()->comment('Billing address if different');
            $table->decimal('subtotal', 10, 2)->comment('Order subtotal before tax');
            $table->decimal('tax_amount', 10, 2)->default(0)->comment('Tax amount');
            $table->decimal('shipping_cost', 10, 2)->default(0)->comment('Shipping cost');
            $table->decimal('total', 10, 2)->comment('Order total amount');
            $table->enum('status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending')->comment('Order status');
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending')->comment('Payment status');
            $table->string('payment_method')->nullable()->comment('Payment method used');
            $table->text('notes')->nullable()->comment('Order notes');
            $table->timestamp('shipped_at')->nullable()->comment('When order was shipped');
            $table->timestamp('delivered_at')->nullable()->comment('When order was delivered');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('order_code');
            $table->index('customer_email');
            $table->index('status');
            $table->index('payment_status');
            $table->index(['customer_email', 'order_code']);
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};