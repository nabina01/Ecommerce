-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;

-- Categories: Public read, admin write
CREATE POLICY "categories_select" ON categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "categories_insert" ON categories FOR INSERT TO authenticated WITH CHECK (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "categories_update" ON categories FOR UPDATE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "categories_delete" ON categories FOR DELETE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- Brands: Public read, admin write
CREATE POLICY "brands_select" ON brands FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "brands_insert" ON brands FOR INSERT TO authenticated WITH CHECK (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "brands_update" ON brands FOR UPDATE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "brands_delete" ON brands FOR DELETE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- Products: Public read active, admin write
CREATE POLICY "products_select" ON products FOR SELECT TO anon, authenticated USING (is_active = true OR auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "products_insert" ON products FOR INSERT TO authenticated WITH CHECK (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "products_update" ON products FOR UPDATE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "products_delete" ON products FOR DELETE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- Product images: Public read
CREATE POLICY "product_images_select" ON product_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "product_images_insert" ON product_images FOR INSERT TO authenticated WITH CHECK (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "product_images_update" ON product_images FOR UPDATE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "product_images_delete" ON product_images FOR DELETE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- Product variants: Public read
CREATE POLICY "product_variants_select" ON product_variants FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "product_variants_insert" ON product_variants FOR INSERT TO authenticated WITH CHECK (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "product_variants_update" ON product_variants FOR UPDATE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "product_variants_delete" ON product_variants FOR DELETE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- Profiles: Users can read/write own profile
CREATE POLICY "profiles_select" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Addresses: Users manage own addresses
CREATE POLICY "addresses_select" ON addresses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "addresses_insert" ON addresses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "addresses_update" ON addresses FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "addresses_delete" ON addresses FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Wishlists: Users manage own wishlist
CREATE POLICY "wishlists_select" ON wishlists FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "wishlists_insert" ON wishlists FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wishlists_delete" ON wishlists FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Coupons: Public read active, admin full access
CREATE POLICY "coupons_select" ON coupons FOR SELECT TO anon, authenticated USING (is_active = true OR auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "coupons_insert" ON coupons FOR INSERT TO authenticated WITH CHECK (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "coupons_update" ON coupons FOR UPDATE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "coupons_delete" ON coupons FOR DELETE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- Orders: Users read own orders, admin all
CREATE POLICY "orders_select" ON orders FOR SELECT TO authenticated USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "orders_insert" ON orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "orders_update" ON orders FOR UPDATE TO authenticated USING (auth.jwt() ->> 'role' = 'admin' OR auth.uid() = user_id);

-- Order items: Users read own order items
CREATE POLICY "order_items_select" ON order_items FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin'))
);
CREATE POLICY "order_items_insert" ON order_items FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Order addresses: Users read own
CREATE POLICY "order_addresses_select" ON order_addresses FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_addresses.order_id AND (orders.user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin'))
);

-- Reviews: Public read, users write own
CREATE POLICY "reviews_select" ON reviews FOR SELECT TO anon, authenticated USING (is_active = true OR auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "reviews_insert" ON reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_update" ON reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "reviews_delete" ON reviews FOR DELETE TO authenticated USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

-- Banners: Public read active, admin write
CREATE POLICY "banners_select" ON banners FOR SELECT TO anon, authenticated USING (is_active = true OR auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "banners_insert" ON banners FOR INSERT TO authenticated WITH CHECK (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "banners_update" ON banners FOR UPDATE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "banners_delete" ON banners FOR DELETE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- Notifications: Users read own
CREATE POLICY "notifications_select" ON notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notifications_update" ON notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notifications_delete" ON notifications FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- CMS pages: Public read published
CREATE POLICY "cms_pages_select" ON cms_pages FOR SELECT TO anon, authenticated USING (is_published = true OR auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "cms_pages_insert" ON cms_pages FOR INSERT TO authenticated WITH CHECK (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "cms_pages_update" ON cms_pages FOR UPDATE TO authenticated USING (auth.jwt() ->> 'role' = 'admin');