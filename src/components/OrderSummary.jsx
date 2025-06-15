import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51NPQODGC69aYgX34hUtZEshxXvBnRhOafgTSV8okijR4yxGd7eVBKhRMMgoPsTLpKp38pGTd8IKFahw0qX9bVaCL000MJJicLB"
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedTotal = total.toFixed(2);
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    if (!cart.length) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      const stripe = await stripePromise;

      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon?.code || null,
      });

      const session = res.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        toast.error(result.error.message || "Stripe redirect failed");
        console.error("Error:", result.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <motion.div
      className="space-y-5 rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-lg sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-blue-400">Order summary</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between">
            <dt className="text-gray-300">Original price</dt>
            <dd className="text-white">${formattedSubtotal}</dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between">
              <dt className="text-gray-300">Savings</dt>
              <dd className="text-blue-400">-${formattedSavings}</dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between">
              <dt className="text-gray-300">
                Coupon <span className="uppercase">({coupon.code})</span>
              </dt>
              <dd className="text-blue-400">
                -{coupon.discountPercentage || 0}%
              </dd>
            </dl>
          )}

          <dl className="flex items-center justify-between border-t border-gray-600 pt-3">
            <dt className="text-white font-bold">Total</dt>
            <dd className="text-blue-400 font-bold">${formattedTotal}</dd>
          </dl>
        </div>

        <motion.button
          type="button"
          onClick={handlePayment}
          className="w-full flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Checkout
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 underline hover:text-blue-300 hover:no-underline"
          >
            Add more products
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
