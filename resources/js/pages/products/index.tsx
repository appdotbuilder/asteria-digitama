import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    sale_price?: number;
    image: string;
    category: Category;
    is_on_sale: boolean;
    current_price: number;
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Filters {
    category?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
}

interface Props {
    products: PaginatedProducts;
    categories: Category[];
    filters: Filters;
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [minPrice, setMinPrice] = useState(filters.min_price?.toString() || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price?.toString() || '');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedCategory) params.set('category', selectedCategory);
        if (minPrice) params.set('min_price', minPrice);
        if (maxPrice) params.set('max_price', maxPrice);
        
        router.get(route('products.index'), Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        router.get(route('products.index'));
    };

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
                            <Link href={route('products.index')} className="text-rose-600 font-medium">Products</Link>
                            <Link href={route('cart.index')} className="text-gray-600 hover:text-rose-600 transition-colors">Cart</Link>
                            <Link href={route('orders.track')} className="text-gray-600 hover:text-rose-600 transition-colors">Track Order</Link>
                        </nav>
                        <Link href={route('cart.index')}>
                            <Button variant="outline" size="sm" className="relative">
                                🛒 Cart
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                🔍 Filter Products
                            </h3>
                            
                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.slug}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        placeholder="Min"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    />
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        placeholder="Max"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Filter Actions */}
                            <div className="flex gap-2">
                                <Button onClick={handleSearch} className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                                    Apply
                                </Button>
                                <Button onClick={clearFilters} variant="outline" className="flex-1">
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:w-3/4">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">Our Products 🛍️</h2>
                                <p className="text-gray-600 mt-2">
                                    Showing {products.data.length} of {products.total} products
                                </p>
                            </div>
                        </div>

                        {products.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.data.map((product) => (
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
                                                <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center justify-between mb-3">
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
                                                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                                                >
                                                    Add to Cart 🛒
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {products.last_page > 1 && (
                                    <div className="flex justify-center mt-12">
                                        <div className="flex items-center space-x-2">
                                            {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                                                <Link
                                                    key={page}
                                                    href={route('products.index', { ...filters, page })}
                                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                                        page === products.current_page
                                                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                                                            : 'bg-white text-gray-600 hover:bg-rose-50'
                                                    }`}
                                                >
                                                    {page}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Products Found</h3>
                                <p className="text-gray-600 mb-6">
                                    We couldn't find any products matching your criteria.
                                </p>
                                <Button onClick={clearFilters} variant="outline">
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}