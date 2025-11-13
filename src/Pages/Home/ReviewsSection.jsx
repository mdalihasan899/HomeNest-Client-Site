// ReviewsSection.jsx
import React, { useState } from 'react';
import { 
  TbStar, 
  TbStarFilled, 
  TbChevronLeft, 
  TbChevronRight,
  TbQuote,
  TbThumbUp,
  TbCalendar
} from "react-icons/tb";
import { 
  FaUserCircle,
  FaCheckCircle,
  FaGoogle,
  FaFacebook,
  FaTwitter
} from "react-icons/fa";

const ReviewsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "First-time Home Buyer",
      avatar: <FaUserCircle className="w-12 h-12" />,
      rating: 5,
      comment: "HomeNest made our dream of owning a home come true! The team was incredibly supportive throughout the entire process. Their market insights helped us get the perfect property at the right price.",
      date: "2 weeks ago",
      verified: true,
      source: "Google",
      sourceIcon: <FaGoogle className="text-blue-500" />,
      likes: 24,
      property: "3BHK Apartment in Downtown"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Real Estate Investor",
      avatar: <FaUserCircle className="w-12 h-12" />,
      rating: 5,
      comment: "As an investor, I appreciate the data-driven approach and transparency. The analytics provided helped me make informed decisions. Exceptional service!",
      date: "1 month ago",
      verified: true,
      source: "Facebook",
      sourceIcon: <FaFacebook className="text-blue-600" />,
      likes: 18,
      property: "Luxury Villa - Green Valley"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Family Relocating",
      avatar: <FaUserCircle className="w-12 h-12" />,
      rating: 4,
      comment: "Moving cities was stressful, but HomeNest's relocation specialists made it seamless. They understood our family's needs and found us the perfect neighborhood.",
      date: "3 weeks ago",
      verified: true,
      source: "Twitter",
      sourceIcon: <FaTwitter className="text-blue-400" />,
      likes: 31,
      property: "4BHK Family Home"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Property Seller",
      avatar: <FaUserCircle className="w-12 h-12" />,
      rating: 5,
      comment: "Sold my property 15% above market price! The marketing strategy and professional photography really made a difference. Highly recommended!",
      date: "2 months ago",
      verified: true,
      source: "Google",
      sourceIcon: <FaGoogle className="text-blue-500" />,
      likes: 42,
      property: "Penthouse - City Center"
    },
    {
      id: 5,
      name: "Priya Sharma",
      role: "Rental Client",
      avatar: <FaUserCircle className="w-12 h-12" />,
      rating: 5,
      comment: "Found my ideal rental apartment within 3 days! The virtual tour feature saved me so much time. The team was responsive and professional.",
      date: "1 week ago",
      verified: true,
      source: "Facebook",
      sourceIcon: <FaFacebook className="text-blue-600" />,
      likes: 15,
      property: "2BHK Executive Rental"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Commercial Investor",
      avatar: <FaUserCircle className="w-12 h-12" />,
      rating: 4,
      comment: "Impressed with the commercial property portfolio. The investment analysis reports were detailed and accurate. Great platform for serious investors.",
      date: "2 weeks ago",
      verified: true,
      source: "Direct",
      sourceIcon: <FaCheckCircle className="text-green-500" />,
      likes: 27,
      property: "Office Space - Business District"
    }
  ];

  const stats = {
    averageRating: 4.8,
    totalReviews: 1250,
    recommended: 98,
    responseRate: 99
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === Math.ceil(reviews.length / 2) - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.ceil(reviews.length / 2) - 1 : prev - 1));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      index < rating ? 
        <TbStarFilled key={index} className="w-5 h-5 text-yellow-400 fill-current" /> :
        <TbStar key={index} className="w-5 h-5 text-gray-300" />
    ));
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <TbThumbUp className="w-5 h-5" />
            <span>Customer Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            What Our Clients Say
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Don't just take our word for it. Here's what thousands of satisfied customers 
            have to say about their HomeNest experience.
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stats.averageRating}
              </div>
              <div className="flex justify-center gap-1 my-2">
                {renderStars(stats.averageRating)}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stats.totalReviews}+
              </div>
              <div className="text-sm text-gray-600 mt-2">Total Reviews</div>
            </div>
            
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stats.recommended}%
              </div>
              <div className="text-sm text-gray-600 mt-2">Recommended</div>
            </div>
            
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stats.responseRate}%
              </div>
              <div className="text-sm text-gray-600 mt-2">Response Rate</div>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative mb-16">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(reviews.length / 2) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
                    {reviews.slice(slideIndex * 2, slideIndex * 2 + 2).map((review) => (
                      <div
                        key={review.id}
                        className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200"
                      >
                        {/* Quote Icon */}
                        <div className="absolute top-6 right-6 opacity-10">
                          <TbQuote className="w-16 h-16 text-blue-500" />
                        </div>

                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className="text-blue-400">
                            {review.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 text-lg">{review.name}</h3>
                              {review.verified && (
                                <FaCheckCircle className="text-green-500 w-4 h-4" />
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{review.role}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                {review.sourceIcon}
                                <span>{review.source}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TbCalendar className="w-4 h-4" />
                                <span>{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex gap-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            {review.rating}.0 rating
                          </span>
                        </div>

                        {/* Property */}
                        <div className="bg-blue-50 rounded-xl p-3 mb-4">
                          <p className="text-sm font-medium text-blue-800">
                            {review.property}
                          </p>
                        </div>

                        {/* Comment */}
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {review.comment}
                        </p>

                        {/* Footer */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                            <TbThumbUp className="w-5 h-5" />
                            <span className="text-sm font-medium">{review.likes}</span>
                          </button>
                          <div className="text-xs text-gray-500">
                            Verified Purchase
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 -ml-6"
          >
            <TbChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 -mr-6"
          >
            <TbChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(reviews.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default ReviewsSection;