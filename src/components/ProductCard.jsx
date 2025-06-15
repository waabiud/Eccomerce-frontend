import React from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
    } else {
      addToCart(product);
      toast.success("Added to cart");
    }
  };

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg bg-gray-800">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="object-cover w-full h-full"
          src={product.image}
          alt={product.name || "Product image"}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {product.name}
        </h5>

        <div className="mt-2 mb-5 flex items-center justify-between">
          <span className="text-3xl font-bold text-emerald-400">
            ${product.price}
          </span>
        </div>

        <button
          className="flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={22} className="mr-2" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
