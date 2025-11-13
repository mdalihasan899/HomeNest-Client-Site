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

const latestPropertiesPromise = fetch('https://book-management-server-psi.vercel.app/latest-properties').then(res => res.json())

const Home = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'from-gray-900 to-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* Carousel Section */}
      <HomeNestCarousel></HomeNestCarousel>

      {/* Latest Properties Section */}
      <section>
        <div className="container mx-auto">
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