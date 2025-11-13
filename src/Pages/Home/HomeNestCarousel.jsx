import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaHome, FaBuilding, FaCity, FaHotel, FaHouseUser, FaStar, FaFire } from 'react-icons/fa';

const HomeNestCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const slides = [
    {
      id: 2,
      title: "Luxury Villas",
      description: "Spacious villas with private gardens and premium finishes",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <FaHome className="text-green-500" />,
      features: ["Private Garden", "Parking", "Smart Home"],
      rating: 4.9
    },
    {
      id: 3,
      title: "Urban Studios",
      description: "Compact and efficient living spaces in the heart of the city",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <FaCity className="text-purple-500" />,
      features: ["City Center", "Fully Furnished", "High-Speed Internet"],
      rating: 4.6
    },
    {
      id: 4,
      title: "Premium Condos",
      description: "Elegant condominiums with resort-style amenities",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <FaHotel className="text-red-500" />,
      features: ["Concierge", "Spa", "Business Center"],
      rating: 4.7
    },
    {
      id: 5,
      title: "Family Homes",
      description: "Perfect homes for growing families in safe neighborhoods",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <FaHouseUser className="text-orange-500" />,
      features: ["Schools Nearby", "Playground", "Community Park"],
      rating: 4.9
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  return (
    <section className={`relative bg-gradient-to-br ${darkMode ? 'bg-gray-900 text-white' : 'from-slate-50 via-blue-50 to-purple-50 text-gray-900'} py-8 px-4`}>
      <div className="max-w-7xl mx-auto">

        

        {/* Carousel Container */}
        <div
          className={`relative text-black overflow-hidden rounded-3xl shadow-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${darkMode ? 'from-black/40 to-transparent' : 'from-black/20 to-transparent'}`}></div>

                    {/* Rating Badge */}
                    <div className={`absolute top-6 left-6 ${darkMode ? 'bg-gray-700/90 text-white' : 'bg-white/90 text-gray-900'} backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2`}>
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">{slide.rating}</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`flex flex-col justify-center p-8 lg:p-12 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl">
                        {slide.icon}
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent py-4">
                        {slide.title}
                      </h3>
                    </div>

                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>
                      {slide.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Key Features</h4>
                      <div className="flex flex-wrap gap-3">
                        {slide.features.map((feature, index) => (
                          <span
                            key={index}
                            className={`${darkMode ? 'bg-blue-900/30 text-blue-300 border border-blue-700' : 'bg-blue-50 text-blue-700'} px-4 py-2 rounded-full text-sm font-medium`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-fit">
                      Explore Property
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'bg-gray-700/90 hover:bg-gray-600 text-white' : 'bg-white/90 hover:bg-white text-gray-900'} backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'bg-gray-700/90 hover:bg-gray-600 text-white' : 'bg-white/90 hover:bg-white text-gray-900'} backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
          >
            <FaChevronRight />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? `${darkMode ? 'bg-blue-400' : 'bg-white'} scale-125`
                    : `${darkMode ? 'bg-gray-500 hover:bg-gray-400' : 'bg-white/50 hover:bg-white/80'}`
                  }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className={`absolute top-6 right-6 ${darkMode ? 'bg-gray-700/90' : 'bg-black/50'} backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium`}>
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeNestCarousel;