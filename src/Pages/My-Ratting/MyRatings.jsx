// components/MyRatings.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MyRatings = ({ user }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'positive', 'negative'

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchMyRatings();
  }, []);

  const fetchMyRatings = async () => {
    try {
      // Simulate API call - replace with actual endpoint
      const userEmail = user?.email || 'user@example.com';
      
      // Mock data for demonstration
      const mockRatings = [
        {
          _id: '1',
          reviewerName: 'Sarah Johnson',
          reviewerEmail: 'sarah@example.com',
          propertyId: '1',
          propertyName: 'Modern Apartment in Downtown',
          rating: 5,
          reviewText: 'Absolutely loved this apartment! The location is perfect and the amenities are top-notch. Highly recommended!',
          reviewDate: '2024-01-20',
          propertyThumbnail: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300',
          propertyCategory: 'Apartment',
          propertyLocation: 'New York, NY',
          helpful: 3,
          reply: {
            text: 'Thank you for your wonderful review, Sarah! We are delighted you enjoyed your stay.',
            date: '2024-01-21',
            userName: 'John Doe'
          }
        },
        {
          _id: '2',
          reviewerName: 'Mike Chen',
          reviewerEmail: 'mike@example.com',
          propertyId: '2',
          propertyName: 'Luxury Villa with Pool',
          rating: 4,
          reviewText: 'Great villa with amazing pool area. The kitchen could use some updates, but overall excellent experience.',
          reviewDate: '2024-01-18',
          propertyThumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300',
          propertyCategory: 'Villa',
          propertyLocation: 'Miami, FL',
          helpful: 1,
          reply: null
        },
        {
          _id: '3',
          reviewerName: 'Emily Davis',
          reviewerEmail: 'emily@example.com',
          propertyId: '1',
          propertyName: 'Modern Apartment in Downtown',
          rating: 3,
          reviewText: 'Decent apartment but the noise from the street was quite loud at night. Good value for money though.',
          reviewDate: '2024-01-15',
          propertyThumbnail: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300',
          propertyCategory: 'Apartment',
          propertyLocation: 'New York, NY',
          helpful: 0,
          reply: {
            text: 'Thank you for your feedback, Emily. We are looking into soundproofing solutions for street-facing units.',
            date: '2024-01-16',
            userName: 'John Doe'
          }
        },
        {
          _id: '4',
          reviewerName: 'Alex Rodriguez',
          reviewerEmail: 'alex@example.com',
          propertyId: '3',
          propertyName: 'Cozy Beach House',
          rating: 5,
          reviewText: 'Perfect beach getaway! The house was clean, well-maintained, and steps away from the beach. Will definitely return!',
          reviewDate: '2024-01-12',
          propertyThumbnail: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=300',
          propertyCategory: 'Beach House',
          propertyLocation: 'Malibu, CA',
          helpful: 2,
          reply: null
        },
        {
          _id: '5',
          reviewerName: 'Jessica Brown',
          reviewerEmail: 'jessica@example.com',
          propertyId: '2',
          propertyName: 'Luxury Villa with Pool',
          rating: 2,
          reviewText: 'Disappointed with the maintenance. Pool was not clean and some appliances were not working properly.',
          reviewDate: '2024-01-10',
          propertyThumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300',
          propertyCategory: 'Villa',
          propertyLocation: 'Miami, FL',
          helpful: 0,
          reply: {
            text: 'We apologize for the maintenance issues. We have addressed these problems and would love to offer you a discount on your next stay.',
            date: '2024-01-11',
            userName: 'John Doe'
          }
        }
      ].filter(rating => {
        // Filter ratings for properties owned by the logged-in user
        const userProperties = ['1', '2', '3']; // Replace with actual user's property IDs
        return userProperties.includes(rating.propertyId);
      });

      setRatings(mockRatings);
    } catch (error) {
      console.error('Failed to fetch ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">
          {rating}.0
        </span>
      </div>
    );
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600 bg-green-50 border-green-200';
    if (rating >= 3) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const filteredRatings = ratings.filter(rating => {
    if (filter === 'positive') return rating.rating >= 4;
    if (filter === 'negative') return rating.rating <= 2;
    return true;
  });

  const stats = {
    total: ratings.length,
    average: ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length || 0,
    positive: ratings.filter(r => r.rating >= 4).length,
    negative: ratings.filter(r => r.rating <= 2).length
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Ratings & Reviews
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Manage and respond to reviews for your properties
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" data-aos="fade-up">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-indigo-600">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Reviews</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.average.toFixed(1)}</div>
            <div className="text-sm text-gray-500">Average Rating</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.positive}</div>
            <div className="text-sm text-gray-500">Positive Reviews</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.negative}</div>
            <div className="text-sm text-gray-500">Needs Attention</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6" data-aos="fade-up">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Reviews ({ratings.length})
          </button>
          <button
            onClick={() => setFilter('positive')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'positive'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Positive ({stats.positive})
          </button>
          <button
            onClick={() => setFilter('negative')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'negative'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Needs Attention ({stats.negative})
          </button>
        </div>

        {/* Ratings List */}
        {filteredRatings.length === 0 ? (
          <div className="text-center py-12" data-aos="fade-up">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Reviews Found
              </h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? "You haven't received any reviews yet."
                  : `No ${filter} reviews found.`
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRatings.map((rating, index) => (
              <div
                key={rating._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Property Thumbnail */}
                    <div className="flex-shrink-0">
                      <Link to={`/property/${rating.propertyId}`}>
                        <img
                          src={rating.propertyThumbnail}
                          alt={rating.propertyName}
                          className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
                        />
                      </Link>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                        <div>
                          <Link 
                            to={`/property/${rating.propertyId}`}
                            className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                          >
                            {rating.propertyName}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            {rating.propertyCategory} • {rating.propertyLocation}
                          </p>
                        </div>
                        <div className={`mt-2 sm:mt-0 px-3 py-1 rounded-full border ${getRatingColor(rating.rating)}`}>
                          {renderStars(rating.rating)}
                        </div>
                      </div>

                      {/* Reviewer Info */}
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-semibold text-sm">
                            {rating.reviewerName.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {rating.reviewerName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(rating.reviewDate)}
                          </p>
                        </div>
                      </div>

                      {/* Review Text */}
                      <div className="mb-4">
                        <p className="text-gray-700 leading-relaxed">
                          {rating.reviewText}
                        </p>
                      </div>

                      {/* Helpful Count */}
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {rating.helpful} people found this helpful
                      </div>

                      {/* Reply Section */}
                      {rating.reply ? (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-green-600 font-semibold text-xs">
                                You
                              </span>
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-medium text-gray-900">
                                Your Response
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(rating.reply.date)}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm">
                            {rating.reply.text}
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                            Reply to Review
                          </button>
                          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                            Report Review
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {ratings.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500" data-aos="fade-up">
            Showing {filteredRatings.length} of {ratings.length} reviews
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRatings;