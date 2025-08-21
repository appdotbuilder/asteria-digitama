import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    products: Product[];
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    image: string;
    category: Category;
    is_on_sale: boolean;
    current_price: number;
}

interface Props {
    categories: Category[];
    featured_products: Product[];
    [key: string]: unknown;
}

export default function Home({ categories, featured_products }: Props) {
    const addToCart = (productId: number) => {
        router.post(route('cart.store'), {
            product_id: productId,
            quantity: 1
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

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
                            <Link href={route('home')} className="text-rose-600 font-medium">Home</Link>
                            <Link href={route('products.index')} className="text-gray-600 hover:text-rose-600 transition-colors">Products</Link>
                            <Link href={route('cart.index')} className="text-gray-600 hover:text-rose-600 transition-colors">Cart</Link>
                            <Link href={route('orders.track')} className="text-gray-600 hover:text-rose-600 transition-colors">Track Order</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Link href={route('cart.index')}>
                                <Button variant="outline" size="sm" className="relative">
                                    🛒 Cart
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                            Make Your Special Day
                            <span className="block bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                Unforgettable 💕
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Beautiful printed invitations and wedding souvenirs designed to capture the magic of your love story. 
                            From elegant invitations to memorable keepsakes, we bring your vision to life.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href={route('products.index')}>
                                <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3">
                                    Shop Now ✨
                                </Button>
                            </Link>
                            <Link href={route('orders.track')}>
                                <Button variant="outline" size="lg" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3">
                                    Track Your Order 📦
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Collections 📚</h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Explore our carefully curated collections designed for every moment of your wedding journey
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((category) => (
                            <div key={category.id} className="group cursor-pointer">
                                <Link href={route('products.index', { category: category.slug })}>
                                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 transform group-hover:scale-105 transition-all duration-300 shadow-sm group-hover:shadow-lg">
                                        <div className="aspect-square rounded-xl overflow-hidden mb-4">
                                            <img 
                                                src={category.image} 
                                                alt={category.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <h4 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h4>
                                        <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-rose-600 font-medium">
                                                {category.products.length} products
                                            </span>
                                            <span className="text-rose-500 group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Featured Products ⭐</h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover our most loved designs that couples choose for their special moments
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featured_products.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                                <Link href={route('products.show', product.slug)}>
                                    <div className="aspect-square overflow-hidden">
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </Link>
                                <div className="p-4">
                                    <Link href={route('products.show', product.slug)}>
                                        <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">
                                            {product.name}
                                        </h4>
                                    </Link>
                                    <p className="text-sm text-gray-500 mb-3">{product.category.name}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            {product.is_on_sale && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    ${product.price}
                                                </span>
                                            )}
                                            <span className="font-bold text-rose-600">
                                                ${product.current_price}
                                            </span>
                                            {product.is_on_sale && (
                                                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                                                    Sale!
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Button 
                                        onClick={() => addToCart(product.id)}
                                        size="sm" 
                                        className="w-full mt-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                                    >
                                        Add to Cart 🛒
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href={route('products.index')}>
                            <Button size="lg" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                                View All Products 👀
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Asteria Digitama? 💫</h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We're committed to making your wedding dreams come true with exceptional quality and service
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl text-white">🎨</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">Custom Designs</h4>
                            <p className="text-gray-600">
                                Personalized designs tailored to your unique style and wedding theme
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl text-white">⚡</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">Fast Delivery</h4>
                            <p className="text-gray-600">
                                Quick turnaround times to ensure your invitations arrive when you need them
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl text-white">💎</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">Premium Quality</h4>
                            <p className="text-gray-600">
                                High-quality materials and printing techniques for lasting memories
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">💝</span>
                                </div>
                                <h4 className="text-xl font-bold">Asteria Digitama</h4>
                            </div>
                            <p className="text-gray-300">
                                Creating beautiful memories through printed invitations and wedding souvenirs.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Quick Links</h5>
                            <ul className="space-y-2 text-gray-300">
                                <li><Link href={route('products.index')} className="hover:text-white transition-colors">Products</Link></li>
                                <li><Link href={route('cart.index')} className="hover:text-white transition-colors">Cart</Link></li>
                                <li><Link href={route('orders.track')} className="hover:text-white transition-colors">Track Order</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-4">Contact Us</h5>
                            <div className="text-gray-300 space-y-2">
                                <p>📧 hello@asteriadigitama.com</p>
                                <p>📞 +1 (555) 123-4567</p>
                                <p>📍 123 Wedding St, Love City</p>
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