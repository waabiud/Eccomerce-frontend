import React, { useEffect } from "react";
import CategoryItem from "../components/CategoryItem.jsx";
import useProductStore from "../stores/useProductStore.js";
import FeaturedProducts from "../components/FeaturedProducts.jsx";

const categories = [
    { href: "/Computers", name: "Computers", imageUrl: "/Computers.jpeg" },
    { href: "/Bikes", name: "Clothes", imageUrl: "/clothes.jpeg" },
    { href: "/Shoes", name: "Shoes", imageUrl: "/Shoes.jpeg" },
    { href: "/Smartphones", name: "Smartphones", imageUrl: "/Smartphones.webp" },
    { href: "/Watches", name: "Watches", imageUrl: "/Watches.webp" },
    { href: "/Farm", name: "Farm inputs", imageUrl: "/Farm.webp" },
    { href: "/Wines", name: "Wines & Spirits", imageUrl: "/Wines.jpg" },
    { href: "/Sandals", name: "Sandals", imageUrl: "/Sandals.webp" },
    { href: "/Caps", name: "Caps", imageUrl: "/Caps.jpg" },
    { href: "/Utensils", name: "Utensils", imageUrl: "/Utensils.jpg" },
    { href: "/Perfumes", name: "Perfumes", imageUrl: "/Perfumes.jpg" },
    { href: "/Apliances", name: "Electrical Apliances", imageUrl: "/Apliances.webp" },
];

const HomePage = () => {
    const { fetchFeaturedProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

    return (
        <div className="relative min-h-screen text-white overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-center text-5xl sm:text-6xl font-bold text-blue-400 mb-4">
                    Welcome to Wamalwa Marketplace
                </h1>

                <p className="text-center text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                    Shop smart, live better. Explore our curated collection of trending tech,
                    fashion, home essentials, and more  all in one place.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <CategoryItem category={category} key={category.name} />
                    ))}
                </div>

                {!isLoading && products.length > 0 && (
                    <FeaturedProducts featuredProducts={products} />
                )}
            </div>
        </div>
    );
};

export default HomePage;
