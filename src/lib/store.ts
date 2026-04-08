import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    id: string;
    title: string;
    price: number;
    original_price?: number;
    image: string;
    category: string;
    description?: string;
    rating?: number;
    review_count?: number;
    stock: number;
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



export interface AppState {
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
        id?: string;
        name: string;
        email: string;
        phone: string;
        profilePicture: string;
        company?: string;
    } | null;
    updateUser: (user: Partial<NonNullable<AppState['user']>> | null) => void;
    products: Product[];
    setProducts: (products: Product[]) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
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

            user: null,
            updateUser: (updates) => set((state) => ({
                user: updates === null ? null : (state.user ? { ...state.user, ...(updates as Partial<NonNullable<AppState['user']>>) } : updates as NonNullable<AppState['user']>)
            })),
            products: [],
            setProducts: (products) => set({ products }),
            isLoading: false,
            setIsLoading: (isLoading) => set({ isLoading }),
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
