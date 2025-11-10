// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router';
import { FaHome } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social media icons (using Heroicons or similar)
  const SocialIcon = ({ children, href, ariaLabel }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up">

          {/* Logo and Website Info */}
          <div className="lg:col-span-1" data-aos="fade-right" data-aos-delay="100">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-white">
                <FaHome className="mr-2" />
              </h2>
              <h2 className="text-2xl font-bold text-white">
                HomeNest
              </h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Find your dream property with ease. We connect you with the best real estate opportunities across the country.
            </p>
            <div className="flex space-x-3">
              <SocialIcon href="https://facebook.com" ariaLabel="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>

              <SocialIcon href="https://twitter.com" ariaLabel="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </SocialIcon>

              <SocialIcon href="https://instagram.com" ariaLabel="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.986.016 6.756.072 5.526.127 4.712.334 3.995.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.139C.334 4.856.127 5.67.072 6.9.016 8.13 0 8.54 0 12.017c0 3.476.016 3.886.072 5.117.055 1.23.262 2.043.558 2.76.306.789.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.717.296 1.53.503 2.76.558 1.23.056 1.64.072 5.117.072 3.476 0 3.886-.016 5.117-.072 1.23-.055 2.043-.262 2.76-.558.79-.306 1.459-.717 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.717.503-1.53.558-2.76.056-1.23.072-1.64.072-5.117 0-3.476-.016-3.886-.072-5.117-.055-1.23-.262-2.043-.558-2.76-.306-.79-.717-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.717-.296-1.53-.503-2.76-.558C15.87.016 15.46 0 12.017 0zm0 2.158c3.413 0 3.808.012 5.026.068 1.134.051 1.75.24 2.16.398.57.217.976.477 1.403.904.427.427.687.833.904 1.403.158.41.347 1.026.398 2.16.056 1.218.068 1.613.068 5.026 0 3.413-.012 3.808-.068 5.026-.051 1.134-.24 1.75-.398 2.16-.217.57-.477.976-.904 1.403-.427.427-.833.687-1.403.904-.41.158-1.026.347-2.16.398-1.218.056-1.613.068-5.026.068-3.413 0-3.808-.012-5.026-.068-1.134-.051-1.75-.24-2.16-.398-.57-.217-.976-.477-1.403-.904-.427-.427-.687-.833-.904-1.403-.158-.41-.347-1.026-.398-2.16-.056-1.218-.068-1.613-.068-5.026 0-3.413.012-3.808.068-5.026.051-1.134.24-1.75.398-2.16.217-.57.477-.976.904-1.403.427-.427.833-.687 1.403-.904.41-.158 1.026-.347 2.16-.398 1.218-.056 1.613-.068 5.026-.068z" />
                  <path d="M12.017 5.838a6.18 6.18 0 100 12.358 6.18 6.18 0 000-12.358zm0 10.177a3.997 3.997 0 110-7.994 3.997 3.997 0 010 7.994z" />
                  <circle cx="18.406" cy="5.595" r="1.439" />
                </svg>
              </SocialIcon>

              <SocialIcon href="https://linkedin.com" ariaLabel="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Contact Details */}
          <div data-aos="fade-right" data-aos-delay="200">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-300">
                  123 Property Street<br />
                  Real Estate City, RE 12345
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-300">info@propertyhub.com</p>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-left" data-aos-delay="300">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div data-aos="fade-left" data-aos-delay="400">
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;