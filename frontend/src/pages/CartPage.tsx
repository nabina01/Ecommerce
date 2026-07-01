import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../lib/utils';
import { useCartStore } from '../store';
import { Button, QuantityPicker, Card, Input } from '../components/ui';
import { Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getDiscount,
    getTax,
    getShipping,
    getTotal,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [promoCode, setPromoCode] = React.useState('');

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const tax = getTax();
  const shipping = getShipping();
  const total = getTotal();

  const handleApplyPromo = () => {
    // In real app, validate coupon with backend
    if (promoCode.toLowerCase() === 'save10') {
      applyCoupon({
        id: 'demo',
        code: 'SAVE10',
        type: 'percentage',
        value: 10,
        minOrderValue: 50,
        usageLimit: 100,
        usedCount: 0,
        isActive: true,
        startsAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
      setPromoCode('');
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200 dark:bg-secondary-900 dark:border-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
            Shopping Cart
          </h1>
          <p className="mt-2 text-secondary-500">
            {items.length === 0 ? 'Your cart is empty' : `${items.length} item${items.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <Card className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-secondary-300" />
            <h2 className="mt-6 text-xl font-semibold text-secondary-900 dark:text-white">
              Your cart is empty
            </h2>
            <p className="mt-2 text-secondary-500">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button variant="primary" className="mt-6" asChild>
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </Card>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {items.map((item) => {
                  const mainImage =
                    item.product.images?.[0]?.url ||
                    item.variant?.image ||
                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop';

                  return (
                    <Card key={item.id} padding="md">
                      <div className="flex gap-6">
                        {/* Image */}
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg "
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
                            <div>
                              <Link
                                to={`/product/${item.product.slug}`}
                                className="text-lg font-semibold text-secondary-900 hover:text-primary-600 dark:text-white"
                              >
                                {item.product.name}
                              </Link>
                              {item.variant && (
                                <p className="mt-1 text-sm text-secondary-500">
                                  Color: {item.variant.color} {item.variant.size && `| Size: ${item.variant.size}`}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-secondary-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="mt-4 flex items-end justify-between">
                            <QuantityPicker
                              value={item.quantity}
                              min={1}
                              max={item.variant?.stock || item.product.stock}
                              onChange={(value) => updateQuantity(item.id, value)}
                            />
                            <p className="text-lg font-bold text-secondary-900 dark:text-white">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <Button variant="outline" className="mt-6" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <Card padding="md" className="sticky top-24">
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>

                  <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                    <span>Estimated Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>

                  <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-secondary-900 dark:text-white">Total</span>
                      <span className="text-lg font-bold text-secondary-900 dark:text-white">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-6">
                  {coupon ? (
                    <div className="flex items-center justify-between rounded-lg bg-green-50 px-4 py-3 dark:bg-green-900/20">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">
                          {coupon.code} applied!
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        leftIcon={<Tag className="h-5 w-5" />}
                      />
                      <Button variant="outline" onClick={handleApplyPromo}>
                        Apply
                      </Button>
                    </div>
                  )}
                </div>

                {/* Checkout Button */}
                <Button variant="primary" size="lg" className="mt-6 w-full" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <p className="mt-4 text-center text-xs text-secondary-500">
                  Taxes calculated at checkout
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
