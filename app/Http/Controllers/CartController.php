<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the shopping cart.
     */
    public function index(Request $request)
    {
        $cart = session('cart', []);
        $cartItems = [];
        $total = 0;

        foreach ($cart as $productId => $item) {
            $product = Product::find($productId);
            if ($product) {
                $itemTotal = $product->current_price * $item['quantity'];
                $cartItems[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'total' => $itemTotal,
                ];
                $total += $itemTotal;
            }
        }

        return Inertia::render('cart/index', [
            'cart_items' => $cartItems,
            'total' => $total,
            'tax_rate' => 0.1, // 10% tax
            'shipping_cost' => 15,
        ]);
    }

    /**
     * Add item to cart.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        $product = Product::findOrFail($request->product_id);
        
        // Check stock
        if ($product->track_stock && $product->stock_quantity < $request->quantity) {
            return back()->with('error', 'Not enough stock available.');
        }

        $cart = session('cart', []);
        $productId = $product->id;

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += $request->quantity;
        } else {
            $cart[$productId] = [
                'quantity' => $request->quantity,
            ];
        }

        session(['cart' => $cart]);

        return back()->with('success', 'Product added to cart successfully!');
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:0|max:10',
        ]);

        $cart = session('cart', []);
        $productId = $request->product_id;

        if ($request->quantity === 0) {
            unset($cart[$productId]);
        } else {
            if (isset($cart[$productId])) {
                $cart[$productId]['quantity'] = $request->quantity;
            }
        }

        session(['cart' => $cart]);

        return redirect()->route('cart.index')->with('success', 'Cart updated successfully!');
    }

    /**
     * Remove item from cart.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = session('cart', []);
        unset($cart[$request->product_id]);
        session(['cart' => $cart]);

        return redirect()->route('cart.index')->with('success', 'Item removed from cart!');
    }
}