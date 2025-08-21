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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained();
            $table->string('name')->comment('Product name');
            $table->string('slug')->unique()->comment('URL-friendly version of name');
            $table->text('description')->comment('Product description');
            $table->text('features')->nullable()->comment('Product features as JSON');
            $table->decimal('price', 10, 2)->comment('Product price');
            $table->decimal('sale_price', 10, 2)->nullable()->comment('Sale price if on sale');
            $table->string('image')->comment('Main product image');
            $table->json('gallery')->nullable()->comment('Additional product images');
            $table->integer('stock_quantity')->default(0)->comment('Current stock quantity');
            $table->boolean('track_stock')->default(true)->comment('Whether to track stock for this product');
            $table->enum('status', ['active', 'inactive', 'draft'])->default('active')->comment('Product status');
            $table->string('sku')->unique()->comment('Stock keeping unit');
            $table->decimal('weight', 8, 2)->nullable()->comment('Product weight in grams');
            $table->json('dimensions')->nullable()->comment('Product dimensions');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('category_id');
            $table->index('slug');
            $table->index('status');
            $table->index('sku');
            $table->index(['status', 'category_id']);
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};