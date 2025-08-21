import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface TrackingData {
    order_code: string;
    customer_email: string;
    [key: string]: string;
}

export default function OrderTrack() {
    const { data, setData, post, processing, errors } = useForm<TrackingData>({
        order_code: '',
        customer_email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('orders.track.search'));
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
                            <Link href={route('orders.track')} className="text-rose-600 font-medium">Track Order</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl text-white">📦</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Track Your Order</h2>
                        <p className="text-gray-600">
                            Enter your order code and email address to check the status of your order
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Order Code *
                                </label>
                                <input
                                    type="text"
                                    value={data.order_code}
                                    onChange={(e) => setData('order_code', e.target.value.toUpperCase())}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-center font-mono text-lg tracking-wider"
                                    placeholder="AD-XXXXXXXX"
                                />
                                {errors.order_code && (
                                    <p className="text-red-600 text-sm mt-1">{errors.order_code}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1 text-center">
                                    Enter the order code from your confirmation email
                                </p>
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
                                    placeholder="Enter your email address"
                                />
                                {errors.customer_email && (
                                    <p className="text-red-600 text-sm mt-1">{errors.customer_email}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1 text-center">
                                    The email address used when placing the order
                                </p>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={processing}
                                size="lg"
                                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                            >
                                {processing ? 'Searching...' : '🔍 Track Order'}
                            </Button>
                        </form>
                    </div>

                    {/* Help Section */}
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                            <span className="mr-2">💡</span>
                            Need Help?
                        </h3>
                        <div className="text-sm text-blue-800 space-y-2">
                            <p>• Your order code is in the format AD-XXXXXXXX</p>
                            <p>• Check your email confirmation for the exact order code</p>
                            <p>• Use the same email address you used when placing the order</p>
                            <p>• Orders typically take 3-5 business days to process</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-blue-200">
                            <p className="text-sm text-blue-700">
                                Can't find your order? Contact us at{' '}
                                <a href="mailto:support@asteriadigitama.com" className="font-semibold underline">
                                    support@asteriadigitama.com
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Link href={route('home')}>
                            <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                                ← Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}