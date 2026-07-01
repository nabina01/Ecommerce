import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RefreshCw,
} from 'lucide-react';

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 001-3.14 1.53 4.48 4.48 000-7.39 10.35 10.35 000-4.56 4.48 4.48 010 6.34A10.93 10.93 00023 3z"/>
  </svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0012.63 8 4 4 008 12.63 4 4 0011.37 16 4 4 0016 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 000-1.94 2.84 2.84 000-1.94C20.74 1 19.27 1 16 1H8C4.73 1 3.26 1.26 1.46 2.54a2.78 2.78 000 1.94 2.84 2.84 000 1.94C.26 7.58.1 9.07.1 12s.16 4.42 1.36 5.58a2.78 2.78 011.94 0 2.84 2.84 011.94 0C4.74 23 6.21 23 9.48 23h7.48c3.27 0 4.74-.26 6.54-1.54a2.78 2.78 001.94 0 2.84 2.84 001.94 0c.8-1.24 1-2.73 1-5.46s-.2-4.22-1.4-5.38zM10 15V9l5.27 3z"/>
  </svg>
);

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Multiple options available',
  },
];

const links = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'New Arrivals', href: '/shop?filter=new' },
    { name: 'Best Sellers', href: '/shop?filter=bestseller' },
    { name: 'Sale', href: '/shop?filter=sale' },
    { name: 'Categories', href: '/categories' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 pt-16 text-secondary-300">
      {/* Features Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-2 rounded-xl bg-secondary-800/50 p-4 text-center sm:p-6"
            >
              <feature.icon className="h-8 w-8 text-primary-400" />
              <h3 className="font-semibold text-white">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent"
            >
              ShopHub
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Your trusted online shopping destination. We offer a wide selection of quality products at competitive prices with excellent customer service.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary-400" />
                <span>support@shophub.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary-400" />
                <span>1-800-SHOPHUB</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5" />
                <span>123 Commerce Street<br />New York, NY 10001</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="rounded-lg bg-secondary-800 p-2 text-secondary-400 hover:bg-primary-600 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              {links.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {links.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 rounded-2xl bg-secondary-800/50 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-white">
                Subscribe to Our Newsletter
              </h3>
              <p className="mt-1 text-sm">
                Get the latest updates on new products and upcoming sales.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-secondary-700 bg-secondary-800 px-4 py-3 text-white placeholder:text-secondary-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm">
              © {new Date().getFullYear()} ShopHub. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/128/196/196578.png"
                alt="Visa"
                className="h-8 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/196/196561.png"
                alt="Mastercard"
                className="h-8 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/174/174861.png"
                alt="PayPal"
                className="h-8 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/5968/5968144.png"
                alt="Apple Pay"
                className="h-8 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
