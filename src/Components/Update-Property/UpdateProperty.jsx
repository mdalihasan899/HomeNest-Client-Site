// components/UpdateProperty.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import { TbCategory, TbCheck, TbCurrencyTaka, TbEdit, TbHome, TbMail, TbMapPin, TbPhoto, TbUser } from 'react-icons/tb';

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
    const res = await fetch(`https://book-management-server-psi.vercel.app/properties/${id}`);
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
      const res = await fetch(`https://book-management-server-psi.vercel.app/properties/${id}`, {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-8 text-black">
  <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8" data-aos="fade-up">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-4 shadow-lg">
          <TbEdit className="w-5 h-5" />
          <span>Update Property</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Update Property
        </h1>
        <p className="mt-3 text-lg text-gray-600">Edit your property information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Read-only user info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TbUser className="w-5 h-5 text-blue-500" />
                </div>
                <input
                  type="text"
                  value={user?.displayName || 'John Doe'}
                  readOnly
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TbMail className="w-5 h-5 text-blue-500" />
                </div>
                <input
                  type="email"
                  value={user?.email || 'user@example.com'}
                  readOnly
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property Name */}
        <div>
          <label htmlFor="propertyName" className="block text-lg font-semibold text-gray-900 mb-3">
            Property Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TbHome className="w-5 h-5 text-blue-500" />
            </div>
            <input
              type="text"
              id="propertyName"
              name="propertyName"
              required
              value={formData.propertyName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              placeholder="Enter property name"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-semibold text-gray-900 mb-3">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
            placeholder="Describe your property in detail..."
          />
        </div>

        {/* Category and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-lg font-semibold text-gray-900 mb-3">
              Category *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbCategory className="w-5 h-5 text-blue-500" />
              </div>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 appearance-none bg-white"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-lg font-semibold text-gray-900 mb-3">
              Price (BDT) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbCurrencyTaka className="w-5 h-5 text-blue-500" />
              </div>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                placeholder="Enter price"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-lg font-semibold text-gray-900 mb-3">
            Location *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TbMapPin className="w-5 h-5 text-blue-500" />
            </div>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              placeholder="Enter location"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="imageLink" className="block text-lg font-semibold text-gray-900 mb-3">
            Image URL *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TbPhoto className="w-5 h-5 text-blue-500" />
            </div>
            <input
              type="url"
              id="imageLink"
              name="imageLink"
              required
              value={formData.imageLink}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Image Preview */}
        {formData.imageLink && (
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Image Preview
            </label>
            <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden border-2 border-gray-200">
              <img
                src={formData.imageLink}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Updating Property...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <TbCheck className="w-5 h-5" />
                Update Property
              </div>
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