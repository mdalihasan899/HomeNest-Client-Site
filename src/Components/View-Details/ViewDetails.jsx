// components/PropertyDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      // Simulate API call - replace with actual endpoint
      const mockProperty = {
        _id: id,
        propertyName: 'Modern Apartment in Downtown',
        description: 'Beautiful modern apartment with great amenities including gym, pool, and 24/7 security. Located in the heart of downtown with easy access to public transportation, shopping centers, and restaurants.',
        category: 'Apartment',
        price: 250000,
        location: 'New York, NY',
        postedDate: '2024-01-15',
        imageLink: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
        userName: 'John Doe',
        userEmail: 'user@example.com',
        features: ['3 Bedrooms', '2 Bathrooms', 'Parking', 'Gym', 'Pool', 'Security']
      };

      setProperty(mockProperty);
    } catch (error) {
      toast.error('Failed to fetch property details');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" data-aos="fade-up">
          <img
            src={property.imageLink}
            alt={property.propertyName}
            className="w-full h-64 md:h-96 object-cover"
          />
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.propertyName}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {property.category}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {property.location}
                  </span>
                </div>
              </div>
              <p className="text-3xl font-bold text-indigo-600">
                {formatPrice(property.price)}
              </p>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {property.features && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-700 bg-gray-50 px-3 py-2 rounded-lg"
                    >
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Posted By</h4>
                  <p>{property.userName}</p>
                  <p>{property.userEmail}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Listing Information</h4>
                  <p>Posted: {formatDate(property.postedDate)}</p>
                  <p>Property ID: {property._id}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <Link
                to="/my-properties"
                className="flex-1 bg-gray-300 text-gray-700 text-center py-3 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Back to My Properties
              </Link>
              <Link
                to={`/update-property/${property._id}`}
                className="flex-1 bg-indigo-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Update Property
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;