import React from 'react';
import { Card, Input, Button, Textarea } from '../../components/ui';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
            Our team is here to help.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card padding="md">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white">Email Us</h3>
                  <p className="text-secondary-500 mt-1">support@shophub.com</p>
                  <p className="text-secondary-500">sales@shophub.com</p>
                </div>
              </div>
            </Card>

            <Card padding="md">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white">Call Us</h3>
                  <p className="text-secondary-500 mt-1">1-800-SHOPHUB</p>
                  <p className="text-secondary-500">+1 (212) 555-1234</p>
                </div>
              </div>
            </Card>

            <Card padding="md">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white">Visit Us</h3>
                  <p className="text-secondary-500 mt-1">123 Commerce Street</p>
                  <p className="text-secondary-500">New York, NY 10001</p>
                  <p className="text-secondary-500">United States</p>
                </div>
              </div>
            </Card>

            <Card padding="md">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white">Business Hours</h3>
                  <p className="text-secondary-500 mt-1">Mon - Fri: 9AM - 6PM (EST)</p>
                  <p className="text-secondary-500">Sat: 10AM - 4PM</p>
                  <p className="text-secondary-500">Sun: Closed</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 mt-8 lg:mt-0">
            <Card padding="lg">
              <div className="flex items-center gap-3 mb-8">
                <MessageCircle className="h-6 w-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">Send us a message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    placeholder="John"
                    required
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    required
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  required
                />

                <Input
                  label="Subject"
                  placeholder="How can we help?"
                  required
                />

                <Textarea
                  label="Message"
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  required
                />

                <Button type="submit" variant="primary" size="lg">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12">
          <div className="h-96 rounded-2xl bg-secondary-200 dark:bg-secondary-800 flex items-center justify-center">
            <p className="text-secondary-500">Map placeholder - Google Maps integration</p>
          </div>
        </div>
      </div>
    </div>
  );
};
