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
    features: string[];
    price: number;
    sale_price?: number;
    image: string;
    gallery: string[];
    stock_quantity: number;
    track_stock: boolean;
    category: Category;
    is_on_sale: boolean;
    current_price: number;
    sku: string;
}

interface Props {
    product: Product;
    related_products: Product[];
    [key: string]: unknown;
}

export default function ProductShow({ product, related_products }: Props) {
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        router.post(route('cart.store'), {
            product_id: product.id,
            quantity: quantity
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const isInStock = !product.track_stock || product.stock_quantity > 0;
    const allImages = [product.image, ...(product.gallery || [])];

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
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
                    <Link href={route('home')} className="hover:text-rose-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href={route('products.index')} className="hover:text-rose-600 transition-colors">Products</Link>
                    <span>/</span>
                    <Link href={route('products.index', { category: product.category.slug })} className="hover:text-rose-600 transition-colors">
                        {product.category.name}
                    </Link>
                    <span>/</span>
                    <span className="text-gray-800">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
                            <div className="aspect-square">
                                <img 
                                    src={selectedImage} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        
                        {/* Image Gallery */}
                        <div className="grid grid-cols-4 gap-2">
                            {allImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(image)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedImage === image ? 'border-rose-500' : 'border-transparent hover:border-rose-300'
                                    }`}
                                >
                                    <img 
                                        src={image} 
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="lg:pl-8">
                        <div className="mb-4">
                            <Link 
                                href={route('products.index', { category: product.category.slug })}
                                className="inline-block bg-rose-100 text-rose-700 text-sm px-3 py-1 rounded-full hover:bg-rose-200 transition-colors"
                            >
                                {product.category.name}
                            </Link>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        
                        <div className="flex items-center space-x-4 mb-6">
                            {product.is_on_sale && (
                                <span className="text-xl text-gray-400 line-through">
                                    ${product.price}
                                </span>
                            )}
                            <span className="text-3xl font-bold text-rose-600">
                                ${product.current_price}
                            </span>
                            {product.is_on_sale && (
                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                    Save ${(product.price - product.current_price).toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Product Features */}
                        {product.features && product.features.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">✨ Features</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center space-x-2 text-gray-600">
                                            <span className="text-rose-500">•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Stock Status */}
                        <div className="mb-6">
                            <div className="flex items-center space-x-2">
                                {isInStock ? (
                                    <>
                                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                        <span className="text-green-700 font-medium">In Stock</span>
                                        {product.track_stock && (
                                            <span className="text-gray-500">({product.stock_quantity} available)</span>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                        <span className="text-red-700 font-medium">Out of Stock</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        {isInStock && (
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm font-medium text-gray-700">Quantity:</label>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                <Button 
                                    onClick={addToCart}
                                    size="lg" 
                                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 px-8"
                                >
                                    Add to Cart 🛒
                                </Button>
                            </div>
                        )}

                        {/* Product Info */}
                        <div className="border-t border-gray-200 pt-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">SKU:</span>
                                    <span className="ml-2 font-medium">{product.sku}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Category:</span>
                                    <span className="ml-2 font-medium">{product.category.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related_products.length > 0 && (
                    <section className="mt-16">
                        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                            You Might Also Like 💖
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {related_products.map((relatedProduct) => (
                                <div key={relatedProduct.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                                    <Link href={route('products.show', relatedProduct.slug)}>
                                        <div className="aspect-square overflow-hidden">
                                            <img 
                                                src={relatedProduct.image} 
                                                alt={relatedProduct.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    </Link>
                                    <div className="p-4">
                                        <Link href={route('products.show', relatedProduct.slug)}>
                                            <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">
                                                {relatedProduct.name}
                                            </h4>
                                        </Link>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-rose-600">
                                                ${relatedProduct.current_price}
                                            </span>
                                            {relatedProduct.is_on_sale && (
                                                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                                                    Sale!
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}