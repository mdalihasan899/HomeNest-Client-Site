// components/PropertyDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import AOS from 'aos';
import Loadding from '../Loadding/Loadding';
import 'aos/dist/aos.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import {
  TbMapPin,
  TbCalendar,
  TbStar,
  TbStarFilled,
  TbBed,
  TbBath,
  TbRuler,
  TbUser,
  TbHeart,
  TbShare,
  TbArrowLeft,
  TbCheck
} from "react-icons/tb";
import {
  FaWhatsapp,
  FaPhone,
  FaVideo,
  FaMapMarkerAlt
} from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);
  const [user, setUser] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  // Fetch property
  useEffect(() => {
    fetch(`https://book-management-server-psi.vercel.app/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching property:', error);
        setLoading(false);
      });
  }, [id]);

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          await currentUser.reload();
          const updatedUser = auth.currentUser;
          setUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
          });
        } catch (error) {
          console.error('Error refreshing user:', error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
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

  // Review Handling
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit a review.");
      return;
    }

    if (rating === 0 || review.trim() === "") {
      alert("Please provide a rating and review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating,
      text: review,
      name: user.displayName || "Anonymous",
      email: user.email,
      photo: user.photoURL || "https://i.ibb.co/5cL6YVr/default-user.png",
      date: new Date().toISOString()
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setReview('');
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically update in your database
  };

  const renderStars = (rating, size = 'w-5 h-5') => {
    return Array.from({ length: 5 }, (_, index) => (
      index < rating ?
        <TbStarFilled key={index} className={`${size} text-yellow-400 fill-current`} /> :
        <TbStar key={index} className={`${size} text-gray-300`} />
    ));
  };

  if (loading) return <Loadding />;

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
        >
          <TbArrowLeft className="w-5 h-5" />
          Back to Properties
        </button>

        {/* Property Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden" data-aos="fade-up">
          {/* Property Image */}
          <div className="relative h-80 md:h-96 overflow-hidden">
            <img
              src={property.Image}
              alt={property.Property_Name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-6 left-6 flex gap-3">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {property.Category}
              </span>

            </div>
            <div className="absolute top-6 right-6 flex gap-3">
              <button
                onClick={handleFavorite}
                className={`bg-white/90 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  }`}
              >
                <TbHeart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="bg-white/90 backdrop-blur-sm text-gray-600 hover:text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                <TbShare className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Property Content */}
          <div className="p-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <div className="flex-1 mb-6 lg:mb-0">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {property.Property_Name}
                </h1>
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center bg-blue-50 px-4 py-2 rounded-xl">
                    <TbMapPin className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="font-medium">{property.Location}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-green-50 px-4 py-2 rounded-xl">
                    <div className="flex gap-1">
                      {renderStars(4.8)}
                    </div>
                    <span className="font-bold text-green-600">4.8</span>
                    <span className="text-gray-500">(124 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {formatPrice(property.Price)}
                </div>
                <p className="text-gray-500 text-sm">Total Price</p>
              </div>
            </div>



            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {property.Description}
              </p>
            </div>

            {/* Features */}
            {property.features && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 rounded-xl border border-blue-100"
                    >
                      <TbCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Information */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Posted By</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {property.seller_name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{property.seller_name}</p>
                      <p className="text-gray-600">{property.seller_email}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Listing Information</h4>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <TbCalendar className="w-5 h-5 text-blue-500" />
                    <span>Posted: {formatDate(property.date)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setShowBookingModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex-1"
              >
                Schedule a Tour
              </button>
              <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex-1">
                Contact Agent
              </button>
            </div>

            {/* Schedule Tour Modal */}
            {showBookingModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-white/70">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-xl">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
                  >
                    &times;
                  </button>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule a Tour</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Your Name</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-black focus:border-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-black focus:border-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Preferred Date & Time</label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-black focus:border-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold w-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}


            {/* Ratings & Reviews Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Ratings & Reviews
                  </h3>
                  <p className="text-gray-600">What people are saying about this property</p>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-4 lg:mt-0">
                  Write a Review
                </button>
              </div>

              {/* Overall Rating Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Average Rating */}
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">4.8</div>
                    <div className="flex justify-center space-x-1 mb-3">
                      {renderStars(4.8, 'w-6 h-6')}
                    </div>
                    <p className="text-gray-600">Based on 124 reviews</p>
                  </div>

                  {/* Rating Distribution */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((starRating) => (
                      <div key={starRating} className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-600 w-4">{starRating}</span>
                        <TbStarFilled className="w-4 h-4 text-yellow-400 fill-current" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${[85, 10, 3, 1, 1][5 - starRating]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{[85, 10, 3, 1, 1][5 - starRating]}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Input Form */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Write Your Review</h4>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transform hover:scale-110 transition-transform duration-200"
                      >
                        {star <= rating ? (
                          <TbStarFilled className="w-8 h-8 text-yellow-400 fill-current" />
                        ) : (
                          <TbStar className="w-8 h-8 text-gray-300" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Review Text */}
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your experience with this property..."
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition-colors duration-300 resize-none text-black focus:outline-none"
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!user || rating === 0 || review.trim() === ""}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    {user ? 'Submit Review' : 'Login to Review'}
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <TbStar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-600 mb-2">No Reviews Yet</h4>
                    <p className="text-gray-500">Be the first to share your experience with this property!</p>
                  </div>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={rev.photo}
                            alt={rev.name}
                            className="w-12 h-12 rounded-full border-2 border-blue-200 object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">{rev.name}</h4>
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                {renderStars(rev.rating, 'w-4 h-4')}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(rev.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{rev.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;