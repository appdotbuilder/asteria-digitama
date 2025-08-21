import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-rose-100">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">💝</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Asteria Digitama
                                </h1>
                                <p className="text-sm text-gray-600">Printed Invitations & Wedding Souvenirs</p>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link href={route('home')} className="text-gray-600 hover:text-rose-600 transition-colors">Shop</Link>
                            <Link href={route('products.index')} className="text-gray-600 hover:text-rose-600 transition-colors">Products</Link>
                            <Link href={route('orders.track')} className="text-gray-600 hover:text-rose-600 transition-colors">Track Order</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6">
                            Your Perfect Wedding
                            <span className="block bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                Starts Here 💖
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Create stunning printed invitations and memorable wedding souvenirs that capture the magic of your love story. 
                            From elegant designs to premium quality printing, we bring your wedding vision to life with every detail.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href={route('home')}>
                                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-10 py-4 text-lg">
                                    Start Shopping ✨
                                </Button>
                            </Link>
                            <Link href={route('orders.track')}>
                                <Button variant="outline" size="lg" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-10 py-4 text-lg">
                                    Track Your Order 📦
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Asteria Digitama? ⭐</h3>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We're passionate about making your special day unforgettable with premium quality products and exceptional service
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: '🎨',
                                title: 'Custom Designs',
                                description: 'Personalized invitations tailored to your unique style and wedding theme'
                            },
                            {
                                icon: '💎',
                                title: 'Premium Quality',
                                description: 'High-quality materials and professional printing for lasting memories'
                            },
                            {
                                icon: '⚡',
                                title: 'Fast Delivery',
                                description: 'Quick turnaround times to meet your wedding timeline'
                            },
                            {
                                icon: '📦',
                                title: 'Easy Tracking',
                                description: 'Track your order anytime with our simple tracking system'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 hover:shadow-lg transition-shadow duration-300">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                    <span className="text-3xl">{feature.icon}</span>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Categories Preview */}
            <section className="py-16 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold text-gray-800 mb-4">Our Collections 📚</h3>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Explore our beautiful collections designed for every moment of your wedding journey
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: 'Wedding Invitations',
                                description: 'Beautiful printed invitations for your special day',
                                image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop',
                                items: '15+ designs'
                            },
                            {
                                name: 'Wedding Souvenirs',
                                description: 'Memorable keepsakes and favors for your guests',
                                image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop',
                                items: '12+ options'
                            },
                            {
                                name: 'Thank You Cards',
                                description: 'Elegant cards to show your appreciation',
                                image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
                                items: '8+ styles'
                            },
                            {
                                name: 'Save the Date',
                                description: 'Beautiful announcements for your upcoming wedding',
                                image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop',
                                items: '10+ templates'
                            }
                        ].map((category, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img 
                                        src={category.image} 
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h4>
                                    <p className="text-gray-600 mb-3">{category.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-rose-600 font-medium">{category.items}</span>
                                        <span className="text-rose-500 group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <Link href={route('home')}>
                            <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                                Explore All Products 🛍️
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto text-center">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl font-bold text-gray-800 mb-6">Ready to Create Magic? ✨</h3>
                        <p className="text-xl text-gray-600 mb-8">
                            Join thousands of happy couples who trusted us with their special day. 
                            Start creating your perfect wedding invitations and souvenirs today!
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href={route('home')}>
                                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3">
                                    Browse Products 💝
                                </Button>
                            </Link>
                            <Link href={route('orders.track')}>
                                <Button variant="outline" size="lg" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3">
                                    Track Existing Order 📋
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div>
                            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">💝</span>
                                </div>
                                <h4 className="text-xl font-bold">Asteria Digitama</h4>
                            </div>
                            <p className="text-gray-300">
                                Creating beautiful memories through premium printed invitations and wedding souvenirs.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Quick Links</h5>
                            <ul className="space-y-2 text-gray-300">
                                <li><Link href={route('home')} className="hover:text-white transition-colors">Shop Products</Link></li>
                                <li><Link href={route('products.index')} className="hover:text-white transition-colors">Browse Collections</Link></li>
                                <li><Link href={route('orders.track')} className="hover:text-white transition-colors">Track Your Order</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Contact Us</h5>
                            <div className="text-gray-300 space-y-2">
                                <p>📧 hello@asteriadigitama.com</p>
                                <p>📞 +1 (555) 123-4567</p>
                                <p>📍 123 Wedding Street, Love City</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Asteria Digitama. Made with 💖 for your special moments.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}