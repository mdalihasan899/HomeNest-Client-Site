// components/MyProperties.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MyProperties = ({ user }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      // Simulate API call - replace with actual endpoint
      const userEmail = user?.email || 'user@example.com';
      
      // Mock data for demonstration
      const mockProperties = [
        {
          _id: '1',
          propertyName: 'Modern Apartment in Downtown',
          category: 'Apartment',
          price: 250000,
          location: 'New York, NY',
          postedDate: '2024-01-15',
          imageLink: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
          description: 'Beautiful modern apartment with great amenities',
          userName: user?.name || 'John Doe',
          userEmail: userEmail
        },
        {
          _id: '2',
          propertyName: 'Luxury Villa with Pool',
          category: 'Villa',
          price: 750000,
          location: 'Miami, FL',
          postedDate: '2024-01-10',
          imageLink: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400',
          description: 'Stunning luxury villa with private pool',
          userName: user?.name || 'John Doe',
          userEmail: userEmail
        }
      ].filter(property => property.userEmail === userEmail);

      setProperties(mockProperties);
    } catch (error) {
      toast.error('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId, propertyName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${propertyName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        // Simulate API call - replace with actual delete endpoint
        setProperties(prev => prev.filter(property => property._id !== propertyId));
        toast.success('Property deleted successfully');
      } catch (error) {
        toast.error('Failed to delete property');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Properties
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Manage your property listings
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12" data-aos="fade-up">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-500 mb-6">
                You haven't listed any properties yet.
              </p>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Add Your First Property
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <div
                key={property._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={property.imageLink}
                  alt={property.propertyName}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {property.propertyName}
                    </h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {property.category}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-2xl font-bold text-indigo-600">
                      {formatPrice(property.price)}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {property.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      Posted: {formatDate(property.postedDate)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    <Link
                      to={`/update-property/${property._id}`}
                      className="flex-1 bg-indigo-600 text-white text-center py-2 px-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(property._id, property.propertyName)}
                      className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/property/${property._id}`}
                      className="flex-1 bg-gray-200 text-gray-800 text-center py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;