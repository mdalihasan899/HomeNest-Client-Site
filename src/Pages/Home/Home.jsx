import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';

// React Icons alternative (if you choose this option)
import { 
  FaShieldAlt, 
  FaMapMarkerAlt, 
  FaDollarSign,
  FaStar,
  FaCheck,
  FaBed,
  FaBath,
  FaRulerCombined
} from 'react-icons/fa';
import LatestProperties from '../../Components/LatestProperties/LatestProperties';

const latestPropertiesPromise = fetch('http://localhost:3000/latest-properties').then(res => res.json())

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Mock data - replace with actual API call
    const mockProperties = [
      {
        id: 1,
        title: "Modern Downtown Apartment",
        type: "Apartment",
        price: "$350,000",
        location: "Downtown, New York",
        bedrooms: 2,
        bathrooms: 2,
        area: "1200 sq ft",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
        featured: true
      },
      {
        id: 2,
        title: "Luxury Villa with Pool",
        type: "Villa",
        price: "$1,200,000",
        location: "Beverly Hills, CA",
        bedrooms: 5,
        bathrooms: 4,
        area: "3500 sq ft",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500",
        featured: true
      },
      {
        id: 3,
        title: "Cozy Family House",
        type: "House",
        price: "$550,000",
        location: "Suburban, Chicago",
        bedrooms: 3,
        bathrooms: 2,
        area: "1800 sq ft",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500",
        featured: true
      },
      {
        id: 4,
        title: "Waterfront Condo",
        type: "Condo",
        price: "$750,000",
        location: "Miami Beach, FL",
        bedrooms: 3,
        bathrooms: 3,
        area: "1600 sq ft",
        image: "https://images.unsplash.com/photo-1540518614846-7eded1027f2b?w=500",
        featured: true
      }
    ];

    setFeaturedProperties(mockProperties);
  }, []);

  const sliderData = [
    {
      id: 1,
      title: "Find Your Dream Home",
      description: "Discover the perfect property that matches your lifestyle and budget",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
      buttonText: "Browse Properties",
      buttonLink: "/properties"
    },
    {
      id: 2,
      title: "Sell Your Property with Confidence",
      description: "Get the best value for your property with our expert real estate services",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200",
      buttonText: "List Your Property",
      buttonLink: "/list-property"
    },
    {
      id: 3,
      title: "Rent Your Ideal Space",
      description: "Find rental properties in prime locations with flexible terms",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200",
      buttonText: "View Rentals",
      buttonLink: "/rentals"
    }
  ];

  const whyChooseUs = [
    {
      icon: FaShieldAlt,
      title: "Trusted Platform",
      description: "Verified listings and secure transactions for peace of mind"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Prime Locations",
      description: "Properties in the most sought-after neighborhoods and areas"
    },
    {
      icon: FaDollarSign,
      title: "Best Value",
      description: "Competitive prices and transparent pricing with no hidden fees"
    },
    {
      icon: FaStar,
      title: "Expert Support",
      description: "Professional real estate agents and customer support team"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[70vh]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="h-full"
        >
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div 
                className="relative h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="text-center text-white px-4">
                    <h1 
                      className="text-4xl md:text-6xl font-bold mb-4"
                      data-aos="fade-up"
                    >
                      {slide.title}
                    </h1>
                    <p 
                      className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      {slide.description}
                    </p>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Latest Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              data-aos="fade-up"
            >
              Latest Properties
            </h2>
            <p 
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Discover our handpicked selection of premium properties
            </p>
          </div>

          <LatestProperties latestPropertiesPromise={latestPropertiesPromise}></LatestProperties>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              data-aos="fade-up"
            >
              Why Choose HomeNest?
            </h2>
            <p 
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Experience the difference with our premium real estate services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Extra Section 2: Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              data-aos="fade-up"
            >
              What Our Clients Say
            </h2>
            <p 
              className="text-gray-600 text-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Real experiences from satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                role: "Property Buyer",
                content: "HomeNest made finding our dream home so easy! The platform is user-friendly and the support team was incredibly helpful.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Property Seller",
                content: "Sold my apartment in record time with HomeNest. Their marketing and professional services are top-notch.",
                rating: 5
              },
              {
                name: "Emily Davis",
                role: "Renter",
                content: "Found the perfect rental through HomeNest. The verification process gave me confidence in my choice.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <FaCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;