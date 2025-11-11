// components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { auth } from '../../Firebase/firebase.config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { FaUser, FaHome, FaBuilding, FaPlus, FaStar, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  // Track user login/logout with better state handling
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Force refresh to get latest user data
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
        toast.success('Sign Out successful!');
        setUser(null); // Immediately clear user state
        navigate('/login');
        setIsDropdownOpen(false);
      })
      .catch((error) => {
        toast.error(error.message || 'Something went wrong!');
      });
  };

  // Improved function to handle user avatar
  const getUserAvatar = () => {
    // Check if user has a valid photoURL
    if (user?.photoURL && user.photoURL.trim() !== '') {
      return (
        <img
          src={user.photoURL}
          alt={user?.displayName || 'User'}
          className="w-8 h-8 rounded-full border-2 border-blue-500 object-cover"
          onError={(e) => {
            // If image fails to load, show fallback
            console.log('Image failed to load, showing fallback');
            e.target.style.display = 'none';
            // You might want to set a state to track image load errors
          }}
        />
      );
    }
    
    // Fallback: Show user initial or default icon
    return (
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-blue-500">
        {user?.displayName ? (
          user.displayName.charAt(0).toUpperCase()
        ) : (
          <FaUser className="w-4 h-4" />
        )}
      </div>
    );
  };

  // Debug: Log user data to check what's available
  useEffect(() => {
    if (user) {
      console.log('Navbar User Data:', {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email
      });
    }
  }, [user]);

  if (loading) {
    return (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold text-blue-600">PropertyHub</div>
            <div className="animate-pulse bg-gray-200 rounded-full w-8 h-8"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" data-aos="fade-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 text-xl font-bold text-blue-600 flex items-center"
              data-aos="fade-right"
            >
              <FaHome className="mr-2" />
              HomeNest
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              <FaHome className="mr-1 w-4 h-4" />
              Home
            </Link>

            <Link
              to="/properties"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <FaBuilding className="mr-1 w-4 h-4" />
              All Properties
            </Link>

            <Link
              to={user ? "/add-properties" : "/login"}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
              data-aos="fade-down"
              data-aos-delay="300"
            >
              <FaPlus className="mr-1 w-4 h-4" />
              Add Properties
            </Link>

            {/* Protected Routes - Only show when logged in */}
            {user && (
              <>
                <Link
                  to="/my-properties"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  data-aos="fade-down"
                  data-aos-delay="400"
                >
                  <FaBuilding className="mr-1 w-4 h-4" />
                  My Properties
                </Link>

                <Link
                  to="/my-ratings"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  data-aos="fade-down"
                  data-aos-delay="500"
                >
                  <FaStar className="mr-1 w-4 h-4" />
                  My Ratings
                </Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 transform hover:scale-105"
                    data-aos="fade-left"
                    data-aos-delay="300"
                  >
                    Login
                  </button>
                </Link>

                <Link to="/signUp">
                  <button
                    className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 transform hover:scale-105"
                    data-aos="fade-left"
                    data-aos-delay="400"
                  >
                    Signup
                  </button>
                </Link>
              </>
            ) : (
              /* User Dropdown - Only show when user is logged in */
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none hover:bg-gray-100 rounded-full p-1 transition duration-200"
                  data-aos="fade-left"
                >
                  {getUserAvatar()}
                  
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200"
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
                          <p className="text-sm text-gray-500 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Log Out Button */}
                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition duration-150"
                      >
                        <FaSignOutAlt className="mr-3 w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rest of your mobile menu code remains the same */}
      {/* ... */}
    </nav>
  );
};

export default Navbar;