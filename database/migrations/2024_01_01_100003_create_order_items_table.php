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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained();
            $table->string('product_name')->comment('Product name at time of order');
            $table->string('product_sku')->comment('Product SKU at time of order');
            $table->decimal('price', 10, 2)->comment('Product price at time of order');
            $table->integer('quantity')->comment('Quantity ordered');
            $table->decimal('total', 10, 2)->comment('Line total (price * quantity)');
            $table->json('product_options')->nullable()->comment('Selected product options');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('order_id');
            $table->index('product_id');
            $table->index(['order_id', 'product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};