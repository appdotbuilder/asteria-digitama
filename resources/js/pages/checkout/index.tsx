import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    slug: string;
    image: string;
    current_price: number;
}

interface CartItem {
    product: Product;
    quantity: number;
    total: number;
}

interface CheckoutData {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
    billing_address: string;
    payment_method: string;
    notes: string;
    [key: string]: string;
}

interface Props {
    cart_items: CartItem[];
    subtotal: number;
    tax_amount: number;
    shipping_cost: number;
    total: number;
    [key: string]: unknown;
}

export default function CheckoutIndex({ cart_items, subtotal, tax_amount, shipping_cost, total }: Props) {
    const { data, setData, post, processing, errors } = useForm<CheckoutData>({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        shipping_address: '',
        billing_address: '',
        payment_method: 'credit_card',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-rose-100">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href={route('home')} className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">💝</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Asteria Digitama
                                </h1>
                            </div>
                        </Link>
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link href={route('home')} className="text-gray-600 hover:text-rose-600 transition-colors">Home</Link>
                            <Link href={route('products.index')} className="text-gray-600 hover:text-rose-600 transition-colors">Products</Link>
                            <Link href={route('cart.index')} className="text-gray-600 hover:text-rose-600 transition-colors">Cart</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Checkout Steps */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                ✓
                            </div>
                            <span className="text-green-600 font-medium">Cart</span>
                        </div>
                        <div className="w-8 h-0.5 bg-rose-300"></div>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                2
                            </div>
                            <span className="text-rose-600 font-medium">Checkout</span>
                        </div>
                        <div className="w-8 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">
                                3
                            </div>
                            <span className="text-gray-500 font-medium">Complete</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="mr-2">📝</span>
                                Checkout Details
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Customer Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.customer_name}
                                                onChange={(e) => setData('customer_name', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                                placeholder="Enter your full name"
                                            />
                                            {errors.customer_name && (
                                                <p className="text-red-600 text-sm mt-1">{errors.customer_name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                value={data.customer_email}
                                                onChange={(e) => setData('customer_email', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                                placeholder="Enter your email"
                                            />
                                            {errors.customer_email && (
                                                <p className="text-red-600 text-sm mt-1">{errors.customer_email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.customer_phone}
                                            onChange={(e) => setData('customer_phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.customer_phone && (
                                            <p className="text-red-600 text-sm mt-1">{errors.customer_phone}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Address *
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={data.shipping_address}
                                            onChange={(e) => setData('shipping_address', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                            placeholder="Enter your complete shipping address"
                                        />
                                        {errors.shipping_address && (
                                            <p className="text-red-600 text-sm mt-1">{errors.shipping_address}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-rose-50 transition-colors">
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value="credit_card"
                                                checked={data.payment_method === 'credit_card'}
                                                onChange={(e) => setData('payment_method', e.target.value)}
                                                className="text-rose-600 focus:ring-rose-500"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <span>💳</span>
                                                <span className="font-medium">Credit Card</span>
                                            </div>
                                        </label>
                                        <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-rose-50 transition-colors">
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value="bank_transfer"
                                                checked={data.payment_method === 'bank_transfer'}
                                                onChange={(e) => setData('payment_method', e.target.value)}
                                                className="text-rose-600 focus:ring-rose-500"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <span>🏦</span>
                                                <span className="font-medium">Bank Transfer</span>
                                            </div>
                                        </label>
                                        <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-rose-50 transition-colors">
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value="cash_on_delivery"
                                                checked={data.payment_method === 'cash_on_delivery'}
                                                onChange={(e) => setData('payment_method', e.target.value)}
                                                className="text-rose-600 focus:ring-rose-500"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <span>💰</span>
                                                <span className="font-medium">Cash on Delivery</span>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.payment_method && (
                                        <p className="text-red-600 text-sm mt-1">{errors.payment_method}</p>
                                    )}
                                </div>

                                {/* Order Notes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Order Notes (Optional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                        placeholder="Any special instructions for your order..."
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-6">
                                    <Link href={route('cart.index')}>
                                        <Button type="button" variant="outline">
                                            ← Back to Cart
                                        </Button>
                                    </Link>
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        size="lg"
                                        className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                                    >
                                        {processing ? 'Processing...' : 'Place Order ✨'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Summary 📋</h3>
                            
                            {/* Cart Items */}
                            <div className="space-y-4 mb-6">
                                {cart_items.map((item) => (
                                    <div key={item.product.id} className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                            <img 
                                                src={item.product.image} 
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-gray-800">{item.product.name}</h4>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-sm font-medium text-gray-800">
                                            ${item.total.toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="border-t border-gray-200 pt-4">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax</span>
                                        <span>${tax_amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>${shipping_cost.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between text-lg font-bold text-gray-800">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                        <span>🔒</span>
                                        <span>Secure checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}