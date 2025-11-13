// components/UpdateProperty.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';

const UpdateProperty = () => {
  const [user, setUser] = useState(null);
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
  // console.log('formData:', formData);
  // console.log('Property ID:', id);

  const categories = ['Apartment', 'Villa', 'House', 'Condo', 'Townhouse', 'Studio'];


  // 🔹 Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Force refresh to get latest user data
        try {
          await currentUser.reload();
          const updatedUser = auth.currentUser;
          setUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
            emailVerified: updatedUser.emailVerified,
          });
        } catch (error) {
          console.error('Error refreshing user:', error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);



  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchProperty();
  }, [id]);

  // 🔹 Fetch property data from server
  const fetchProperty = async () => {
  try {
    const res = await fetch(`http://localhost:3000/properties/${id}`);
    if (!res.ok) throw new Error('Failed to fetch property');

    const data = await res.json();
    console.log('Fetched property data:', data);

    setFormData({
      propertyName: data.Property_Name || '',
      description: data.Description || '',
      category: data.Category || '',
      price: data.Price || '',
      location: data.Location || '',
      imageLink: data.Image || ''
    });
  } catch (error) {
    console.error(error);
    toast.error('Failed to load property details');
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedProperty = {
      Property_Name: formData.propertyName,
      Description: formData.description,
      Category: formData.category,
      Price: formData.price,
      Location: formData.location,
      Image: formData.imageLink,
      seller_name: user?.displayName || 'Demo User',
      seller_email: user?.email || 'demo@example.com'
    };

    try {
      const res = await fetch(`http://localhost:3000/properties/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProperty)
      });
      const result = await res.json();
      if (result.modifiedCount > 0 || result.success) {
        toast.success('Property updated successfully!');
        navigate(`/property/${id}`);
      } else {
        toast.error('Property update failed or no changes detected');
      }

    } catch (error) {
      console.error(error);
      toast.error('Failed to update property');
    } finally {
      setLoading(false);
    }
  };
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
                  value={user?.displayName || 'John Doe'}
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