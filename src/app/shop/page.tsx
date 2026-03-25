'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useStore, MOCK_PRODUCTS, Product } from '@/lib/store';
import { 
    ShoppingCart, 
    Package, 
    CheckCircle2, 
    Heart, 
    Search,
    Star,
    SlidersHorizontal,
    Grid3X3,
    LayoutGrid
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Shop() {
    const { searchQuery, setSearchQuery, activeCategory, setActiveCategory, priceRange, setPriceRange, minRating, setMinRating, inStockOnly, setInStockOnly } = useStore();
    const [showFilters, setShowFilters] = useState(false);
    const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Search suggestions
    const suggestions = useMemo(() => {
        if (!searchQuery || searchQuery.length < 2) return [];
        return MOCK_PRODUCTS.filter(p => 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5);
    }, [searchQuery]);

    // Filtered products
    const filteredProducts = useMemo(() => {
        let filtered = MOCK_PRODUCTS;
        
        // Search
        if (searchQuery) {
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        // Category
        if (activeCategory !== 'ALL') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }
        
        // Price range
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
        
        // Rating
        if (minRating > 0) {
            filtered = filtered.filter(p => (p.rating || 0) >= minRating);
        }
        
        // In stock
        if (inStockOnly) {
            filtered = filtered.filter(p => p.inStock !== false);
        }
        
        return filtered;
    }, [searchQuery, activeCategory, priceRange, minRating, inStockOnly]);

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const categories = ['ALL', 'HARDWARE', 'APPAREL', 'OPTICS'];

    const gridCols = {
        small: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
        medium: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        large: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    };

    return (
        <main className="min-h-screen bg-surface text-white">
            <Navbar />

            <div className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 lg:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-headline font-black tracking-tighter text-white uppercase mb-1">MARKETPLACE</h1>
                    <p className="text-[9px] sm:text-[10px] font-headline text-neutral-500 uppercase tracking-wider font-bold">
                        {filteredProducts.length} ASSETS FOUND
                    </p>
                </div>

                {/* Search & Filters Bar */}
                <div className="mb-6 flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div ref={searchRef} className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                        <input 
                            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-600 font-headline uppercase tracking-wider outline-none focus:border-white/30 transition-all"
                            placeholder="Search assets..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                        />
                        
                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-low border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl">
                                {suggestions.map((product) => (
                                    <Link 
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        onClick={() => {
                                            setSearchQuery('');
                                            setShowSuggestions(false);
                                        }}
                                        className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                                    >
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image src={product.image} alt={product.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-headline text-sm text-white uppercase truncate">{product.title}</p>
                                            <p className="text-[10px] text-neutral-500 uppercase">{product.category} • {product.brand}</p>
                                        </div>
                                        <p className="font-headline font-bold text-white">₹{product.price.toLocaleString()}</p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filter Toggle */}
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border font-headline text-xs uppercase tracking-wider font-bold transition-all ${
                            showFilters 
                                ? 'bg-white text-black border-white' 
                                : 'bg-surface-container-low border-white/10 text-neutral-400 hover:border-white/30'
                        }`}
                    >
                        <SlidersHorizontal size={16} />
                        Filters
                        {(minRating > 0 || inStockOnly || priceRange[0] > 0 || priceRange[1] < 5000) && (
                            <span className="w-2 h-2 bg-orange-500 rounded-full" />
                        )}
                    </button>

                    {/* Grid Size Toggle */}
                    <div className="flex items-center gap-1 bg-surface-container-low border border-white/10 rounded-xl p-1">
                        <button 
                            onClick={() => setGridSize('small')}
                            className={`p-2.5 rounded-lg transition-colors ${gridSize === 'small' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
                        >
                            <Grid3X3 size={16} />
                        </button>
                        <button 
                            onClick={() => setGridSize('medium')}
                            className={`p-2.5 rounded-lg transition-colors ${gridSize === 'medium' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                    </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="mb-8 p-6 bg-surface-container-low border border-white/10 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-headline text-sm font-bold text-white uppercase tracking-wider">Filters</h3>
                            <button 
                                onClick={() => {
                                    setMinRating(0);
                                    setInStockOnly(false);
                                    setPriceRange([0, 5000]);
                                }}
                                className="text-xs text-neutral-500 hover:text-white uppercase tracking-wider font-headline"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-3">Category</label>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg font-headline text-xs uppercase tracking-wider font-bold transition-all ${
                                                activeCategory === cat 
                                                    ? 'bg-white text-black' 
                                                    : 'bg-surface-container border border-white/5 text-neutral-400 hover:border-white/20'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-3">Price Range</label>
                                <div className="space-y-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="5000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full accent-white"
                                    />
                                    <div className="flex items-center gap-2">
                                        <span className="font-headline text-xs text-neutral-500">₹{priceRange[0]}</span>
                                        <span className="text-neutral-700">-</span>
                                        <span className="font-headline text-xs text-neutral-500">₹{priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-3">Customer Rating</label>
                                <div className="space-y-2">
                                    {[4, 3, 2, 1].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                                            className={`w-full text-left flex items-center gap-2 px-4 py-2.5 rounded-lg font-headline text-xs transition-all ${
                                                minRating === rating 
                                                    ? 'bg-white text-black' 
                                                    : 'bg-surface-container border border-white/5 text-neutral-400 hover:border-white/20'
                                            }`}
                                        >
                                            <span className="text-yellow-400">{'★'.repeat(rating)}</span>
                                            <span className="text-neutral-500">& up</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Availability */}
                            <div>
                                <label className="block font-headline text-[10px] text-neutral-500 uppercase tracking-wider mb-3">Availability</label>
                                <button
                                    onClick={() => setInStockOnly(!inStockOnly)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-headline text-xs transition-all ${
                                        inStockOnly 
                                            ? 'bg-white text-black' 
                                            : 'bg-surface-container border border-white/5 text-neutral-400 hover:border-white/20'
                                    }`}
                                >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                        inStockOnly ? 'bg-black border-black' : 'border-current'
                                    }`}>
                                        {inStockOnly && <CheckCircle2 size={12} className="text-white" />}
                                    </div>
                                    Include Out of Stock
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Category Pills */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-full font-headline text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
                                activeCategory === cat 
                                    ? 'bg-white text-black' 
                                    : 'bg-surface-container-low border border-white/10 text-neutral-400 hover:border-white/30'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className={`grid gap-4 sm:gap-6 ${gridCols[gridSize as keyof typeof gridCols]}`}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                    
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center border border-white/5 rounded-2xl bg-white/[0.02]">
                            <Package className="text-neutral-700 w-12 h-12 mb-6" />
                            <p className="font-headline text-neutral-500 uppercase tracking-wider text-sm font-bold mb-4">No products found</p>
                            <button 
                                onClick={() => {
                                    setSearchQuery('');
                                    setActiveCategory('ALL');
                                    setMinRating(0);
                                    setInStockOnly(false);
                                    setPriceRange([0, 5000]);
                                }}
                                className="px-6 py-3 bg-white text-black font-headline font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function ProductCard({ id, title, price, originalPrice, image, category, rating, reviewCount, inStock, stockCount, brand }: Product) {
    const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useStore();
    const [added, setAdded] = useState(false);
    
    const isInWishlist = wishlist.includes(id);
    const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({ id, title, price, image, category, brand });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInWishlist) {
            removeFromWishlist(id);
        } else {
            addToWishlist(id);
        }
    };

    return (
        <div className="group relative">
            <Link href={`/product/${id}`} className="block rounded-xl bg-surface-container-low border border-white/5 hover:border-white/20 transition-all overflow-hidden">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-surface-container">
                    <Image 
                        src={image} 
                        alt={title} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {discount > 0 && (
                            <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded">
                                -{discount}%
                            </span>
                        )}
                        {!inStock && (
                            <span className="px-2 py-1 bg-neutral-700 text-white text-[10px] font-bold rounded">
                                Out of Stock
                            </span>
                        )}
                        {inStock && stockCount && stockCount < 10 && (
                            <span className="px-2 py-1 bg-orange-500 text-white text-[10px] font-bold rounded">
                                Only {stockCount} left
                            </span>
                        )}
                    </div>

                    {/* Wishlist */}
                    <button 
                        onClick={handleWishlist}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 ${
                            isInWishlist ? 'bg-red-500/90 text-white' : 'bg-black/60 text-neutral-300 hover:text-white'
                        }`}
                    >
                        <Heart size={16} className={isInWishlist ? 'fill-current' : ''} />
                    </button>

                    {/* Quick Add */}
                    <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button 
                            onClick={handleQuickAdd}
                            className={`w-full py-2.5 font-headline font-bold uppercase text-[10px] tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${
                                added ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-neutral-200'
                            }`}
                        >
                            {added ? <CheckCircle2 size={14} /> : <ShoppingCart size={14} />}
                            {added ? 'Added!' : 'Add to Cart'}
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="p-4">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">{brand}</p>
                    <h3 className="font-headline text-sm font-bold text-white uppercase mb-2 line-clamp-2 leading-tight">
                        {title}
                    </h3>
                    
                    {/* Rating */}
                    {rating && (
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star 
                                        key={star} 
                                        size={10} 
                                        className={star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'} 
                                    />
                                ))}
                            </div>
                            <span className="text-[10px] text-neutral-500">({reviewCount})</span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="font-headline text-base font-bold text-white">
                            ₹{price.toLocaleString()}
                        </span>
                        {originalPrice && (
                            <>
                                <span className="text-xs text-neutral-500 line-through">
                                    ₹{originalPrice.toLocaleString()}
                                </span>
                                <span className="text-[10px] text-green-500 font-bold">
                                    {discount}% off
                                </span>
                            </>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className="mt-2 flex items-center gap-1">
                        {inStock ? (
                            <>
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-[10px] text-green-500 font-bold uppercase">In Stock</span>
                            </>
                        ) : (
                            <>
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                <span className="text-[10px] text-red-500 font-bold uppercase">Out of Stock</span>
                            </>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
