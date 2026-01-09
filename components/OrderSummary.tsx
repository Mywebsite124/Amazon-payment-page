
import React from 'react';

interface OrderSummaryProps {
  isProcessing: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ isProcessing, onSubmit }) => {
  const itemsSubtotal = 129.99;
  const shipping = 5.99;
  const tax = 12.35;
  const total = itemsSubtotal + shipping + tax;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <button 
        onClick={onSubmit}
        disabled={isProcessing}
        className={`w-full py-2 rounded-lg font-medium text-sm shadow-sm border transition-all mb-4 ${
          isProcessing 
          ? 'bg-gray-200 cursor-not-allowed text-gray-500' 
          : 'bg-[#FFD814] hover:bg-[#F7CA00] border-[#FCD200] text-black active:shadow-inner'
        }`}
      >
        {isProcessing ? 'Processing...' : 'Place your order'}
      </button>

      <p className="text-[11px] text-gray-500 text-center mb-4 leading-tight">
        By placing your order, you agree to Amazon's privacy notice and conditions of use.
      </p>

      <div className="border-t border-gray-100 pt-3 space-y-2">
        <h3 className="text-sm font-bold mb-3">Order Summary</h3>
        
        <div className="flex justify-between text-xs text-gray-600">
          <span>Items:</span>
          <span>${itemsSubtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-xs text-gray-600">
          <span>Shipping & handling:</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xs text-gray-600 border-b border-gray-100 pb-2">
          <span>Estimated tax to be collected:</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-[#b12704] pt-1">
          <span>Order total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 bg-[#f3f3f3] -mx-4 px-4 pb-4 rounded-b-lg">
        <div className="flex items-center space-x-1 cursor-pointer group">
          <span className="text-blue-600 text-xs font-medium group-hover:underline group-hover:text-orange-700">How are shipping costs calculated?</span>
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
