// AllPropertiesCard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { TbCurrencyTaka, TbMapPin, TbStar } from "react-icons/tb";

const AllPropertiesCard = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("");

    const categories = [
        "All",
        "Rent",
        "Sale",
        "Commercial",
        "Land",
        "Apartment",
        "House",
        "Villa",
        "Condo",
        "Office Space",
        "Warehouse",
        "Farm",
        "Other",
    ];

    // Fetch data once
    useEffect(() => {
        fetch("https://book-management-server-psi.vercel.app/properties")
            .then((res) => res.json())
            .then((data) => {
                setProperties(data);
                setFilteredProperties(data);
            })
            .catch((err) => console.error("Failed to load:", err));
    }, []);

    // Apply filtering, search & sorting whenever inputs change
    useEffect(() => {
        let updated = [...properties];

        // Filter by category
        if (selectedCategory !== "All") {
            updated = updated.filter(
                (p) =>
                    p.Category &&
                    p.Category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Search filter
        if (searchTerm.trim() !== "") {
            updated = updated.filter(
                (p) =>
                    p.Property_Name &&
                    p.Property_Name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sorting
        if (sortBy) {
            updated.sort((a, b) => {
                switch (sortBy) {
                    case "price-low-high":
                        return (a.Price || 0) - (b.Price || 0);
                    case "price-high-low":
                        return (b.Price || 0) - (a.Price || 0);
                    case "name-a-z":
                        return (a.Property_Name || "").localeCompare(b.Property_Name || "");
                    case "name-z-a":
                        return (b.Property_Name || "").localeCompare(a.Property_Name || "");
                    case "category":
                        return (a.Category || "").localeCompare(b.Category || "");
                    default:
                        return 0;
                }
            });
        }

        setFilteredProperties(updated);
    }, [properties, searchTerm, selectedCategory, sortBy]);

    return (
        <div>
            {/* Filters and Search Bar */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-5" data-aos="fade-up">
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                    {/* Category Dropdown */}
                    <div className="flex-1">
                        <label className="block text-lg font-semibold text-gray-900 mb-3">
                            Category
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 appearance-none bg-white cursor-pointer hover:border-blue-300"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search Properties
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by property name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-4 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <svg
                                className="absolute left-4 top-5 w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div
                className="text-gray-600 whitespace-nowrap text-2xl mb-4 font-bold ml-4"
                data-aos="fade-up"
            >
                Properties found: {filteredProperties.length}
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" data-aos="fade-up">
                {filteredProperties.map((property) => (
                    <div
                        key={property._id}
                        className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
                    >
                        {/* Image Section */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={property.Image}
                                alt={property.Property_Name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                    {property.Category}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-bold text-gray-900 line-clamp-1 flex-1 mr-4">
                                    {property.Property_Name}
                                </h3>
                                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                                    <TbStar className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm font-bold text-blue-700">{property.Rating || 0}</span>
                                </div>
                            </div>

                            <div className="flex items-center text-gray-600 mb-4">
                                <TbMapPin className="w-4 h-4 mr-2 text-purple-500" />
                                <span className="text-sm font-medium">{property.Location}</span>
                            </div>

                            <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                                {property.Description}
                            </p>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-medium">
                                        Starting From
                                    </span>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                                        BDT  {property.Price}
                                    </span>
                                </div>
                                <Link to={`/property/${property._id}`}>
                                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                                        View Details
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results */}
            {filteredProperties.length === 0 && (
                <div className="text-center py-12" data-aos="fade-up">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search criteria or category filter</p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('All');
                            setSortBy('');
                        }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllPropertiesCard;
