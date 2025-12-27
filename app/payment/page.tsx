"use client";
import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

const PricingCard = ({ plan, isPopular, onSubscribe, loading, isFree }) => {
  return (
    <div className={`relative rounded-2xl p-8 ${
      isPopular 
        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105' 
        : 'bg-white border-2 border-gray-200'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${!isPopular && 'text-gray-900'}`}>
          {plan.name}
        </h3>
        <p className={`text-sm ${isPopular ? 'text-blue-100' : 'text-gray-600'}`}>
          {plan.description}
        </p>
      </div>

      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center">
          {isFree ? (
            <span className={`text-5xl font-bold ${!isPopular && 'text-gray-900'}`}>
              Free
            </span>
          ) : (
            <>
              <span className={`text-5xl font-bold ${!isPopular && 'text-gray-900'}`}>
                ₦{plan.price.toLocaleString()}
              </span>
              <span className={`ml-2 ${isPopular ? 'text-blue-100' : 'text-gray-600'}`}>
                /{plan.period}
              </span>
            </>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${
              isPopular ? 'text-blue-200' : 'text-green-500'
            }`} />
            <span className={`text-sm ${!isPopular && 'text-gray-700'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSubscribe(plan)}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
          isPopular
            ? 'bg-white text-blue-600 hover:bg-gray-100'
            : isFree 
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-blue-600 text-white hover:bg-blue-700'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          isFree ? 'Get Started Free' : 'Upgrade Now'
        )}
      </button>
    </div>
  );
};

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      price: 0,
      period: 'forever',
      features: [
        'Basic Features',
        'Limited Storage',
        'Community Support',
        'Standard Updates'
      ],
      isFree: true
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Unlock all features',
      price: 2500,
      period: 'month',
      features: [
        'All Premium Features',
        'Unlimited Storage',
        'Priority Support',
        'Advanced Analytics',
        'Custom Integrations',
        'Early Access to New Features',
        'No Ads'
      ],
      isPopular: true
    }
  ];

  const handleSubscribe = async (plan: any) => {
    // If free plan, redirect to signup or dashboard
    if (plan.isFree) {
      window.location.href = '/dashboard'; // or '/signup' if not logged in
      return;
    }

    setLoading(true);
    setSelectedPlan(plan.id);

    try {
      // Call your backend Flutterwave endpoint
      const response = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({
          planId: plan.id,
          amount: plan.price,
          planName: plan.name
        })
      });

      const data = await response.json();

      if (data.success && data.paymentLink) {
        // Redirect to Flutterwave payment page
        window.location.href = data.paymentLink;
      } else {
        alert('Payment initialization failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free or upgrade to Premium for just ₦2,500/month
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isPopular={plan.isPopular}
              onSubscribe={handleSubscribe}
              loading={loading && selectedPlan === plan.id}
              isFree={plan.isFree}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-gray-600">
            All plans include a 14-day money-back guarantee
          </p>
          <p className="text-gray-600">
            Need help choosing? {' '}
            <a href="/contact" className="text-blue-600 hover:underline font-semibold">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}