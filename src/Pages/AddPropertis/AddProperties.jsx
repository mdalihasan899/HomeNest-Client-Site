import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../Firebase/firebase.config';
import { 
  TbHome,
  TbCurrencyTaka,
  TbMapPin,
  TbPhoto,
  TbUser,
  TbMail,
  TbPlus,
  TbCheck,
  TbInfoCircle
} from "react-icons/tb";

const AddProperties = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    description: '',
    category: '',
    price: '',
    location: '',
    imageLink: '',
    userEmail: 'user@example.com',
    userName: 'John Doe'
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
      if (currentUser) {
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
      seller_email: formData.userEmail,
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

      const response = await fetch('https://book-management-server-psi.vercel.app/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPropertis),
      });

      if (response.ok) {
        toast.success('Property added successfully!');
        setFormData({
          propertyName: '',
          description: '',
          category: '',
          price: '',
          location: '',
          imageLink: '',
          userEmail: formData.userEmail,
          userName: formData.userName
        });
      } else {
        toast.error('Failed to add property');
      }
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error('Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-12 text-bla text-black">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <TbPlus className="w-5 h-5" />
              <span>List Your Property</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Add Your Property
            </h1>
            <p className="text-xl text-gray-400 max-w-md mx-auto ">
              Fill out the form below to list your property on HomeNest
            </p>
          </div>

          {/* Property Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100" data-aos="fade-up" data-aos-delay="200">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Property Name */}
              <div>
                <label htmlFor="propertyName" className="block text-lg font-semibold text-gray-900 mb-3">
                  Property Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <TbHome className="h-5 w-5 text-blue-500" />
                  </div>
                  <input
                    type="text"
                    id="propertyName"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={handleChange}
                    className={`block w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 ${
                      errors.propertyName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Enter property name (e.g., Modern Downtown Apartment)"
                  />
                </div>
                {errors.propertyName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <TbInfoCircle className="w-4 h-4" />
                    {errors.propertyName}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-lg font-semibold text-gray-900 mb-3">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`block w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none ${
                    errors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="Describe your property in detail (features, amenities, nearby facilities, etc.)"
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <TbInfoCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Category and Price Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-lg font-semibold text-gray-900 mb-3">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`block w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 ${
                      errors.category ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
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
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <TbInfoCircle className="w-4 h-4" />
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-lg font-semibold text-gray-900 mb-3">
                    Price (৳) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <TbCurrencyTaka className="h-5 w-5 text-blue-500" />
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`block w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 ${
                        errors.price ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="Enter price"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <TbInfoCircle className="w-4 h-4" />
                      {errors.price}
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-lg font-semibold text-gray-900 mb-3">
                  Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <TbMapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`block w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 ${
                      errors.location ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Enter full address, city, or area"
                  />
                </div>
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <TbInfoCircle className="w-4 h-4" />
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Image Link */}
              <div>
                <label htmlFor="imageLink" className="block text-lg font-semibold text-gray-900 mb-3">
                  Image Link *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <TbPhoto className="h-5 w-5 text-blue-500" />
                  </div>
                  <input
                    type="url"
                    id="imageLink"
                    name="imageLink"
                    value={formData.imageLink}
                    onChange={handleChange}
                    className={`block w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 ${
                      errors.imageLink ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="https://example.com/property-image.jpg"
                  />
                </div>
                {errors.imageLink && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <TbInfoCircle className="w-4 h-4" />
                    {errors.imageLink}
                  </p>
                )}

                {/* Image Preview */}
                {formData.imageLink && isValidUrl(formData.imageLink) && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">Image Preview:</p>
                    <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden border-2 border-gray-200">
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
                  <label htmlFor="userEmail" className="block text-lg font-semibold text-gray-900 mb-3">
                    Your Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <TbMail className="h-5 w-5 text-blue-500" />
                    </div>
                    <input
                      type="email"
                      id="userEmail"
                      name="userEmail"
                      value={formData.userEmail}
                      readOnly
                      className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="userName" className="block text-lg font-semibold text-gray-900 mb-3">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <TbUser className="h-5 w-5 text-blue-500" />
                    </div>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      readOnly
                      className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed scale-100'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      Adding Property...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <TbPlus className="w-6 h-6" />
                      Add Property
                    </div>
                  )}
                </button>
              </div>

              {/* Form Help Text */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  * Required fields. Your property will be reviewed before appearing on the platform.
                </p>
              </div>
            </form>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100" data-aos="fade-up" data-aos-delay="400">
            <div className="flex items-center gap-3 mb-4">
              <TbInfoCircle className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-800">Tips for a Great Listing:</h3>
            </div>
            <ul className="text-blue-700 space-y-3">
              <li className="flex items-center gap-3">
                <TbCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Use high-quality, clear images of your property</span>
              </li>
              <li className="flex items-center gap-3">
                <TbCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Write a detailed description highlighting key features</span>
              </li>
              <li className="flex items-center gap-3">
                <TbCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Be accurate with pricing and location information</span>
              </li>
              <li className="flex items-center gap-3">
                <TbCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Mention nearby amenities and transportation</span>
              </li>
              <li className="flex items-center gap-3">
                <TbCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Include all relevant property details</span>
              </li>
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
        theme="light"
      />
    </div>
  );
};

export default AddProperties;