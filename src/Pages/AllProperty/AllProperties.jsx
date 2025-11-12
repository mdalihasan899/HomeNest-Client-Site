// components/AllProperties.js
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AllPropertiesCard from './AllProperiesCard';

const allPropertiesCardPromise = fetch('http://localhost:3000/properties').then(res => res.json());

const AllProperties = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    'All',
    'Rent',
    'Sale',
    'Commercial',
    'Land',
    'Apartment',
    'House',
    'Villa',
    'Condo',
    'Office Space',
    'Warehouse',
    'Farm',
    'Other'
  ];

  // ✅ Filter and Sort Functionality (fixed version)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await allPropertiesCardPromise; // Wait for the data from fetch
        let filtered = [...data];

        // Filter by category
        if (selectedCategory !== 'All') {
          filtered = filtered.filter(property =>
            property.category && property.category.toLowerCase() === selectedCategory.toLowerCase()
          );
        }

        // Filter by search term
        if (searchTerm) {
          filtered = filtered.filter(property =>
            property.name && property.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // ✅ Sort properties
        if (sortBy) {
          filtered.sort((a, b) => {
            switch (sortBy) {
              case 'price-low-high':
                return (a.price || 0) - (b.price || 0);
              case 'price-high-low':
                return (b.price || 0) - (a.price || 0);
              case 'name-a-z':
                return (a.name || '').localeCompare(b.name || '');
              case 'name-z-a':
                return (b.name || '').localeCompare(a.name || '');
              case 'category':
                return (a.category || '').localeCompare(b.category || '');
              default:
                return 0;
            }
          });
        }

        setFilteredProperties(filtered);
        setLoading(false);
      } catch (err) {
        setError('Failed to load properties');
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, searchTerm, sortBy]);

  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    
    if (price < 10000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'BDT',
        maximumFractionDigits: 0
      }).format(price) + '/month';
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getCategoryColor = (category) => {
    if (!category) return 'bg-gray-100 text-gray-800 border-gray-200';
    
    const colors = {
      Rent: 'bg-blue-100 text-blue-800 border-blue-200',
      Sale: 'bg-green-100 text-green-800 border-green-200',
      Commercial: 'bg-purple-100 text-purple-800 border-purple-200',
      Land: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Apartment: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      House: 'bg-orange-100 text-orange-800 border-orange-200',
      Villa: 'bg-pink-100 text-pink-800 border-pink-200',
      Condo: 'bg-teal-100 text-teal-800 border-teal-200',
      'Office Space': 'bg-gray-100 text-gray-800 border-gray-200',
      Warehouse: 'bg-red-100 text-red-800 border-red-200',
      Farm: 'bg-lime-100 text-lime-800 border-lime-200',
      Other: 'bg-slate-100 text-slate-800 border-slate-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Properties</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Property
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing properties across different categories
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8" data-aos="fade-up">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Category Dropdown */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
                <option value="category">Category</option>
              </select>
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
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <svg 
                  className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 whitespace-nowrap">
              {filteredProperties.length} properties found
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <AllPropertiesCard allPropertiesCardPromise={allPropertiesCardPromise} />

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
    </div>
  );
};

export default AllProperties;
