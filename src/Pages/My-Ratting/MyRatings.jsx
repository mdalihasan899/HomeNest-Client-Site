// components/MyRatings.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  TbStar,
  TbStarFilled,
  TbMessage,
  TbThumbUp,
  TbFlag,
  TbCalendar,
  TbMapPin,
  TbBuilding,
  TbUser
} from "react-icons/tb";

const MyRatings = ({ user }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      easing: 'ease-in-out',
      once: true 
    });
    fetchMyRatings();
  }, []);

  const fetchMyRatings = async () => {
    try {
      // Mock data with mixed Bangla and English reviews
      const mockRatings = [
        {
          _id: '1',
          reviewerName: 'Anika Islam',
          reviewerEmail: 'anika@example.com',
          propertyId: '1',
          propertyName: 'Modern Apartment, Bashundhara',
          rating: 5,
          reviewText: 'The apartment is very beautiful and clean. Location is perfect, market and hospital are very close. Security system is also good.',
          reviewDate: '2024-01-20',
          propertyThumbnail: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300',
          propertyCategory: 'Apartment',
          propertyLocation: 'Bashundhara, Dhaka',
          helpful: 3,
          reply: {
            text: 'Thank you Anika for your wonderful review. We are happy that you liked our property.',
            date: '2024-01-21',
            userName: 'Jahid Hasan'
          }
        },
        {
          _id: '2',
          reviewerName: 'Rakib Hasan',
          reviewerEmail: 'rakib@example.com',
          propertyId: '2',
          propertyName: 'Luxury Villa, Gulshan',
          rating: 4,
          reviewText: 'ভিলাটি খুবই সুন্দর, সুইমিং পুল এবং গার্ডেন অত্যন্ত মনোরম। শুধু কিচেনের কিছু যন্ত্রপাতি আপডেট করার প্রয়োজন আছে।', // Bangla
          reviewDate: '2024-01-18',
          propertyThumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300',
          propertyCategory: 'Villa',
          propertyLocation: 'Gulshan, Dhaka',
          helpful: 1,
          reply: null
        },
        {
          _id: '3',
          reviewerName: 'Sumaiya Akter',
          reviewerEmail: 'sumaiya@example.com',
          propertyId: '1',
          propertyName: 'Modern Apartment, Bashundhara',
          rating: 3,
          reviewText: 'Apartment is good but street noise is a bit high at night. However, good value for money compared to the price.',
          reviewDate: '2024-01-15',
          propertyThumbnail: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300',
          propertyCategory: 'Apartment',
          propertyLocation: 'Bashundhara, Dhaka',
          helpful: 0,
          reply: {
            text: 'Thank you for your feedback Sumaiya. We are working on soundproofing solutions for street-facing units.',
            date: '2024-01-16',
            userName: 'Jahid Hasan'
          }
        },
        {
          _id: '4',
          reviewerName: 'Tanvir Ahmed',
          reviewerEmail: 'tanvir@example.com',
          propertyId: '3',
          propertyName: 'Coxs Bazar Beach House',
          rating: 5,
          reviewText: 'সমুদ্রের পাশের হাউসটি অসাধারণ! খুবই পরিষ্কার এবং সুন্দরভাবে মেইনটেইনড। সমুদ্র থেকে মাত্র কয়েক পা দূরে। অবশ্যই আবার আসব!', // Bangla
          reviewDate: '2024-01-12',
          propertyThumbnail: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=300',
          propertyCategory: 'Beach House',
          propertyLocation: 'Coxs Bazar',
          helpful: 2,
          reply: null
        },
        {
          _id: '5',
          reviewerName: 'Nusrat Jahan',
          reviewerEmail: 'nusrat@example.com',
          propertyId: '2',
          propertyName: 'Luxury Villa, Gulshan',
          rating: 2,
          reviewText: 'Very disappointed with maintenance. Swimming pool was not clean and some electronic appliances were not working properly.',
          reviewDate: '2024-01-10',
          propertyThumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300',
          propertyCategory: 'Villa',
          propertyLocation: 'Gulshan, Dhaka',
          helpful: 0,
          reply: {
            text: 'We sincerely apologize for the maintenance issues. We have addressed these problems and would love to offer you a discount on your next stay.',
            date: '2024-01-11',
            userName: 'Jahid Hasan'
          }
        },
        {
          _id: '6',
          reviewerName: 'Farhan Ali',
          reviewerEmail: 'farhan@example.com',
          propertyId: '4',
          propertyName: 'Commercial Space, Motijheel',
          rating: 4,
          reviewText: 'অফিস স্পেসটি খুবই প্রফেশনাল এবং ভালো লোকেশনে। এমিনিটিজ ভালো, শুধু পার্কিং স্পেস একটু বেশি প্রয়োজন।', // Bangla
          reviewDate: '2024-01-08',
          propertyThumbnail: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300',
          propertyCategory: 'Commercial',
          propertyLocation: 'Motijheel, Dhaka',
          helpful: 1,
          reply: null
        },
        {
          _id: '7',
          reviewerName: 'Maria Khan',
          reviewerEmail: 'maria@example.com',
          propertyId: '5',
          propertyName: 'Family Home, Dhanmondi',
          rating: 5,
          reviewText: 'Perfect for families! The neighborhood is peaceful and all necessary amenities are within walking distance. Highly recommended!',
          reviewDate: '2024-01-05',
          propertyThumbnail: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300',
          propertyCategory: 'House',
          propertyLocation: 'Dhanmondi, Dhaka',
          helpful: 4,
          reply: {
            text: 'Thank you Maria! We are delighted to hear that your family enjoyed staying at our property.',
            date: '2024-01-06',
            userName: 'Jahid Hasan'
          }
        },
        {
          _id: '8',
          reviewerName: 'Imran Hossain',
          reviewerEmail: 'imran@example.com',
          propertyId: '6',
          propertyName: 'Studio Apartment, Uttara',
          rating: 3,
          reviewText: 'স্টুডিওটি কমপ্যাক্ট এবং ফাংশনাল, কিন্তু কিচেনের স্পেস একটু ছোট। লোকেশন একদম ভালো, অফিস এবং শপিং মলের খুব কাছেই।', // Bangla
          reviewDate: '2024-01-03',
          propertyThumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300',
          propertyCategory: 'Studio',
          propertyLocation: 'Uttara, Dhaka',
          helpful: 2,
          reply: null
        }
      ].filter(rating => {
        const userProperties = ['1', '2', '3', '4', '5', '6'];
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
    return Array.from({ length: 5 }, (_, index) => (
      index < rating ? 
        <TbStarFilled key={index} className="w-5 h-5 text-yellow-400 fill-current" /> :
        <TbStar key={index} className="w-5 h-5 text-gray-300" />
    ));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600 bg-green-50 border-green-200';
    if (rating >= 3) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getRatingText = (rating) => {
    if (rating >= 4) return 'Excellent';
    if (rating >= 3) return 'Good';
    return 'Needs Improvement';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading your reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <TbStar className="w-5 h-5" />
            <span>Customer Reviews</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Ratings & Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage and respond to reviews for your properties
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-aos="fade-up">
          {[
            { number: stats.total, label: 'Total Reviews', color: 'from-blue-500 to-cyan-500' },
            { number: stats.average.toFixed(1), label: 'Average Rating', color: 'from-green-500 to-emerald-500' },
            { number: stats.positive, label: 'Positive Reviews', color: 'from-green-500 to-lime-500' },
            { number: stats.negative, label: 'Needs Attention', color: 'from-red-500 to-orange-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8" data-aos="fade-up">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TbStar className="w-5 h-5" />
              All Reviews ({ratings.length})
            </button>
            <button
              onClick={() => setFilter('positive')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === 'positive'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TbStarFilled className="w-5 h-5" />
              Positive ({stats.positive})
            </button>
            <button
              onClick={() => setFilter('negative')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === 'negative'
                  ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TbStar className="w-5 h-5" />
              Needs Attention ({stats.negative})
            </button>
          </div>
        </div>

        {/* Ratings List */}
        {filteredRatings.length === 0 ? (
          <div className="text-center py-16" data-aos="fade-up">
            <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-auto border border-gray-100">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TbStar className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Reviews Found
              </h3>
              <p className="text-gray-600 mb-6">
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
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Property Thumbnail */}
                    <div className="flex-shrink-0">
                      <Link to={`/property/${rating.propertyId}`}>
                        <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                          <img
                            src={rating.propertyThumbnail}
                            alt={rating.propertyName}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
                        <div>
                          <Link 
                            to={`/property/${rating.propertyId}`}
                            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300"
                          >
                            {rating.propertyName}
                          </Link>
                          <div className="flex items-center gap-4 mt-2 text-gray-600">
                            <div className="flex items-center gap-1">
                              <TbBuilding className="w-4 h-4" />
                              <span className="text-sm">{rating.propertyCategory}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TbMapPin className="w-4 h-4" />
                              <span className="text-sm">{rating.propertyLocation}</span>
                            </div>
                          </div>
                        </div>
                        <div className={`mt-4 sm:mt-0 px-4 py-2 rounded-xl border ${getRatingColor(rating.rating)}`}>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {renderStars(rating.rating)}
                            </div>
                            <span className="text-sm font-semibold">
                              {rating.rating}.0 - {getRatingText(rating.rating)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Reviewer Info */}
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <TbUser className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="text-lg font-semibold text-gray-900">
                            {rating.reviewerName}
                          </p>
                          <div className="flex items-center gap-2 text-gray-500">
                            <TbCalendar className="w-4 h-4" />
                            <span className="text-sm">{formatDate(rating.reviewDate)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Review Text */}
                      <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 rounded-xl p-6 border border-gray-200">
                          "{rating.reviewText}"
                        </p>
                      </div>

                      {/* Helpful Count */}
                      <div className="flex items-center text-gray-500 mb-6">
                        <TbThumbUp className="w-5 h-5 mr-2" />
                        <span className="text-sm">{rating.helpful} people found this helpful</span>
                      </div>

                      {/* Reply Section */}
                      {rating.reply ? (
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                              <TbUser className="w-5 h-5 text-white" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-semibold text-gray-900">
                                Your Response
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(rating.reply.date)}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {rating.reply.text}
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-4">
                          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                            <TbMessage className="w-5 h-5" />
                            Reply to Review
                          </button>
                          <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                            <TbFlag className="w-5 h-5" />
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
          <div className="mt-12 text-center" data-aos="fade-up">
            <p className="text-gray-600">
              Showing {filteredRatings.length} of {ratings.length} reviews
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRatings;