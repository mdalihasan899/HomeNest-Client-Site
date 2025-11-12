// AllPropertiesCard.jsx
import React, { use } from 'react';
import { useNavigate } from 'react-router';
import { TbCurrencyTaka } from "react-icons/tb";




const AllPropertiesCard = ({ allPropertiesCardPromise }) => {
    const allProperties = use(allPropertiesCardPromise);
    const navigate = useNavigate();


    const handleViewDetails = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {allProperties.map((property) => (
                <div
                    key={property._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 "
                >
                    {/* Property Image - You can add this later */}
                    <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-semibold">{property.Image}</span>
                    </div>

                    <div className="p-6">
                        {/* Category Badge */}
                        <div className="flex justify-between items-start mb-3">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                {property.Category}
                            </span>
                        </div>

                        {/* Property Name */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                            {property.Property_Name
                            }
                        </h3>

                        {/* Location */}
                        <div className="flex items-center text-gray-600 mb-3">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm">{property.Location}</span>
                        </div>

                        {/* Short Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {property.Description}
                        </p>

                        {/* Price and CTA */}
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-2xl font-bold text-green-600 flex items-center">
                                <p><TbCurrencyTaka /></p>
                                <p>{property.Price}</p>
                            </span>
                            <button
                                onClick={() => handleViewDetails(property.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllPropertiesCard;