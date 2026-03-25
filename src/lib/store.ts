import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    description?: string;
    rating?: number;
    reviewCount?: number;
    inStock?: boolean;
    stockCount?: number;
    variants?: { type: string; options: string[]; selected?: string }[];
    brand?: string;
    seller?: string;
}

export interface CartItem extends Product {
    quantity: number;
    selectedVariants?: Record<string, string>;
}

export interface Review {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    helpful: number;
    verified: boolean;
}

export interface Address {
    id: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    isDefault: boolean;
    type?: 'home' | 'work' | 'other';
}

export const MOCK_PRODUCTS: Product[] = [
    { id: 'NBL-001', title: 'Sony WH-1000XM5 Wireless Headphones', price: 299.00, originalPrice: 349.00, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', category: 'Electronics', description: 'Industry-leading noise cancellation with premium sound quality. 30-hour battery life.', rating: 4.8, reviewCount: 2456, inStock: true, stockCount: 45, brand: 'Sony', seller: 'NEBULA Store', variants: [{ type: 'Color', options: ['Black', 'Silver', 'Midnight Blue'], selected: 'Black' }] },
    { id: 'NBL-002', title: 'Apple Watch Series 9 GPS + Cellular', price: 429.00, originalPrice: 499.00, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800', category: 'Electronics', description: 'Advanced health features, Always-On Retina display, water resistant.', rating: 4.7, reviewCount: 1892, inStock: true, stockCount: 28, brand: 'Apple', seller: 'NEBULA Store', variants: [{ type: 'Size', options: ['41mm', '45mm'] }, { type: 'Color', options: ['Midnight', 'Starlight', 'Red'] }] },
    { id: 'NBL-003', title: 'Nike Air Max 270 Running Shoes', price: 150.00, originalPrice: 180.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', category: 'Fashion', description: 'Lightweight running shoes with Max Air unit for cushioned comfort.', rating: 4.6, reviewCount: 3421, inStock: true, stockCount: 85, brand: 'Nike', seller: 'NEBULA Store', variants: [{ type: 'Size', options: ['7', '8', '9', '10', '11', '12'] }, { type: 'Color', options: ['Black/White', 'Red/Black', 'Blue/White'] }] },
    { id: 'NBL-004', title: 'MacBook Pro 14-inch M3 Pro', price: 1999.00, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800', category: 'Electronics', description: 'Supercharged by M3 Pro chip. 18-hour battery life, stunning Liquid Retina XDR display.', rating: 4.9, reviewCount: 876, inStock: true, stockCount: 12, brand: 'Apple', seller: 'NEBULA Store', variants: [{ type: 'Storage', options: ['512GB', '1TB', '2TB'] }, { type: 'Color', options: ['Space Black', 'Silver'] }] },
    { id: 'NBL-005', title: 'Samsung 65" QLED 4K Smart TV', price: 1299.00, originalPrice: 1599.00, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800', category: 'Electronics', description: 'Stunning 4K QLED display with Quantum HDR. Smart TV with voice control.', rating: 4.5, reviewCount: 1245, inStock: true, stockCount: 20, brand: 'Samsung', seller: 'NEBULA Store', variants: [{ type: 'Size', options: ['55"', '65"', '75"'] }] },
    { id: 'NBL-006', title: 'Levi\'s 501 Original Fit Jeans', price: 69.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800', category: 'Fashion', description: 'The original blue jean since 1873. Straight leg, button fly.', rating: 4.4, reviewCount: 5678, inStock: true, stockCount: 150, brand: 'Levi\'s', seller: 'NEBULA Store', variants: [{ type: 'Size', options: ['28', '30', '32', '34', '36', '38'] }, { type: 'Color', options: ['Dark Stonewash', 'Medium Stonewash', 'Light Stonewash'] }] },
    { id: 'NBL-007', title: 'Dyson V15 Detect Vacuum', price: 749.00, originalPrice: 899.00, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800', category: 'Home & Kitchen', description: 'Powerful cordless vacuum with laser dust detection. 60-minute runtime.', rating: 4.7, reviewCount: 892, inStock: true, stockCount: 18, brand: 'Dyson', seller: 'NEBULA Store', variants: [{ type: 'Color', options: ['Nickel/Copper', 'Purple'] }] },
    { id: 'NBL-008', title: 'Instant Pot Duo 7-in-1', price: 89.99, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800', category: 'Home & Kitchen', description: 'Electric pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker.', rating: 4.6, reviewCount: 4532, inStock: true, stockCount: 65, brand: 'Instant Pot', seller: 'NEBULA Store', variants: [{ type: 'Size', options: ['6qt', '8qt'] }] },
    { id: 'NBL-009', title: 'Ray-Ban Aviator Classic Sunglasses', price: 178.00, originalPrice: 220.00, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800', category: 'Fashion', description: 'Iconic aviator style with crystal green G-15 lenses. 100% UV protection.', rating: 4.5, reviewCount: 2341, inStock: true, stockCount: 42, brand: 'Ray-Ban', seller: 'NEBULA Store', variants: [{ type: 'Frame', options: ['Gold', 'Silver', 'Black'] }] },
    { id: 'NBL-010', title: 'PlayStation 5 Console Bundle', price: 559.99, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800', category: 'Electronics', description: 'Next-gen gaming with 825GB SSD, 4K gaming, Ray Tracing, DualSense controller.', rating: 4.9, reviewCount: 5678, inStock: false, stockCount: 0, brand: 'Sony', seller: 'NEBULA Store' },
    { id: 'NBL-011', title: 'North Face Thermoball Jacket', price: 199.00, originalPrice: 279.00, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800', category: 'Fashion', description: 'Lightweight insulated jacket packable into its own pocket. Water-resistant.', rating: 4.6, reviewCount: 1567, inStock: true, stockCount: 35, brand: 'The North Face', seller: 'NEBULA Store', variants: [{ type: 'Size', options: ['S', 'M', 'L', 'XL'] }, { type: 'Color', options: ['Black', 'Blue', 'Red'] }] },
    { id: 'NBL-012', title: 'KitchenAid Stand Mixer', price: 379.99, image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&q=80&w=800', category: 'Home & Kitchen', description: '5.5 Quart bowl-lift stand mixer. 10 speeds, tilt-head design.', rating: 4.8, reviewCount: 3245, inStock: true, stockCount: 25, brand: 'KitchenAid', seller: 'NEBULA Store', variants: [{ type: 'Color', options: ['Empire Red', 'Pebblemine', 'Onyx', 'White'] }] },
];

export const MOCK_DEALS = [
    { id: 'deal-1', title: 'UP TO 40% OFF', discount: 40, endTime: Date.now() + 3600000 * 5, products: ['NBL-001', 'NBL-002', 'NBL-003'] },
    { id: 'deal-2', title: 'ELECTRONICS SALE', discount: 30, endTime: Date.now() + 86400000 * 2, products: ['NBL-004', 'NBL-005', 'NBL-010'] },
    { id: 'deal-3', title: 'FASHION CLEARANCE', discount: 50, endTime: Date.now() + 86400000, products: ['NBL-006', 'NBL-009', 'NBL-011'] },
];

export const MOCK_REVIEWS: Record<string, Review[]> = {
    'NBL-001': [
        { id: 'r1', userId: 'u1', userName: 'TechArchitect_42', rating: 5, title: 'Exceptional audio quality!', comment: 'The neural sync feature works flawlessly. Best investment for my setup.', date: '2026-03-15', helpful: 45, verified: true },
        { id: 'r2', userId: 'u2', userName: 'VoidRunner_9', rating: 4, title: 'Great but pricey', comment: 'Sound quality is unmatched but the price is steep. Worth it if you need professional grade.', date: '2026-03-10', helpful: 23, verified: true },
        { id: 'r3', userId: 'u3', userName: 'CyberSynth_X', rating: 5, title: 'Mind-blowing experience', comment: 'The haptic feedback during bass drops is incredible. Highly recommend!', date: '2026-03-05', helpful: 67, verified: true },
    ],
    'NBL-002': [
        { id: 'r4', userId: 'u4', userName: 'NeonFashionista', rating: 4, title: 'Comfortable and stylish', comment: 'Perfect for long work sessions. The graphite weave is surprisingly breathable.', date: '2026-03-12', helpful: 31, verified: true },
    ],
    'NBL-003': [
        { id: 'r5', userId: 'u5', userName: 'OpticsMaster', rating: 5, title: 'Revolutionary tech', comment: 'The retinal projection is crystal clear. Game changer for presentations.', date: '2026-03-18', helpful: 89, verified: true },
    ],
};

interface AppState {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number, variants?: Record<string, string>) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    isMenuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
    wishlist: string[];
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    recentlyViewed: string[];
    addToRecentlyViewed: (productId: string) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    minRating: number;
    setMinRating: (rating: number) => void;
    inStockOnly: boolean;
    setInStockOnly: (value: boolean) => void;
    addresses: Address[];
    addAddress: (address: Omit<Address, 'id'>) => void;
    removeAddress: (id: string) => void;
    updateAddress: (id: string, address: Partial<Address>) => void;
    defaultAddress: string;
    setDefaultAddress: (id: string) => void;
    user: {
        name: string;
        email: string;
        phone: string;
        profilePicture: string;
        company?: string;
    };
    updateUser: (user: Partial<AppState['user']>) => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            searchQuery: '',
            setSearchQuery: (query) => set({ searchQuery: query }),
            
            cart: [],
            addToCart: (product, quantity = 1, variants) => set((state) => {
                const existing = state.cart.find(item => item.id === product.id);
                if (existing) {
                    return {
                        cart: state.cart.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                    };
                }
                return { cart: [...state.cart, { ...product, quantity, selectedVariants: variants }] };
            }),
            removeFromCart: (productId) => set((state) => ({
                cart: state.cart.filter(item => item.id !== productId)
            })),
            updateQuantity: (productId, quantity) => set((state) => ({
                cart: state.cart.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            })),
            clearCart: () => set({ cart: [] }),
            
            activeCategory: 'ALL',
            setActiveCategory: (category) => set({ activeCategory: category, isMenuOpen: false }),
            
            isMenuOpen: false,
            setMenuOpen: (open) => set({ isMenuOpen: open }),
            
            wishlist: [],
            addToWishlist: (productId) => set((state) => ({
                wishlist: state.wishlist.includes(productId)
                    ? state.wishlist
                    : [...state.wishlist, productId]
            })),
            removeFromWishlist: (productId) => set((state) => ({
                wishlist: state.wishlist.filter(id => id !== productId)
            })),

            recentlyViewed: [],
            addToRecentlyViewed: (productId) => set((state) => {
                const filtered = state.recentlyViewed.filter(id => id !== productId);
                return { recentlyViewed: [productId, ...filtered].slice(0, 10) };
            }),

            priceRange: [0, 5000],
            setPriceRange: (range) => set({ priceRange: range }),
            
            minRating: 0,
            setMinRating: (rating) => set({ minRating: rating }),
            
            inStockOnly: false,
            setInStockOnly: (value) => set({ inStockOnly: value }),

            addresses: [
                { id: 'addr-1', name: 'Nexus Prime', phone: '+91 98765 43210', address: 'Sector 9, Block Alpha, Tower 42', city: 'Neo Mumbai', state: 'Maharashtra', zip: '400001', isDefault: true },
                { id: 'addr-2', name: 'Work Station', phone: '+91 98765 43211', address: 'Tech Park, Floor 15', city: 'Bangalore', state: 'Karnataka', zip: '560001', isDefault: false },
            ],
            addAddress: (address) => set((state) => ({
                addresses: [...state.addresses, { ...address, id: `addr-${Date.now()}` }]
            })),
            removeAddress: (id) => set((state) => ({
                addresses: state.addresses.filter(a => a.id !== id)
            })),
            updateAddress: (id, updates) => set((state) => ({
                addresses: state.addresses.map(a => a.id === id ? { ...a, ...updates } : a)
            })),
            defaultAddress: 'addr-1',
            setDefaultAddress: (id: string) => set({ defaultAddress: id }),

            user: {
                name: 'NEBULA_CURATOR_01',
                email: 'nexus@nebula.void',
                phone: '+91 98765 43210',
                profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1587&auto=format&fit=crop',
                company: 'Global Architecture Corp'
            },
            updateUser: (updates) => set((state) => ({
                user: { ...state.user, ...updates }
            })),
        }),
        {
            name: 'nebula-storage',
            partialize: (state) => ({
                cart: state.cart,
                wishlist: state.wishlist,
                recentlyViewed: state.recentlyViewed,
                addresses: state.addresses,
                defaultAddress: state.defaultAddress,
                user: state.user,
            }),
        }
    )
);
