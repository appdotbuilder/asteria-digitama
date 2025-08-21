<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderTrackingController extends Controller
{
    /**
     * Display the order tracking form.
     */
    public function index()
    {
        return Inertia::render('orders/track');
    }

    /**
     * Search for order by code and email.
     */
    public function store(Request $request)
    {
        $request->validate([
            'order_code' => 'required|string',
            'customer_email' => 'required|email',
        ], [
            'order_code.required' => 'Please enter your order code.',
            'customer_email.required' => 'Please enter your email address.',
            'customer_email.email' => 'Please enter a valid email address.',
        ]);

        $order = Order::where('order_code', $request->order_code)
            ->where('customer_email', $request->customer_email)
            ->with(['items.product'])
            ->first();

        if (!$order) {
            return back()->with('error', 'Order not found. Please check your order code and email address.');
        }

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }
}