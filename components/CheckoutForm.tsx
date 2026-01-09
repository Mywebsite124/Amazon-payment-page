
import React from 'react';
import { PaymentFormData } from '../types';

interface CheckoutFormProps {
  formData: PaymentFormData;
  errors: Partial<Record<keyof PaymentFormData, string>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ formData, errors, onChange, onSubmit, isProcessing }) => {
  const inputClass = (fieldName: keyof PaymentFormData) => 
    `w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-1 shadow-sm transition-all ${
      errors[fieldName] 
        ? 'border-red-600 focus:ring-red-500 bg-red-50' 
        : 'border-gray-300 focus:ring-[#007185] focus:border-[#007185]'
    }`;

  return (
    <form id="payment-form" onSubmit={onSubmit} className="space-y-8">
      {/* Card Details Section */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-gray-800 border-b border-gray-50 pb-2">Card details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-4" data-error={!!errors.cardNumber}>
            <label className="block text-sm font-bold text-gray-700 mb-1">Card number</label>
            <div className="relative">
               <input 
                type="text" 
                name="cardNumber" 
                value={formData.cardNumber}
                onChange={onChange}
                placeholder="0000 0000 0000 0000"
                className={inputClass('cardNumber')}
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            {errors.cardNumber && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.cardNumber}</p>}
          </div>
          
          <div className="md:col-span-1" data-error={!!errors.expMonth}>
            <label className="block text-sm font-bold text-gray-700 mb-1">Exp. month</label>
            <select 
              name="expMonth"
              value={formData.expMonth}
              onChange={onChange}
              className={inputClass('expMonth')}
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                  {String(i + 1).padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-1">Exp. year</label>
            <select 
              name="expYear"
              value={formData.expYear}
              onChange={onChange}
              className={inputClass('expYear')}
            >
              <option value="">Year</option>
              {Array.from({ length: 15 }, (_, i) => (
                <option key={i} value={String(new Date().getFullYear() + i)}>
                  {new Date().getFullYear() + i}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2" data-error={!!errors.cvv}>
            <label className="block text-sm font-bold text-gray-700 mb-1">CVV</label>
            <input 
              type="password" 
              name="cvv"
              value={formData.cvv}
              onChange={onChange}
              maxLength={4}
              placeholder="123"
              className={inputClass('cvv')}
            />
            {errors.cvv && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.cvv}</p>}
          </div>
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* Billing Details Section */}
      <section>
        <h3 className="text-lg font-bold mb-4 text-gray-800 border-b border-gray-50 pb-2">Billing address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2" data-error={!!errors.fullName}>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full name</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              placeholder="First and last name"
              className={inputClass('fullName')}
            />
            {errors.fullName && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.fullName}</p>}
          </div>

          <div className="md:col-span-2" data-error={!!errors.address}>
            <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
            <input 
              type="text" 
              name="address"
              value={formData.address}
              onChange={onChange}
              placeholder="Street address or P.O. Box"
              className={inputClass('address')}
            />
            {errors.address && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.address}</p>}
          </div>

          <div data-error={!!errors.city}>
            <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={onChange}
              className={inputClass('city')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">State</label>
              <input 
                type="text" 
                name="state"
                value={formData.state}
                onChange={onChange}
                className={inputClass('state')}
              />
            </div>
            <div data-error={!!errors.zip}>
              <label className="block text-sm font-bold text-gray-700 mb-1">ZIP Code</label>
              <input 
                type="text" 
                name="zip"
                value={formData.zip}
                onChange={onChange}
                className={inputClass('zip')}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Phone number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="Mobile or landline"
              className={inputClass('phone')}
            />
          </div>

          <div data-error={!!errors.email}>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="For order confirmation"
              className={inputClass('email')}
            />
            {errors.email && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.email}</p>}
          </div>
        </div>
      </section>

      <div className="flex items-start mt-6 bg-gray-50 p-3 rounded border border-gray-100">
        <input id="save-card" type="checkbox" defaultChecked className="mt-1 h-4 w-4 text-[#007185] border-gray-300 rounded" />
        <label htmlFor="save-card" className="ml-2 text-sm text-gray-600 leading-tight">
          Save my card for future purchases and use as my default billing address. We keep your information secure.
        </label>
      </div>

      <div className="pt-6">
         <button 
          type="submit"
          disabled={isProcessing}
          className={`w-full md:w-auto md:px-12 py-3 rounded-lg font-bold shadow-sm border transition-all text-sm ${
            isProcessing 
            ? 'bg-gray-200 cursor-not-allowed text-gray-500 border-gray-300' 
            : 'bg-[#FFD814] hover:bg-[#F7CA00] border-[#FCD200] text-black active:shadow-inner transform hover:scale-[1.01]'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : 'Place your order'}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
