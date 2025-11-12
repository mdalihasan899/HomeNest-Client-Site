// LatestProperties.jsx
import React, { use } from 'react';
import { useNavigate } from 'react-router';
import { 
  TbCurrencyTaka,
  TbMapPin,
  TbBed,
  TbBath,
  TbRuler,
  TbStar,
  TbHeart
} from "react-icons/tb";
import { 
  FaSwimmingPool, 
  FaWifi, 
  FaCar, 
  FaTree,
  FaFire
} from "react-icons/fa";

const LatestProperties = ({ latestPropertiesPromise }) => {
    const properties = use(latestPropertiesPromise);
    const navigate = useNavigate();

    const handleViewDetails = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    const handleAddToFavorites = (e, propertyId) => {
        e.stopPropagation();
        // Add to favorites logic
        console.log('Added to favorites:', propertyId);
    };

    // Sample amenities for demonstration
    const getAmenities = (category) => {
        const baseAmenities = [
            { icon: <FaWifi className="text-blue-400" />, name: 'WiFi' },
            { icon: <FaCar className="text-purple-400" />, name: 'Parking' }
        ];
        
        if (category === 'Luxury') {
            return [...baseAmenities, { icon: <FaSwimmingPool className="text-cyan-400" />, name: 'Pool' }];
        }
        if (category === 'Nature') {
            return [...baseAmenities, { icon: <FaTree className="text-green-400" />, name: 'Garden' }];
        }
        return baseAmenities;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
                    <FaFire className="text-orange-300" />
                    <span>Trending Properties</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Latest Properties
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover our newest additions featuring modern amenities and prime locations
                </p>
            </div>

            {/* Properties Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <div
                            key={property._id}
                            className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
                        >
                            {/* Image Section with Overlay */}
                            <div className="relative h-64 overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                    <span className="text-white font-semibold text-lg">{property.Image || 'Property Image'}</span>
                                </div>
                                
                                {/* Featured Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                        {property.Category}
                                    </span>
                                </div>

                                {/* Favorite Button */}
                                <button 
                                    onClick={(e) => handleAddToFavorites(e, property._id)}
                                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                                >
                                    <TbHeart className="w-5 h-5" />
                                </button>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Quick Stats Overlay */}
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <div className="flex items-center gap-4 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                                        <div className="flex items-center gap-1">
                                            <TbBed className="w-4 h-4" />
                                            <span className="text-sm font-medium">3 Beds</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <TbBath className="w-4 h-4" />
                                            <span className="text-sm font-medium">2 Baths</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <TbRuler className="w-4 h-4" />
                                            <span className="text-sm font-medium">1200 sqft</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                {/* Property Title and Rating */}
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 flex-1 mr-4">
                                        {property.Property_Name}
                                    </h3>
                                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                                        <TbStar className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-bold text-blue-700">4.8</span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center text-gray-600 mb-4">
                                    <TbMapPin className="w-4 h-4 mr-2 text-purple-500" />
                                    <span className="text-sm font-medium">{property.Location}</span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {property.Description}
                                </p>

                                {/* Amenities */}
                                <div className="flex gap-3 mb-6">
                                    {getAmenities(property.Category).map((amenity, index) => (
                                        <div 
                                            key={index}
                                            className="flex items-center gap-1 bg-gray-50 px-3 py-2 rounded-lg"
                                            title={amenity.name}
                                        >
                                            {amenity.icon}
                                            <span className="text-xs text-gray-600 font-medium">{amenity.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Price and CTA */}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 font-medium">Starting From</span>
                                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                                            <TbCurrencyTaka className="w-6 h-6" />
                                            {property.Price}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleViewDetails(property._id)}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                                    >
                                        View Details
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-300 rounded-3xl transition-all duration-500 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-12">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Load More Properties
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LatestProperties;