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
    subtotal: number;
    tax_amount: number;
    shipping_cost: number;
    total: number;
    status: string;
    payment_status: string;
    payment_method: string;
    notes?: string;
    created_at: string;
    shipped_at?: string;
    delivered_at?: string;
    items: OrderItem[];
    status_label: string;
    payment_status_label: string;
}

interface Props {
    order: Order;
    [key: string]: unknown;
}

export default function OrderShow({ order }: Props) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'paid':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'failed':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'refunded':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
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

    const getOrderProgress = () => {
        const steps = [
            { key: 'pending', label: 'Order Placed', icon: '📋', completed: true },
            { key: 'processing', label: 'Processing', icon: '⚙️', completed: ['processing', 'shipped', 'delivered'].includes(order.status) },
            { key: 'shipped', label: 'Shipped', icon: '📦', completed: ['shipped', 'delivered'].includes(order.status) },
            { key: 'delivered', label: 'Delivered', icon: '✅', completed: order.status === 'delivered' }
        ];

        return steps;
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
                            <Link href={route('orders.track')} className="text-rose-600 font-medium">Track Order</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Order Header */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Order {order.order_code}</h2>
                            <p className="text-gray-600">
                                Placed on {formatDate(order.created_at)}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                {order.status_label}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPaymentStatusColor(order.payment_status)}`}>
                                {order.payment_status_label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Order Progress */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Progress 🚀</h3>
                    <div className="flex items-center justify-between">
                        {getOrderProgress().map((step, index) => (
                            <div key={step.key} className="flex flex-col items-center flex-1">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${
                                    step.completed 
                                        ? 'bg-green-100 text-green-600' 
                                        : 'bg-gray-100 text-gray-400'
                                }`}>
                                    {step.icon}
                                </div>
                                <p className={`text-sm font-medium ${
                                    step.completed ? 'text-green-600' : 'text-gray-400'
                                }`}>
                                    {step.label}
                                </p>
                                {index < getOrderProgress().length - 1 && (
                                    <div className={`hidden sm:block absolute h-0.5 w-16 mt-6 ${
                                        step.completed ? 'bg-green-200' : 'bg-gray-200'
                                    }`} style={{ left: `${index * 25 + 12.5}%` }} />
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Timeline Details */}
                    <div className="mt-8 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Order Placed:</span>
                            <span className="font-medium">{formatDate(order.created_at)}</span>
                        </div>
                        {order.shipped_at && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Shipped:</span>
                                <span className="font-medium">{formatDate(order.shipped_at)}</span>
                            </div>
                        )}
                        {order.delivered_at && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Delivered:</span>
                                <span className="font-medium">{formatDate(order.delivered_at)}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">
                                Order Items ({order.items.length})
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

                    {/* Order Summary & Details */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary 📋</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>${order.tax_amount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>${order.shipping_cost.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between text-lg font-bold text-gray-800">
                                        <span>Total</span>
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Details */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Details 👤</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-gray-500">Name</p>
                                    <p className="font-medium">{order.customer_name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Email</p>
                                    <p className="font-medium">{order.customer_email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Phone</p>
                                    <p className="font-medium">{order.customer_phone}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Shipping Address</p>
                                    <p className="font-medium">{order.shipping_address}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Payment Method</p>
                                    <p className="font-medium">{getPaymentMethodLabel(order.payment_method)}</p>
                                </div>
                                {order.notes && (
                                    <div>
                                        <p className="text-gray-500">Order Notes</p>
                                        <p className="font-medium">{order.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12">
                    <Link href={route('orders.track')}>
                        <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                            🔍 Track Another Order
                        </Button>
                    </Link>
                    <Link href={route('products.index')}>
                        <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                            🛍️ Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}