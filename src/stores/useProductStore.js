import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });

    try {
      const res = await axios.post("/products", productData);
      set((state) => ({
        products: [...state.products, res.data],
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch products");
      set({ error: "Failed to fetch products", loading: false });
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/products/category/${category}`);
      set({ products: response.data.products, loading: false });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch products");
      set({ error: "Failed to fetch products", loading: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
        loading: false,
      }));
      toast.success("Product deleted");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete product");
      set({ loading: false });
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);
      const updated = response.data.updatedProduct;

      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: updated.isFeatured }
            : product
        ),
        loading: false,
      }));
      toast.success("Featured status updated");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to toggle featured product");
      set({ loading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/products/featured");
      set({ products: response.data, loading: false });
    } catch (error) {
      toast.error("Failed to fetch featured products");
      set({ error: "Failed to fetch featured products", loading: false });
    }
  },
}));

export default useProductStore;
