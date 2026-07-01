import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatPrice } from '../lib/utils';
import { useCartStore, useAuthStore } from '../store';
import { Button, Input, Select, Card } from '../components/ui';
import { Lock, CreditCard, Landmark, Wallet, ChevronLeft, CircleCheck as CheckCircle } from 'lucide-react';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  street: z.string().min(5, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(5, 'Valid postal code required'),
  country: z.string(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const paymentMethods = [
  { id: 'stripe', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'khalti', name: 'Khalti', icon: Wallet },
  { id: 'esewa', name: 'eSewa', icon: Wallet },
  { id: 'cod', name: 'Cash on Delivery', icon: Landmark },
];

const countries = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Nepal', label: 'Nepal' },
];

export const CheckoutPage: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const navigate = useNavigate();
  const { items, getSubtotal, getDiscount, getTax, getShipping, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: user?.email || '',
      firstName: '',
      lastName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
    },
  });

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const tax = getTax();
  const shipping = getShipping();
  const total = getTotal();

  const onSubmit = async (_data: CheckoutFormData) => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const generatedOrderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setOrderNumber(generatedOrderNumber);
    setOrderComplete(true);

    // Clear cart after successful order
    clearCart();
    setIsProcessing(false);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center">
        <Card className="text-center py-16 px-6">
          <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">Your cart is empty</h2>
          <p className="mt-2 text-secondary-500">Add some items to checkout</p>
          <Button variant="primary" className="mt-6" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center py-12">
        <Card className="max-w-lg w-full text-center px-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-secondary-900 dark:text-white">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-secondary-500">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <div className="mt-6 rounded-lg bg-secondary-50 dark:bg-secondary-800 p-4">
            <p className="text-sm text-secondary-500">Order Number</p>
            <p className="text-lg font-semibold text-secondary-900 dark:text-white">{orderNumber}</p>
          </div>
          <p className="mt-4 text-sm text-secondary-500">
            A confirmation email has been sent to your email address.
          </p>
          <Button variant="primary" className="mt-6 w-full" asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200 dark:bg-secondary-900 dark:border-secondary-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <h1 className="mt-4 text-2xl font-bold text-secondary-900 dark:text-white">Checkout</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <Card padding="md">
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="John"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                </div>
              </Card>

              {/* Shipping Address */}
              <Card padding="md">
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    placeholder="123 Main Street"
                    error={errors.street?.message}
                    {...register('street')}
                  />
                  <Input
                    label="Apartment, suite, etc. (optional)"
                    placeholder="Apt 4B"
                    {...register('apartment')}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      placeholder="New York"
                      error={errors.city?.message}
                      {...register('city')}
                    />
                    <Input
                      label="State"
                      placeholder="NY"
                      error={errors.state?.message}
                      {...register('state')}
                    />
                    <Input
                      label="Postal Code"
                      placeholder="10001"
                      error={errors.postalCode?.message}
                      {...register('postalCode')}
                    />
                  </div>
                  <Select
                    label="Country"
                    options={countries}
                    error={errors.country?.message}
                    {...register('country')}
                  />
                </div>
              </Card>

              {/* Payment Method */}
              <Card padding="md">
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full flex items-center gap-4 rounded-lg border-2 p-4 transition-colors ${
                        selectedPayment === method.id
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-secondary-200 hover:border-secondary-300 dark:border-secondary-700'
                      }`}
                    >
                      <method.icon className={`h-6 w-6 ${
                        selectedPayment === method.id ? 'text-primary-600' : 'text-secondary-400'
                      }`} />
                      <span className={`font-medium ${
                        selectedPayment === method.id ? 'text-primary-600' : 'text-secondary-700 dark:text-secondary-300'
                      }`}>
                        {method.name}
                      </span>
                      {selectedPayment === method.id && (
                        <CheckCircle className="ml-auto h-5 w-5 text-primary-600" />
                      )}
                    </button>
                  ))}
                </div>

                {selectedPayment === 'stripe' && (
                  <div className="mt-6 space-y-4">
                    <Input
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      leftIcon={<CreditCard className="h-5 w-5" />}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        placeholder="MM/YY"
                      />
                      <Input
                        label="CVV"
                        placeholder="123"
                      />
                    </div>
                    <Input
                      label="Cardholder Name"
                      placeholder="John Doe"
                    />
                  </div>
                )}
              </Card>

              {/* Place Order Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isProcessing}
                leftIcon={<Lock className="h-5 w-5" />}
              >
                {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <Card padding="md" className="sticky top-24">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.product.images?.[0]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop'}
                      alt={item.product.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-secondary-900 dark:text-white line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-secondary-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-secondary-900 dark:text-white">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-secondary-200 dark:border-secondary-700 mt-6 pt-6 space-y-3">
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
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-secondary-200 dark:border-secondary-700 pt-3 flex justify-between">
                  <span className="text-lg font-bold text-secondary-900 dark:text-white">Total</span>
                  <span className="text-lg font-bold text-secondary-900 dark:text-white">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Security Note */}
              <div className="mt-6 flex items-center gap-2 text-sm text-secondary-500">
                <Lock className="h-4 w-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
