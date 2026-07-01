import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, CartItem, Product, ProductVariant, Address, Coupon } from '../types';
import { generateOrderNumber } from '../lib/utils';

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAccessToken: (token) => set({ accessToken: token }),
      logout: () => set({ user: null, isAuthenticated: false, accessToken: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);

// Cart Store
interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  shippingAddress: Address | null;
  paymentMethod: 'stripe' | 'khalti' | 'esewa' | 'cod';
  addItem: (product: Product, variant: ProductVariant | undefined, quantity: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  setShippingAddress: (address: Address) => void;
  setPaymentMethod: (method: 'stripe' | 'khalti' | 'esewa' | 'cod') => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTax: () => number;
  getShipping: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      shippingAddress: null,
      paymentMethod: 'stripe',
      addItem: (product, variant, quantity) => {
        const { items } = get();
        const price = variant?.price || product.price;
        const itemId = variant ? `${product.id}-${variant.id}` : product.id;
        const existingIndex = items.findIndex((item) => item.id === itemId);
        if (existingIndex > -1) {
          const newItems = [...items];
          newItems[existingIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            product,
            variantId: variant?.id,
            variant,
            quantity,
            price,
          };
          set({ items: [...items, newItem] });
        }
      },
      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          set({ items: items.filter((item) => item.id !== itemId) });
        } else {
          set({
            items: items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          });
        }
      },
      removeItem: (itemId) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== itemId) });
      },
      clearCart: () => set({ items: [], coupon: null }),
      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),
      setShippingAddress: (address) => set({ shippingAddress: address }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      getSubtotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      getDiscount: () => {
        const { coupon } = get();
        const subtotal = get().getSubtotal();
        if (!coupon) return 0;
        if (coupon.type === 'percentage') {
          const discount = (subtotal * coupon.value) / 100;
          return Math.min(discount, coupon.maxDiscount || Infinity);
        }
        return Math.min(coupon.value, subtotal);
      },
      getTax: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return (subtotal - discount) * 0.1;
      },
      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 100 ? 0 : 10;
      },
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const tax = get().getTax();
        const shipping = get().getShipping();
        return subtotal - discount + tax + shipping;
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
        paymentMethod: state.paymentMethod,
      }),
    }
  )
);

// Wishlist Store
interface WishlistState {
  items: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (productId) => {
        const { items } = get();
        if (!items.includes(productId)) {
          set({ items: [...items, productId] });
        }
      },
      removeFromWishlist: (productId) => {
        const { items } = get();
        set({ items: items.filter((id) => id !== productId) });
      },
      isInWishlist: (productId) => {
        const { items } = get();
        return items.includes(productId);
      },
    }),
    { name: 'wishlist-storage' }
  )
);

// UI Store
interface UIState {
  isMobileMenuOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      isCartDrawerOpen: false,
      isSearchOpen: false,
      theme: 'system',
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      toggleCartDrawer: () =>
        set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
      closeCartDrawer: () => set({ isCartDrawerOpen: false }),
      toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
      closeSearch: () => set({ isSearchOpen: false }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

// Notification Store
interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationState {
  notifications: NotificationItem[];
  addNotification: (notification: Omit<NotificationItem, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) => {
    const id = `notification-${Date.now()}`;
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }],
    }));
    const duration = notification.duration || 5000;
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, duration);
  },
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));

// Order Store (for checkout process)
interface OrderState {
  currentOrder: {
    orderNumber: string;
    items: CartItem[];
    shippingAddress: Address | null;
    paymentMethod: 'stripe' | 'khalti' | 'esewa' | 'cod';
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    total: number;
  } | null;
  createOrder: (cart: CartState) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  currentOrder: null,
  createOrder: (cart) => {
    const orderNumber = generateOrderNumber();
    set({
      currentOrder: {
        orderNumber,
        items: cart.items,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        subtotal: cart.getSubtotal(),
        discount: cart.getDiscount(),
        tax: cart.getTax(),
        shipping: cart.getShipping(),
        total: cart.getTotal(),
      },
    });
  },
  clearOrder: () => set({ currentOrder: null }),
}));
