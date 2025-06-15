import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <Link to={`/category${category.href}`} className="block group">
      <div className="relative overflow-hidden h-80 w-full rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
        <img
          src={category.imageUrl}
          alt={category.name || "Category"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-10" />

        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-white text-2xl font-semibold mb-1">
            {category.name}
          </h3>
          <p className="text-gray-300 text-sm">
            Explore {category.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
