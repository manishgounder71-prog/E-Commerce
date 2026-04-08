-- NEBULA PRODUCTION SECURITY MIGRATION
-- Enables RLS and defines policies for a secure production environment.

-- 1. ENABLE RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 2. PRODUCTS POLICIES (Public Read-Only)
CREATE POLICY "Public Read Access for Products"
ON products FOR SELECT
USING (true);

-- 3. ORDERS POLICIES (Authenticated Users Only)
-- Users can only view their own orders
CREATE POLICY "Users can view their own orders"
ON orders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can only create their own orders (usually handled by service role via webhook, but policy added for completeness)
CREATE POLICY "Users can create their own orders"
ON orders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 4. ORDER_ITEMS POLICIES (Access via Order ownership)
CREATE POLICY "Users can view their own order items"
ON order_items FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);
