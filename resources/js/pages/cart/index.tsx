import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    slug: string;
    image: string;
    current_price: number;
    sku: string;
}

interface CartItem {
    product: Product;
    quantity: number;
    total: number;
}

interface Props {
    cart_items: CartItem[];
    total: number;
    tax_rate: number;
    shipping_cost: number;
    [key: string]: unknown;
}

export default function CartIndex({ cart_items, total, tax_rate, shipping_cost }: Props) {
    const updateQuantity = (productId: number, quantity: number) => {
        router.patch(route('cart.update'), {
            product_id: productId,
            quantity: quantity
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const removeItem = (productId: number) => {
        router.delete(route('cart.destroy'), {
            data: { product_id: productId },
            preserveState: true,
            preserveScroll: true
        });
    };

    const subtotal = total;
    const taxAmount = subtotal * tax_rate;
    const finalTotal = subtotal + taxAmount + shipping_cost;

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
                            <Link href={route('cart.index')} className="text-rose-600 font-medium">Cart</Link>
                            <Link href={route('orders.track')} className="text-gray-600 hover:text-rose-600 transition-colors">Track Order</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Shopping Cart 🛒</h2>
                    <Link href={route('products.index')}>
                        <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>

                {cart_items.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Cart Items ({cart_items.length})
                                    </h3>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {cart_items.map((item) => (
                                        <div key={item.product.id} className="p-6 flex items-center space-x-4">
                                            <Link href={route('products.show', item.product.slug)}>
                                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img 
                                                        src={item.product.image} 
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                            </Link>
                                            <div className="flex-1">
                                                <Link href={route('products.show', item.product.slug)}>
                                                    <h4 className="font-semibold text-gray-800 hover:text-rose-600 transition-colors">
                                                        {item.product.name}
                                                    </h4>
                                                </Link>
                                                <p className="text-sm text-gray-500 mt-1">SKU: {item.product.sku}</p>
                                                <p className="text-lg font-bold text-rose-600 mt-2">
                                                    ${item.product.current_price}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, Math.min(10, item.quantity + 1))}
                                                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-800">${item.total.toFixed(2)}</p>
                                                    <button
                                                        onClick={() => removeItem(item.product.id)}
                                                        className="text-sm text-red-600 hover:text-red-800 transition-colors mt-1"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-6">Order Summary 📋</h3>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax ({(tax_rate * 100).toFixed(0)}%)</span>
                                        <span>${taxAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>${shipping_cost.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between text-lg font-bold text-gray-800">
                                            <span>Total</span>
                                            <span>${finalTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href={route('checkout.index')}>
                                    <Button size="lg" className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                                        Proceed to Checkout ✨
                                    </Button>
                                </Link>
                                
                                <div className="mt-4 text-center">
                                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                        <span>🔒</span>
                                        <span>Secure checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="text-8xl mb-6">🛒</div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h3>
                            <p className="text-gray-600 mb-8">
                                Looks like you haven't added any beautiful invitations or souvenirs to your cart yet.
                            </p>
                            <Link href={route('products.index')}>
                                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                                    Start Shopping 🛍️
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}