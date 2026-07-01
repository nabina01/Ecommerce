import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { formatPrice } from '../../lib/utils';
import { useCartStore, useUIStore } from '../../store';
import { Button } from '../ui/Button';
import { QuantityPicker } from '../ui/QuantityPicker';
import { X, Trash2, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getDiscount,
    getTotal,
  } = useCartStore();

  React.useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeCartDrawer}
      />

      {/* Drawer */}
      <div
        className={cn(
          'absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl',
          'flex flex-col transition-transform animate-slide-left',
          'dark:bg-secondary-900'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-secondary-200 px-6 py-4 dark:border-secondary-700">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
            Shopping Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})
          </h2>
          <button
            onClick={closeCartDrawer}
            className="rounded-lg p-2 text-secondary-500 hover:bg-secondary-100 dark:hover:bg-secondary-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6">
            <ShoppingBag className="h-16 w-16 text-secondary-300 dark:text-secondary-600" />
            <p className="mt-4 text-lg font-medium text-secondary-900 dark:text-white">
              Your cart is empty
            </p>
            <p className="mt-2 text-center text-secondary-500">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button
              variant="primary"
              className="mt-6"
              onClick={closeCartDrawer}
              asChild
            >
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => {
                  const mainImage =
                    item.product.images?.[0]?.url ||
                    item.variant?.image ||
                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop';

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-xl bg-secondary-50 p-3 dark:bg-secondary-800/50"
                    >
                      {/* Image */}
                      <Link
                        to={`/product/${item.product.slug}`}
                        onClick={closeCartDrawer}
                        className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg"
                      >
                        <img
                          src={mainImage}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <Link
                            to={`/product/${item.product.slug}`}
                            onClick={closeCartDrawer}
                            className="text-sm font-medium text-secondary-900 hover:text-primary-600 line-clamp-2 dark:text-white"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="rounded-lg p-1 text-secondary-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        {item.variant && (
                          <p className="mt-1 text-xs text-secondary-500">
                            {item.variant.color && `Color: ${item.variant.color}`}
                            {item.variant.color && item.variant.size && ' | '}
                            {item.variant.size && `Size: ${item.variant.size}`}
                          </p>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <QuantityPicker
                            value={item.quantity}
                            min={1}
                            max={item.variant?.stock || item.product.stock}
                            onChange={(value) => updateQuantity(item.id, value)}
                            size="sm"
                          />
                          <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-secondary-200 px-6 py-6 dark:border-secondary-700">
              {/* Subtotal */}
              <div className="flex justify-between text-sm">
                <span className="text-secondary-500">Subtotal</span>
                <span className="font-medium text-secondary-900 dark:text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>
              {discount > 0 && (
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-secondary-500">Discount</span>
                  <span className="font-medium text-green-600">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-secondary-500">Shipping</span>
                <span className="font-medium text-secondary-900 dark:text-white">
                  {subtotal >= 100 ? 'Free' : formatPrice(10)}
                </span>
              </div>
              <div className="mt-3 flex justify-between border-t border-secondary-200 pt-3 dark:border-secondary-700">
                <span className="font-semibold text-secondary-900 dark:text-white">
                  Total
                </span>
                <span className="text-lg font-bold text-secondary-900 dark:text-white">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    clearCart();
                  }}
                >
                  Clear Cart
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={closeCartDrawer}
                  asChild
                >
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </div>
              <Button variant="secondary" className="mt-2 w-full" onClick={closeCartDrawer} asChild>
                <Link to="/cart">View Cart</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
