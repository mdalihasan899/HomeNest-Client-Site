// components/UpdateProperty.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const UpdateProperty = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    propertyName: '',
    description: '',
    category: '',
    price: '',
    location: '',
    imageLink: ''
  });

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
        description: 'Beautiful modern apartment with great amenities',
        category: 'Apartment',
        price: 250000,
        location: 'New York, NY',
        imageLink: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
        userName: user?.name || 'John Doe',
        userEmail: user?.email || 'user@example.com'
      };

      setFormData({
        propertyName: mockProperty.propertyName,
        description: mockProperty.description,
        category: mockProperty.category,
        price: mockProperty.price,
        location: mockProperty.location,
        imageLink: mockProperty.imageLink
      });
    } catch (error) {
      toast.error('Failed to fetch property details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call - replace with actual update endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Property updated successfully!');
      navigate(`/property/${id}`);
    } catch (error) {
      toast.error('Failed to update property');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Apartment', 'Villa', 'House', 'Condo', 'Townhouse', 'Studio'];

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-black">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" data-aos="fade-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Update Property</h1>
            <p className="mt-2 text-gray-600">Edit your property information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Read-only user info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  value={user?.name || 'John Doe'}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Email
                </label>
                <input
                  type="email"
                  value={user?.email || 'user@example.com'}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Editable fields */}
            <div>
              <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700 mb-1">
                Property Name *
              </label>
              <input
                type="text"
                id="propertyName"
                name="propertyName"
                required
                value={formData.propertyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter property name"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Describe your property"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter location"
              />
            </div>

            <div>
              <label htmlFor="imageLink" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL *
              </label>
              <input
                type="url"
                id="imageLink"
                name="imageLink"
                required
                value={formData.imageLink}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {formData.imageLink && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                <img
                  src={formData.imageLink}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  'Update Property'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProperty;