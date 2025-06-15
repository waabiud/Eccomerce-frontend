import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupons");
      set({ coupon: response.data });
    } catch (error) {
      console.error("Error fetching coupon: ", error);
    }
  },

  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupons/validate", { code });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully", { id: "coupon-success" });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to apply coupon",
        { id: "coupon-fail" }
      );
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed successfully", { id: "coupon-removed" });
  },

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  clearCart: async () => {
    try {
      await axios.delete("/cart");
      set({
        cart: [],
        coupon: null,
        total: 0,
        subtotal: 0,
        isCouponApplied: false,
      });
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });

      set((state) => {
        const existingItem = state.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? state.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...product, quantity: 1 }];

        return { cart: newCart };
      });

      get().calculateTotals();
      toast.success("Product added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete("/cart", { data: { productId } });

      set((state) => ({
        cart: state.cart.filter((item) => item._id !== productId),
      }));

      get().calculateTotals();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      if (quantity === 0) {
        get().removeFromCart(productId);
        return;
      }

      await axios.put(`/cart/${productId}`, { quantity });

      set((state) => ({
        cart: state.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        ),
      }));

      get().calculateTotals();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  },

  calculateTotals: () => {
    const { cart, coupon } = get();

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total -= discount;
    }

    set({ subtotal, total });
  },
}));
