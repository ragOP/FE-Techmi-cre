import { useState } from 'react';
import { X } from 'lucide-react';

const CouponDialog = ({ onClose }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Demo coupon data
  const availableCoupons = [
    {
      code: 'FLAT50',
      discount: '50% OFF',
      description: 'Get 50% off on orders above ₹999',
      validity: 'Valid till 30 Sept 2024',
      terms: 'Applicable on selected products'
    },
    {
      code: 'FREESHIP',
      discount: 'Free Shipping',
      description: 'Free delivery on orders above ₹499',
      validity: 'Valid till 31 Dec 2024',
      terms: 'Applicable for standard shipping'
    },
    {
      code: 'WELCOME20',
      discount: '20% OFF',
      description: '20% off for new customers',
      validity: 'Valid till 31 Oct 2024',
      terms: 'Max discount ₹200'
    }
  ];

  const handleApplyCoupon = (code) => {
    if (!code) {
      setErrorMessage('Please enter a coupon code');
      return;
    }
    
    const coupon = availableCoupons.find(c => c.code === code);
    if (coupon) {
      setAppliedCoupons([...appliedCoupons, coupon]);
      setErrorMessage('');
      setCouponCode('');
    } else {
      setErrorMessage('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = (code) => {
    setAppliedCoupons(appliedCoupons.filter(c => c.code !== code));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center p-4 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl mt-20 mb-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Apply Coupons</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          {/* Applied Coupons */}
          {appliedCoupons.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-green-600 mb-2">
                Applied Coupons ({appliedCoupons.length})
              </h3>
              {appliedCoupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="bg-green-50 border border-green-200 rounded-md p-3 mb-2 flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-green-700">
                        {coupon.code}
                      </span>
                      <span className="text-green-600 text-sm">
                        {coupon.discount}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      {coupon.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveCoupon(coupon.code)}
                    className="text-green-600 hover:text-green-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Available Coupons */}
          <div className="space-y-4">
            {availableCoupons.map((coupon) => (
              <div
                key={coupon.code}
                className="border rounded-md p-4 hover:border-primary transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 px-2 py-1 rounded">
                        <span className="font-medium text-blue-600">
                          {coupon.code}
                        </span>
                      </div>
                      <span className="text-green-600 font-medium">
                        {coupon.discount}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{coupon.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {coupon.validity}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {coupon.terms}
                    </p>
                  </div>
                  <button
                    onClick={() => handleApplyCoupon(coupon.code)}
                    className="ml-4 px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-md text-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Input */}
          <div className="mt-6 pt-4 border-t">
            <h3 className="text-sm font-medium mb-3">Have another coupon?</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button
                onClick={() => handleApplyCoupon(couponCode)}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md"
              >
                Apply
              </button>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 mt-6">
            Coupons are subject to terms and conditions. Please read the
            individual coupon terms before applying.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouponDialog;