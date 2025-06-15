import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const {
    coupon,
    isCouponApplied,
    applyCoupon,
    getMyCoupon,
    removeCoupon,
  } = useCartStore();

  useEffect(() => {
    getMyCoupon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (coupon && isCouponApplied) {
      setUserInputCode(coupon.code);
    }
  }, [coupon, isCouponApplied]);

  const handleApplyCoupon = () => {
    if (!userInputCode.trim()) return;
    applyCoupon(userInputCode.trim());
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
  };

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Do you have a voucher or gift card?
          </label>
          <input
            type="text"
            id="voucher"
            className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter code here"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            disabled={isCouponApplied}
          />
        </div>

        <motion.button
          type="button"
          disabled={!userInputCode || isCouponApplied}
          onClick={handleApplyCoupon}
          className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 ${
            isCouponApplied || !userInputCode
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-900 focus:ring-blue-300"
          }`}
          whileHover={{ scale: isCouponApplied ? 1 : 1.05 }}
          whileTap={{ scale: isCouponApplied ? 1 : 0.95 }}
        >
          Apply Code
        </motion.button>
      </div>

      {isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-300">Applied Coupon</h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} – {coupon.discountPercentage}% off
          </p>

          <motion.button
            type="button"
            onClick={handleRemoveCoupon}
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}

      {!isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-300">Your Available Coupon:</h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} – {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default GiftCouponCard;
