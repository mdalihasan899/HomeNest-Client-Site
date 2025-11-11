import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { FaHome, FaDollarSign, FaMapMarkerAlt, FaImage, FaPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../Firebase/firebase.config';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    description: '',
    category: '',
    price: '',
    location: '',
    imageLink: '',
    userEmail: 'user@example.com', // This would come from auth context
    userName: 'John Doe' // This would come from auth context
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categories for dropdown
  const categories = [
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

  // Track user login/logout with better state handling
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      // console.log(currentUser);

      if (currentUser) {
        // Force refresh to get latest user data
        try {
          await currentUser.reload();
          const updatedUser = auth.currentUser;
          setUser({
            email: updatedUser.email,
            displayName: updatedUser.displayName,
          });


          setFormData(prev => ({
            ...prev,
            userEmail: updatedUser.email,
            userName: updatedUser.displayName
          }));
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



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.propertyName.trim()) {
      newErrors.propertyName = 'Property name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description should be at least 10 characters long';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.imageLink.trim()) {
      newErrors.imageLink = 'Image link is required';
    } else if (!isValidUrl(formData.imageLink)) {
      newErrors.imageLink = 'Please enter a valid image URL';
    }

    return newErrors;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error('Please fix the errors in the form');
      return;
    }


    const currentTime = new Date().toISOString();
    const newPropertis = {
      seller_email: formData.email,
      seller_name: formData.userName,
      Property_Name: formData.propertyName,
      Category: formData.category,
      Description: formData.description,
      Image: formData.imageLink,
      Location: formData.location,
      Price: formData.price,
      createdAt: currentTime,
    };

    try {
      setIsSubmitting(true);

      const response = await fetch('http://localhost:3000/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPropertis),
      });

      if (response.ok) {
        toast.success('Property added successfully!');
        setFormData({
          email: '',
          userName: '',
          propertyName: '',
          category: '',
          description: '',
          imageLink: '',
          location: '',
          price: '',
        });
      } else {
        toast.error('Failed to add property');
      }
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error('Something went wrong!');
    } finally {
      // ✅ Add complete হলে submit button পুনরায় enable হবে
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-12 text-black ">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8" data-aos="fade-up">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Add Your Property
            </h1>
            <p className="text-gray-600 text-lg">
              Fill out the form below to add your property to HomeNest
            </p>
          </div>

          {/* Property Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8" data-aos="fade-up" data-aos-delay="200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Property Name */}
              <div>
                <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaHome className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="propertyName"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.propertyName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter property name (e.g., Modern Downtown Apartment)"
                  />
                </div>
                {errors.propertyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.propertyName}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Describe your property in detail (features, amenities, nearby facilities, etc.)"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Category and Price Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.category ? 'border-red-500' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="Enter price"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter full address, city, or area"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              {/* Image Link */}
              <div>
                <label htmlFor="imageLink" className="block text-sm font-medium text-gray-700 mb-2">
                  Image Link *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaImage className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="imageLink"
                    name="imageLink"
                    value={formData.imageLink}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.imageLink ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="https://example.com/property-image.jpg"
                  />
                </div>
                {errors.imageLink && (
                  <p className="mt-1 text-sm text-red-600">{errors.imageLink}</p>
                )}

                {/* Image Preview */}
                {formData.imageLink && isValidUrl(formData.imageLink) && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={formData.imageLink}
                        alt="Property preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* User Info (Read-only) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="userEmail"
                    name="userEmail"
                    value={formData.userEmail}
                    readOnly
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    readOnly
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition duration-300 ${isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
                    } text-white shadow-lg`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                      Adding Property...
                    </div>
                  ) : (
                    'Add Property'
                  )}
                </button>
              </div>

              {/* Form Help Text */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  * Required fields. Your property will be reviewed before appearing on the platform.
                </p>
              </div>
            </form>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6" data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Tips for a Great Listing:</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Use high-quality, clear images of your property</li>
              <li>• Write a detailed description highlighting key features</li>
              <li>• Be accurate with pricing and location information</li>
              <li>• Mention nearby amenities and transportation</li>
              <li>• Include all relevant property details</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddProperty;