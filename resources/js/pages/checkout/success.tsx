import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    image: string;
}

interface OrderItem {
    id: number;
    product: Product;
    product_name: string;
    quantity: number;
    price: number;
    total: number;
}

interface Order {
    id: number;
    order_code: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
    total: number;
    status: string;
    payment_status: string;
    payment_method: string;
    created_at: string;
    items: OrderItem[];
}

interface Props {
    order: Order;
    [key: string]: unknown;
}

export default function CheckoutSuccess({ order }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case 'credit_card':
                return '💳 Credit Card';
            case 'bank_transfer':
                return '🏦 Bank Transfer';
            case 'cash_on_delivery':
                return '💰 Cash on Delivery';
            default:
                return method;
        }
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
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                {/* Success Message */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">✅</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Order Placed Successfully! 🎉</h2>
                    <p className="text-xl text-gray-600 mb-6">
                        Thank you for your order! We'll start working on your beautiful invitations right away.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
                        <p className="text-green-800 font-medium">
                            📋 Your Order Code: <span className="font-bold text-green-900">{order.order_code}</span>
                        </p>
                        <p className="text-green-700 text-sm mt-1">
                            Save this code to track your order
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Order Details */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                            <span className="mr-2">📄</span>
                            Order Details
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order Number</p>
                                    <p className="font-semibold">{order.order_code}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Order Date</p>
                                    <p className="font-semibold">{formatDate(order.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="font-semibold text-rose-600">${order.total}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Payment Method</p>
                                    <p className="font-semibold">{getPaymentMethodLabel(order.payment_method)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6 mt-6">
                            <h4 className="font-semibold text-gray-800 mb-4">Customer Information</h4>
                            <div className="space-y-2 text-sm">
                                <p><span className="text-gray-500">Name:</span> {order.customer_name}</p>
                                <p><span className="text-gray-500">Email:</span> {order.customer_email}</p>
                                <p><span className="text-gray-500">Phone:</span> {order.customer_phone}</p>
                                <p><span className="text-gray-500">Address:</span> {order.shipping_address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                            <span className="mr-2">📦</span>
                            Your Items ({order.items.length})
                        </h3>
                        
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <img 
                                            src={item.product.image} 
                                            alt={item.product_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800">{item.product_name}</h4>
                                        <p className="text-sm text-gray-600">
                                            ${item.price} × {item.quantity}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-800">${item.total.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="max-w-4xl mx-auto mt-12">
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">What happens next? 🚀</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Order Processing</h4>
                                <p className="text-gray-600 text-sm">
                                    We'll review your order and start designing your beautiful invitations
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎨</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Design & Print</h4>
                                <p className="text-gray-600 text-sm">
                                    Our team will carefully design and print your items with premium quality
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Delivery</h4>
                                <p className="text-gray-600 text-sm">
                                    Your order will be carefully packaged and delivered to your address
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12">
                    <Link href={route('orders.track')}>
                        <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 px-8">
                            📦 Track Your Order
                        </Button>
                    </Link>
                    <Link href={route('products.index')}>
                        <Button size="lg" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8">
                            🛍️ Continue Shopping
                        </Button>
                    </Link>
                </div>

                {/* Email Confirmation Note */}
                <div className="text-center mt-8">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
                        <p className="text-blue-800 text-sm">
                            📧 A confirmation email has been sent to <span className="font-semibold">{order.customer_email}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}