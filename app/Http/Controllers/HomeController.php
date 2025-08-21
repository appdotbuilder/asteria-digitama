<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured products.
     */
    public function index()
    {
        $categories = Category::active()->with(['products' => function ($query) {
            $query->active()->inStock()->limit(4);
        }])->get();

        $featuredProducts = Product::active()
            ->inStock()
            ->with('category')
            ->latest()
            ->limit(8)
            ->get();

        return Inertia::render('home', [
            'categories' => $categories,
            'featured_products' => $featuredProducts,
        ]);
    }
}