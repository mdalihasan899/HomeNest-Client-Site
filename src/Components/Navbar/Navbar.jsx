// components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { auth } from '../../Firebase/firebase.config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import {
  TbHome,
  TbBuilding,
  TbPlus,
  TbStar,
  TbUser,
  TbLogout,
  TbChevronDown,
  TbMenu2,
  TbX
} from "react-icons/tb";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  // Track user login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          await currentUser.reload();
          const updatedUser = auth.currentUser;
          setUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
            emailVerified: updatedUser.emailVerified,
          });
        } catch (error) {
          console.error('Error refreshing user:', error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success('Signed out successfully!');
        setUser(null);
        navigate('/login');
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      })
      .catch((error) => {
        toast.error(error.message || 'Something went wrong!');
      });
  };

  // Check if route is active
  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Get user avatar
  const getUserAvatar = () => {
    if (user?.photoURL && user.photoURL.trim() !== '') {
      return (
        <img
          src={user.photoURL}
          alt={user?.displayName || 'User'}
          className="w-10 h-10 rounded-full border-2 border-blue-400 object-cover shadow-lg"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      );
    }

    return (
      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-blue-400 shadow-lg">
        {user?.displayName ? (
          user.displayName.charAt(0).toUpperCase()
        ) : (
          <TbUser className="w-5 h-5" />
        )}
      </div>
    );
  };

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'All Properties' },
    { path: user ? '/add-properties' : '/login', label: 'Add Properties' },
    ...(user ? [
      { path: '/my-properties', label: 'My Properties' },
      { path: '/my-ratings', label: 'My Ratings' }
    ] : [])
  ];

  if (loading) {
    return (
      <nav className="bg-white/65 backdrop-blur-md shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HomeNest
            </div>
            <div className="animate-pulse bg-gray-200 rounded-full w-10 h-10"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-white/65
      backdrop-blur-md shadow-xl sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className='flex items-center cursor-pointer'>
              <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-1">
              <TbHome className="w-8 h-8 text-white" />
            </div>
            <Link
              to="/"
              className="flex-shrink-0 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent  transition-transform duration-300"
              data-aos="fade-right"
            >
              HomeNest
            </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${isActiveRoute(item.path)
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  data-aos="fade-down"
                  data-aos-delay={100 * (index + 1)}
                >
                  {item.label}
                  {isActiveRoute(item.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-white rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {!user ? (
                <>
                  <Link to="/login">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      data-aos="fade-left"
                      data-aos-delay="300"
                    >
                      Login
                    </button>
                  </Link>

                  <Link to="/signUp">
                    <button
                      className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105"
                      data-aos="fade-left"
                      data-aos-delay="400"
                    >
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                /* User Dropdown */
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 focus:outline-none hover:scale-105 transition-transform duration-300 rounded-2xl px-4 py-2"
                    data-aos="fade-left"
                  >
                    {getUserAvatar()}
                  </button>

                  

                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl py-3 z-50 border border-gray-200 backdrop-blur-md"
                      data-aos="fade-down"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          {getUserAvatar()}
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {user?.displayName || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>



                      {/* Log Out */}
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <TbLogout className="mr-3 w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden bg-gray-100 hover:bg-gray-200 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <TbX className="w-6 h-6 text-gray-700" />
                ) : (
                  <TbMenu2 className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-2xl">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${isActiveRoute(item.path)
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {user && (
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <TbLogout className="mr-3 w-5 h-5" />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;