// WhyChoseUs.jsx
import React from 'react';
import { 
  TbShieldCheck, 
  TbAward, 
  TbTrendingUp, 
  TbUsers,
  TbHomeHeart,
  TbClock
} from "react-icons/tb";
import { 
  FaHandHoldingUsd, 
  FaHeadset, 
  FaChartLine,
  FaGlobeAmericas
} from "react-icons/fa";

const WhyChoseUs = () => {
  const features = [
    {
      icon: <TbShieldCheck className="w-8 h-8" />,
      title: "Trust & Security",
      description: "Your transactions are protected with bank-level security and verified listings",
      stats: "99.9% Secure",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <TbAward className="w-8 h-8" />,
      title: "Award Winning Service",
      description: "Recognized as the best real estate platform for customer satisfaction",
      stats: "5-Star Rated",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaHandHoldingUsd className="w-8 h-8" />,
      title: "Best Price Guarantee",
      description: "We ensure you get the best market price with our price match policy",
      stats: "Save 15% Avg.",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      icon: <TbTrendingUp className="w-8 h-8" />,
      title: "Market Insights",
      description: "Get real-time market data and analytics to make informed decisions",
      stats: "Real-time Data",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <TbUsers className="w-8 h-8" />,
      title: "Expert Team",
      description: "Our certified agents have years of experience in real estate",
      stats: "500+ Experts",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      icon: <TbHomeHeart className="w-8 h-8" />,
      title: "Personalized Service",
      description: "Customized property recommendations based on your preferences",
      stats: "98% Match Rate",
      gradient: "from-blue-400 to-purple-400"
    }
  ];

  const stats = [
    {
      number: "50K+",
      label: "Properties Listed",
      icon: <TbHomeHeart className="w-6 h-6" />
    },
    {
      number: "25K+",
      label: "Happy Customers",
      icon: <TbUsers className="w-6 h-6" />
    },
    {
      number: "150+",
      label: "Cities Covered",
      icon: <FaGlobeAmericas className="w-6 h-6" />
    },
    {
      number: "98%",
      label: "Success Rate",
      icon: <FaChartLine className="w-6 h-6" />
    }
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <TbAward className="w-5 h-5" />
            <span>Why HomeNest Stands Out</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Why Choose HomeNest?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our customer-centric approach, cutting-edge technology, 
            and unwavering commitment to helping you find your perfect home.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
              
              {/* Icon Container */}
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Stats Badge */}
              <div className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {feature.stats}
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Dream Home?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect home with HomeNest
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Browse Properties
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Contact Agent
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {/* Placeholder for company logos */}
            {["TechCorp", "BuildWell", "UrbanSpace", "EliteHomes", "PrimeRealty"].map((company, index) => (
              <div key={index} className="text-gray-400 font-bold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoseUs;