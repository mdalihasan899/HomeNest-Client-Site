import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import toast from 'react-hot-toast';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

const googleProvider = new GoogleAuthProvider();

const SignUp = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    }

    if (formData.password != formData.confirmPassword) {
      newErrors.confirmPassword = 'Password and Confirm Password not match!';
    }

    if (formData.photoURL && !isValidUrl(formData.photoURL)) {
      newErrors.photoURL = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
        toast.success("Sign up with Google successful");
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        toast.error(error.message || "Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleTogglePassShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  }
  const handleToggleConfirmPassShow = (event) => {
    event.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = formData.email;
    const password = formData.password;
    console.log(email, password);
    setIsLoading(true);

    if (validateForm()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          console.log('User created successfully:', result);

          // Update Firebase profile FIRST
          return updateProfile(auth.currentUser, {
            displayName: formData.name,
            photoURL: formData.photoURL || "",
          }).then(() => {
            console.log("Firebase profile updated!");

            // Build user object for server
            const newUser = {
              name: formData.name,
              email: formData.email,
              photoURL: formData.photoURL || "",
              uid: auth.currentUser.uid, // Add UID for reference
              createdAt: new Date().toISOString()
            };

            // Save to server
            return fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
            });
          });
        })
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Failed to save user on server');
          }
          return res.json();
        })
        .then((data) => {
          console.log('User saved on server:', data);
          toast.success("Registration successful");

          // Force refresh of auth state
          // This ensures the updated profile is immediately available
          setTimeout(() => {
            navigate('/');
          }, 1000);
        })
        .catch((error) => {
          console.error('Error:', error);
          if (error.code === 'auth/email-already-in-use') {
            setErrors(prev => ({ ...prev, email: 'Email is already in use' }));
          } else if (error.code === 'auth/weak-password') {
            setErrors(prev => ({ ...prev, password: 'Password is too weak' }));
          } else {
            setErrors(prev => ({ ...prev, general: error.message || 'Failed to create account. Please try again.' }));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4 text-black ">
      <div className="max-w-md w-full space-y-8">
        {/* Sign Up Card */}
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8" data-aos="fade-down" data-aos-delay="350">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">Join us today</p>
            </div>


            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    type="text"
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>
                )}
              </div>

              {/* Email Input */}
              <div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    type="email"
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className=' relative'>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    value={formData.password}
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Create a password"
                  />

                  <button
                    type="button"
                    onClick={handleTogglePassShow}
                    className="absolute right-3 top-13 transform -translate-y-1/2 text-[#1E293B] hover:text-[#42A5F5] transition-colors duration-200"
                  >
                    {showPassword ? <RiEyeLine size={20} /> : <RiEyeCloseLine size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className='relative'>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />

                <button
                  type="button"
                  onClick={handleToggleConfirmPassShow}
                  className="absolute right-3 top-13 transform -translate-y-1/2 text-[#1E293B] hover:text-[#42A5F5] transition-colors duration-200"
                >
                  {showConfirmPassword ? <RiEyeLine size={20} /> : <RiEyeCloseLine size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1 block">{errors.confirmPassword}</span>
              )}

              {/* Photo URL Field */}
              <div>
                <label htmlFor="photoURL" className="block text-sm font-medium text-[#1E293B] mb-2">
                  Photo URL (Optional)
                </label>
                <input
                  type="url"
                  id="photoURL"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${errors.photoURL
                    ? 'border-red-500 focus:ring-red-200 bg-[#FCE4EC]'
                    : 'border-gray-300 focus:border-[#42A5F5] focus:ring-[#42A5F5] focus:bg-[#F9FAFB]'
                    } bg-[#F9FAFB]`}
                  placeholder="https://example.com/photo.jpg"
                />
                {errors.photoURL && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.photoURL}</span>
                )}
              </div>


              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  Create Account
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
              </div>
            </div>

            {/* Google Sign Up Button */}
            <div>
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-gray-700 font-medium">Sign up with Google</span>
              </button>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;