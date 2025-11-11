import React, { useEffect, useState, } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Link, useNavigate } from 'react-router';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../../Firebase/firebase.config';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

const googleProvider = new GoogleAuthProvider();

const Login = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }, []);

    // Email and Password auth
    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Password must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = "Password must contain at least one lowercase letter";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            // setIsLoading(false);
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                toast.success("Login successful!");
                event.target.reset();
                navigate(location.state || '/');
            })
            .catch(error => {
                console.log(error);
                if (error.code === 'auth/user-not-found') {
                    setErrors(prev => ({ ...prev, email: 'No account found with this email' }));
                } else if (error.code === 'auth/wrong-password') {
                    setErrors(prev => ({ ...prev, password: 'Incorrect password' }));
                } else if (error.code === 'auth/invalid-credential') {
                    setErrors(prev => ({ ...prev, general: 'Invalid email or password' }));
                } else {
                    setErrors(prev => ({ ...prev, general: 'Failed to login. Please try again.' }));
                }
            })
            .finally(() => {
                // setIsLoading(false);
            });

    }

    // google Auth
    const handleGoogleSignIn = (event) => {
        event.preventDefault();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log(result);

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                };

                // creat users in the database
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after user save', data)
                    })

                toast.success("Login successful!");
                navigate(location.state || '/');
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message || "Something went wrong!");
            })
            .finally(() => {
                // setIsLoading(false);
            });
    };

    // Password toggle button
    const handleTogglePassShow = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/* Login Card */}
                <div
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-5" >
                            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-aos="fade-down" data-aos-delay="350">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600" data-aos="fade-down" data-aos-delay="300">Sign in to your account</p>
                        </div>



                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email Input */}
                            <div data-aos="fade-up" data-aos-delay="500">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={`block w-full px-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-black ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}

                            {/* Password Input */}
                            <div data-aos="fade-up" data-aos-delay="550">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-black"
                                    placeholder="Enter your password"
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
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}

                            {/* Forgot Password */}
                            <div className="flex items-center justify-between" data-aos="fade-up" data-aos-delay="600">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div data-aos="fade-up" data-aos-delay="650">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative my-4" data-aos="fade-up" data-aos-delay="700">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with Google</span>
                            </div>
                        </div>

                        {/* Google */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="btn shadow-none rounded-lg py-4 bg-white text-black border-[#e5e5e5] w-full" data-aos="fade-up" data-aos-delay="300">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center" data-aos="fade-up" data-aos-delay="350">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}

                                <Link to={'/signup'}>
                                    <button className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer">
                                        Sign up
                                    </button>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;