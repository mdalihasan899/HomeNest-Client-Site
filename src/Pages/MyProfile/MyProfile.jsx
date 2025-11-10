import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const MyProfile = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-8 px-4 text-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center" data-aos="fade-right">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-white text-3xl font-bold">JD</span>
                </div>
                <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">John Doe</h3>
              <p className="text-gray-600 mb-2">Software Developer</p>
              <div className="flex items-center justify-center gap-1 text-green-600 text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Verified Account
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Member since</p>
                <p className="text-gray-700 font-medium">January 2023</p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6" data-aos="fade-right" data-aos-delay="100">
              <h4 className="font-semibold text-gray-900 mb-4">Profile Stats</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Posts</span>
                  <span className="font-semibold text-blue-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-semibold text-blue-600">1.2K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Following</span>
                  <span className="font-semibold text-blue-600">356</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" data-aos="fade-left">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                  <button className="px-6 py-4 border-b-2 border-blue-600 text-blue-600 font-medium whitespace-nowrap">
                    Personal Info
                  </button>
                  <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap">
                    Security
                  </button>
                  <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap">
                    Preferences
                  </button>
                  <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap">
                    Social Links
                  </button>
                  <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap">
                    Notifications
                  </button>
                </nav>
              </div>

              {/* Profile Form */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                
                <form className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div data-aos="fade-up">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        defaultValue="John"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div data-aos="fade-up" data-aos-delay="100">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div data-aos="fade-up" data-aos-delay="200">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Email address verified
                      </p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="300">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Job Title & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div data-aos="fade-up" data-aos-delay="400">
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title
                      </label>
                      <input
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        defaultValue="Software Developer"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div data-aos="fade-up" data-aos-delay="500">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        defaultValue="San Francisco, CA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div data-aos="fade-up" data-aos-delay="600">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about yourself..."
                      defaultValue="Passionate software developer with 5+ years of experience in building scalable web applications. Love working with React, Node.js, and modern web technologies."
                    />
                    <p className="text-gray-500 text-sm mt-1">Brief description for your profile.</p>
                  </div>

                  {/* Skills */}
                  <div data-aos="fade-up" data-aos-delay="700">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">React</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Node.js</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">TypeScript</span>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">JavaScript</span>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">Python</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        + Add Skill
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="800">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-8 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium ml-auto"
                    >
                      Delete Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;