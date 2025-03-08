import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getAllCoupons } from "../helper/coupon";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const CouponDialog = ({ onClose, appliedCoupons, setAppliedCoupons }) => {
  const [couponCode, setCouponCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: availableCoupons, isLoading } = useQuery({
    queryKey: ["available_coupons"],
    queryFn: () => getAllCoupons(),
    select: (data) => data?.response,
  });

  const handleApplyCoupon = (code) => {
    if (!code) {
      setErrorMessage("Please enter a coupon code");
      return;
    }
    const coupon = availableCoupons.find((c) => c.code === code);
    if (coupon) {
      setAppliedCoupons([coupon]);
      setErrorMessage("");
      setCouponCode("");
    } else {
      setErrorMessage("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = (code) => {
    const updatedCoupons = appliedCoupons.filter((c) => c.code !== code);
    setAppliedCoupons(updatedCoupons.length ? updatedCoupons : []);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center p-4 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-xl mt-20 mb-8 animate-slide-up overflow-y-auto h-[80%]">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b">
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
                Applied Coupons ({appliedCoupons.length || ""})
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
                        {coupon.discountType === "fixed" ? "₹" : ""}
                        {coupon.discountValue}
                        {coupon.discountType === "percentage" ? "%" : ""}{" "}
                        {"Off"}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      {coupon.description ||
                        `Get ${
                          coupon.discountType === "percentage"
                            ? `${coupon.discountValue}% off${
                                coupon.maxDiscount
                                  ? `, up to ₹${coupon.maxDiscount}`
                                  : ""
                              }`
                            : `₹${coupon.discountValue} off`
                        } on all products`}
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
            {isLoading
              ? [...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse p-4 border rounded-md">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))
              : availableCoupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className={`border rounded-md p-4 hover:border-primary transition-colors ${
                      appliedCoupons.length > 0
                        ? "pointer-events-none opacity-50 filter grayscale"
                        : ""
                    }`}
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
                            {coupon.discountType === "fixed" ? "₹" : ""} {" "}
                            {coupon.discountValue}
                            {coupon.discountType === "percentage"
                              ? "%"
                              : ""}{" "}
                            {"Off"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {coupon.description ||
                            `Get ${
                              coupon.discountType === "percentage"
                                ? `${coupon.discountValue}% off${
                                    coupon.maxDiscount
                                      ? `, up to ₹${coupon.maxDiscount}`
                                      : ""
                                  }`
                                : `₹${coupon.discountValue} off`
                            } on all products`}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {dayjs(coupon.endDate).format(
                            "DD/MM/YYYY hh:mm A"
                          )}{" "}
                          {/* {"|"}{" "} */}
                          {/* <span>{coupon.terms || "Min Purchase of 2500"}</span> */}
                        </p>
                      </div>
                      <button
                        onClick={() => handleApplyCoupon(coupon.code)}
                        className="ml-4 px-3 py-1.5 bg-primary hover:bg-primary-dark text-gray rounded-md text-sm transition-transform transform border border-blue-500 hover:scale-105"
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
            <div
              className={`${
                appliedCoupons.length > 0
                  ? "pointer-events-none opacity-50 filter grayscale"
                  : ""
              } flex gap-2`}
            >
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button
                onClick={() => handleApplyCoupon(couponCode)}
                className="ml-4 px-3 py-1.5 bg-primary hover:bg-primary-dark text-gray rounded-md text-sm transition-transform transform border border-blue-500 hover:scale-105"
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
