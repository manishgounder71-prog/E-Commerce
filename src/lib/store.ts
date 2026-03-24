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
    { id: 'NBL-001', title: 'SONIC VOID X1', price: 1290.00, originalPrice: 1590.00, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', category: 'HARDWARE', description: 'High-performance audio module with neural sync capability.', rating: 4.5, reviewCount: 128, inStock: true, stockCount: 15, brand: 'NEBULA Audio', seller: 'Nebula Direct', variants: [{ type: 'Color', options: ['Black', 'Silver', 'Gold'], selected: 'Black' }, { type: 'Storage', options: ['64GB', '128GB', '256GB'] }] },
    { id: 'NBL-002', title: 'GRAPHITE ARMOR', price: 850.00, originalPrice: 1200.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', category: 'APPAREL', description: 'Structural textile integration for urban environments.', rating: 4.2, reviewCount: 89, inStock: true, stockCount: 28, brand: 'NEBULA Wear', seller: 'Nebula Direct', variants: [{ type: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] }, { type: 'Color', options: ['Black', 'Gray', 'White'] }] },
    { id: 'NBL-003', title: 'NEURAL LINK PRO', price: 2400.00, originalPrice: 2999.00, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800', category: 'OPTICS', description: 'Advanced optics system with retinal projection.', rating: 4.8, reviewCount: 256, inStock: true, stockCount: 5, brand: 'NEBULA Tech', seller: 'Nebula Direct', variants: [{ type: 'Model', options: ['Standard', 'Pro', 'Elite'] }] },
    { id: 'NBL-004', title: 'KINETIC MODULE', price: 450.00, image: 'https://images.unsplash.com/photo-1526170315873-3a5616af8353?auto=format&fit=crop&q=80&w=800', category: 'HARDWARE', description: 'Portable kinetic energy converter.', rating: 4.0, reviewCount: 67, inStock: true, stockCount: 42, brand: 'NEBULA Power', seller: 'Nebula Direct' },
    { id: 'NBL-005', title: 'VOID RUNNERS', price: 320.00, originalPrice: 450.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', category: 'APPAREL', description: 'Urban traversal footwear with graphite sole.', rating: 4.6, reviewCount: 312, inStock: true, stockCount: 100, brand: 'NEBULA Footwear', seller: 'Nebula Direct', variants: [{ type: 'Size', options: ['7', '8', '9', '10', '11'] }, { type: 'Color', options: ['Black', 'White', 'Red'] }] },
    { id: 'NBL-006', title: 'OBSIDIAN LENS', price: 980.00, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800', category: 'OPTICS', description: 'Vision enhancement system for low-light conditions.', rating: 4.3, reviewCount: 94, inStock: false, stockCount: 0, brand: 'NEBULA Optics', seller: 'Nebula Direct', variants: [{ type: 'Lens Type', options: ['Standard', 'Polarized', 'Night Vision'] }] },
    { id: 'NBL-007', title: 'CYBER WRIST UNIT', price: 2100.00, originalPrice: 2500.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', category: 'HARDWARE', description: 'Biometric monitoring with holographic display.', rating: 4.7, reviewCount: 178, inStock: true, stockCount: 22, brand: 'NEBULA Wearables', seller: 'Nebula Direct', variants: [{ type: 'Size', options: ['S', 'M', 'L'] }, { type: 'Band', options: ['Silicone', 'Metal', 'Carbon'] }] },
    { id: 'NBL-008', title: 'QUANTUM BACKPACK', price: 680.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800', category: 'APPAREL', description: 'Anti-gravity storage with neural inventory sync.', rating: 4.4, reviewCount: 203, inStock: true, stockCount: 67, brand: 'NEBULA Travel', seller: 'Nebula Direct' },
];

export const MOCK_DEALS = [
    { id: 'deal-1', title: 'FLASH SALE', discount: 40, endTime: Date.now() + 3600000 * 5, products: ['NBL-001', 'NBL-002', 'NBL-005'] },
    { id: 'deal-2', title: 'BUY 2 GET 1', discount: 30, endTime: Date.now() + 86400000 * 2, products: ['NBL-003', 'NBL-007'] },
    { id: 'deal-3', title: 'EXTRA 15% OFF', discount: 15, endTime: Date.now() + 86400000, products: ['NBL-004', 'NBL-006', 'NBL-008'] },
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
            setDefaultAddress: (id) => set({ defaultAddress: id }),
        }),
        {
            name: 'nebula-storage',
            partialize: (state) => ({
                cart: state.cart,
                wishlist: state.wishlist,
                recentlyViewed: state.recentlyViewed,
                addresses: state.addresses,
                defaultAddress: state.defaultAddress,
            }),
        }
    )
);
