<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Seeder;

class EcommerceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create wedding-related categories
        $categories = [
            [
                'name' => 'Wedding Invitations',
                'slug' => 'wedding-invitations',
                'description' => 'Beautiful printed wedding invitations for your special day',
                'image' => 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop',
                'sort_order' => 1,
            ],
            [
                'name' => 'Wedding Souvenirs',
                'slug' => 'wedding-souvenirs',
                'description' => 'Memorable wedding souvenirs and favors for your guests',
                'image' => 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop',
                'sort_order' => 2,
            ],
            [
                'name' => 'Thank You Cards',
                'slug' => 'thank-you-cards',
                'description' => 'Elegant thank you cards to show your appreciation',
                'image' => 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
                'sort_order' => 3,
            ],
            [
                'name' => 'Save the Date',
                'slug' => 'save-the-date',
                'description' => 'Beautiful save the date cards and announcements',
                'image' => 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop',
                'sort_order' => 4,
            ],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create($categoryData);
            
            // Create products for each category
            $productNames = $this->getProductNamesForCategory($category->slug);
            
            foreach ($productNames as $productName) {
                Product::create([
                    'category_id' => $category->id,
                    'name' => $productName,
                    'slug' => \Illuminate\Support\Str::slug($productName),
                    'description' => $this->getProductDescription($productName),
                    'features' => json_encode([
                        'Premium quality printing',
                        'Customizable design',
                        'Various paper options',
                        'Fast delivery available',
                        'Professional design assistance'
                    ]),
                    'price' => random_int(15, 150),
                    'sale_price' => null,
                    'image' => $this->getProductImage($category->slug),
                    'gallery' => json_encode([
                        $this->getProductImage($category->slug, 1),
                        $this->getProductImage($category->slug, 2),
                        $this->getProductImage($category->slug, 3),
                    ]),
                    'stock_quantity' => random_int(10, 100),
                    'track_stock' => true,
                    'status' => 'active',
                    'sku' => 'AD-' . strtoupper(\Illuminate\Support\Str::random(6)),
                    'weight' => random_int(10, 200),
                    'dimensions' => json_encode([
                        'length' => random_int(10, 25),
                        'width' => random_int(10, 25),
                        'height' => 1,
                    ]),
                ]);
            }
        }

        // Create some sample orders
        Order::factory(10)->create()->each(function ($order) {
            $products = Product::inRandomOrder()->limit(random_int(1, 4))->get();
            
            $subtotal = 0;
            foreach ($products as $product) {
                $quantity = random_int(1, 3);
                $price = $product->current_price;
                $total = $price * $quantity;
                
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_sku' => $product->sku,
                    'price' => $price,
                    'quantity' => $quantity,
                    'total' => $total,
                    'product_options' => json_encode([
                        'paper_type' => 'Premium',
                        'quantity' => $quantity * 50, // Assuming bulk orders
                    ]),
                ]);
                
                $subtotal += $total;
            }
            
            $taxAmount = $subtotal * 0.1;
            $shippingCost = 15;
            $total = $subtotal + $taxAmount + $shippingCost;
            
            $order->update([
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'shipping_cost' => $shippingCost,
                'total' => $total,
            ]);
        });
    }

    /**
     * Get product names for a category.
     */
    protected function getProductNamesForCategory(string $slug): array
    {
        return match ($slug) {
            'wedding-invitations' => [
                'Elegant Floral Wedding Invitation',
                'Modern Minimalist Invitation',
                'Vintage Lace Wedding Invitation',
                'Rustic Kraft Paper Invitation',
                'Gold Foil Luxury Invitation',
                'Watercolor Garden Invitation',
            ],
            'wedding-souvenirs' => [
                'Personalized Keychains',
                'Mini Photo Frames',
                'Scented Candles',
                'Bookmark Favors',
                'Succulent Plant Favors',
                'Custom Coasters',
            ],
            'thank-you-cards' => [
                'Floral Thank You Cards',
                'Photo Thank You Cards',
                'Minimalist Thank You Notes',
                'Vintage Style Thank You Cards',
                'Gold Accent Thank You Cards',
            ],
            'save-the-date' => [
                'Photo Save the Date Cards',
                'Magnetic Save the Date',
                'Postcard Save the Date',
                'Floral Save the Date',
                'Modern Typography Save the Date',
            ],
            default => ['Sample Product'],
        };
    }

    /**
     * Get product description.
     */
    protected function getProductDescription(string $productName): string
    {
        return "Beautiful {$productName} designed to make your special day even more memorable. Each piece is carefully crafted with attention to detail and can be customized to match your wedding theme and style.";
    }

    /**
     * Get product image based on category.
     */
    protected function getProductImage(string $categorySlug, int $variant = 0): string
    {
        $baseImages = match ($categorySlug) {
            'wedding-invitations' => [
                'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop',
            ],
            'wedding-souvenirs' => [
                'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=600&fit=crop',
            ],
            'thank-you-cards' => [
                'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=600&fit=crop',
            ],
            'save-the-date' => [
                'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=600&fit=crop',
            ],
            default => [
                'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=600&fit=crop',
            ],
        };

        return $baseImages[$variant % count($baseImages)] . '&sig=' . $variant;
    }
}