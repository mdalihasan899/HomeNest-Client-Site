// Footer.jsx
import React from 'react';
import { 
  TbHome,
  TbPhone,
  TbMail,
  TbMapPin,
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandYoutube,
  TbArrowUp
} from "react-icons/tb";
import { 
  FaAppStore,
  FaGooglePlay,
  FaShieldAlt,
  FaAward,
  FaHeadset,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <TbHome className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  HomeNest
                </h2>
                <p className="text-blue-200 text-sm">Find Your Perfect Home</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Your trusted partner in finding the perfect property. We connect dreams with addresses 
              through innovative technology and personalized service.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <FaShieldAlt className="text-green-400" />
                <span className="text-sm font-medium">Secure Platform</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <FaAward className="text-yellow-400" />
                <span className="text-sm font-medium">Award Winning</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <FaHeadset className="text-blue-400" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-blue-200 mb-6">
              Get the latest property listings and market insights delivered to your inbox.
            </p>
            
            <div className="flex gap-3 mb-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
            
            <p className="text-sm text-gray-400">
              By subscribing, you agree to our Privacy Policy
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-blue-300">Quick Links</h4>
            <ul className="space-y-3">
              {['Browse Properties', 'Sell Property', 'Agents', 'Neighborhoods', 'Market Trends'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-blue-300">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Press', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-blue-300">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'FAQs', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-blue-300">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <TbMapPin className="w-5 h-5 text-blue-400" />
                <span>123 Business Ave, Suite 100<br />New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <TbPhone className="w-5 h-5 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <TbMail className="w-5 h-5 text-blue-400" />
                <span>hello@homenest.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-4 text-blue-300">Follow Us</h5>
              <div className="flex gap-3">
                {[
                  { icon: <TbBrandFacebook className="w-5 h-5" />, label: 'Facebook' },
                  { icon: <BsTwitterX className="w-4 h-4" />, label: 'Twitter' },
                  { icon: <TbBrandInstagram className="w-5 h-5" />, label: 'Instagram' },
                  { icon: <TbBrandLinkedin className="w-5 h-5" />, label: 'LinkedIn' },
                  { icon: <TbBrandYoutube className="w-5 h-5" />, label: 'YouTube' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* App Download */}
        <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl p-8 mb-12 border border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Get the HomeNest App</h3>
              <p className="text-blue-200">
                Browse properties on the go with our mobile app
              </p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/20">
                <FaAppStore className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/20">
                <FaGooglePlay className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} HomeNest. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            aria-label="Back to top"
          >
            <TbArrowUp className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Floating Support */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col gap-3">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 group">
            <TbPhone className="w-6 h-6 group-hover:animate-pulse" />
          </button>
          <button className="bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 group">
            <TbMail className="w-6 h-6 group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;