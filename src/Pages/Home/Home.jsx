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
import HomeNestCarousel from './HomeNestCarousel';
import WhyChoseUs from './WhyChoseUs';
import ReviewsSection from './ReviewsSection';

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
    <HomeNestCarousel></HomeNestCarousel>

      {/* Latest Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          

          <LatestProperties latestPropertiesPromise={latestPropertiesPromise}></LatestProperties>
        </div>
      </section>

      {/* Why Choose Us Section */}
     <WhyChoseUs></WhyChoseUs>



      {/* Extra Section 2: Testimonials */}
      <ReviewsSection></ReviewsSection>
    </div>
  );
};

export default Home;