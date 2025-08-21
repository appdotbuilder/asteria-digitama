<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Display the checkout form.
     */
    public function index()
    {
        $cart = session('cart', []);
        
        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        $cartItems = [];
        $subtotal = 0;

        foreach ($cart as $productId => $item) {
            $product = Product::find($productId);
            if ($product) {
                $itemTotal = $product->current_price * $item['quantity'];
                $cartItems[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'total' => $itemTotal,
                ];
                $subtotal += $itemTotal;
            }
        }

        $taxRate = 0.1; // 10% tax
        $taxAmount = $subtotal * $taxRate;
        $shippingCost = 15;
        $total = $subtotal + $taxAmount + $shippingCost;

        return Inertia::render('checkout/index', [
            'cart_items' => $cartItems,
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'shipping_cost' => $shippingCost,
            'total' => $total,
        ]);
    }

    /**
     * Process the checkout and create order.
     */
    public function store(CheckoutRequest $request)
    {
        $cart = session('cart', []);
        
        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        // Calculate totals
        $subtotal = 0;
        $cartItems = [];

        foreach ($cart as $productId => $item) {
            $product = Product::find($productId);
            if ($product) {
                // Check stock availability
                if ($product->track_stock && $product->stock_quantity < $item['quantity']) {
                    return back()->with('error', "Not enough stock for {$product->name}");
                }
                
                $itemTotal = $product->current_price * $item['quantity'];
                $cartItems[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'price' => $product->current_price,
                    'total' => $itemTotal,
                ];
                $subtotal += $itemTotal;
            }
        }

        $taxAmount = $subtotal * 0.1;
        $shippingCost = 15;
        $total = $subtotal + $taxAmount + $shippingCost;

        // Create order
        $order = Order::create([
            'order_code' => Order::generateOrderCode(),
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'customer_phone' => $request->customer_phone,
            'shipping_address' => $request->shipping_address,
            'billing_address' => $request->billing_address ?: $request->shipping_address,
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'shipping_cost' => $shippingCost,
            'total' => $total,
            'status' => 'pending',
            'payment_status' => 'pending',
            'payment_method' => $request->payment_method,
            'notes' => $request->notes,
        ]);

        // Create order items and update stock
        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product']->id,
                'product_name' => $item['product']->name,
                'product_sku' => $item['product']->sku,
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'total' => $item['total'],
                'product_options' => json_encode([]),
            ]);

            // Update stock if tracking is enabled
            if ($item['product']->track_stock) {
                $item['product']->decrement('stock_quantity', $item['quantity']);
            }
        }

        // Clear cart
        session()->forget('cart');

        return redirect()->route('checkout.success', ['order' => $order->order_code])
            ->with('success', 'Your order has been placed successfully!');
    }

    /**
     * Display order success page.
     */
    public function show(Request $request)
    {
        $orderCode = $request->route('order');
        $order = Order::where('order_code', $orderCode)->with('items.product')->first();

        if (!$order) {
            return redirect()->route('home')->with('error', 'Order not found.');
        }

        return Inertia::render('checkout/success', [
            'order' => $order,
        ]);
    }
}