import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-xl mx-auto mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-2xl font-semibold text-emerald-300 mb-6">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm text-gray-300 mb-1">
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-4">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 border border-gray-600 text-gray-300 py-2 px-3 rounded-md shadow-sm hover:bg-gray-600 transition"
          >
            <Upload className="h-5 w-5 inline-block mr-1" />
            Upload Image
          </label>
          {newProduct.image && <span className="text-sm text-gray-400">Image uploaded</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <PlusCircle className="h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
