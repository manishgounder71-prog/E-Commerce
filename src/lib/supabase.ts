import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
    id: string;
    email: string;
    name?: string;
    created_at: string;
};

export type Product = {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    stock: number;
    created_at: string;
};

export type Order = {
    id: string;
    user_id: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    shipping_address: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    created_at: string;
};

export type OrderItem = {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
};

export async function getProducts(category?: string): Promise<Product[]> {
    let query = supabase.from('products').select('*');
    
    if (category && category !== 'ALL') {
        query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    
    return data || [];
}

export async function getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }
    
    return data;
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at'>, items: Omit<OrderItem, 'id' | 'order_id'>[]): Promise<Order | null> {
    const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert(order)
        .select()
        .single();
    
    if (orderError) {
        console.error('Error creating order:', orderError);
        return null;
    }
    
    const itemsWithOrderId = items.map(item => ({
        ...item,
        order_id: orderData.id
    }));
    
    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsWithOrderId);
    
    if (itemsError) {
        console.error('Error creating order items:', itemsError);
    }
    
    return orderData;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
    
    return data || [];
}
