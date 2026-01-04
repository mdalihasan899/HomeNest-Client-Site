import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FiUser,
  FiMail,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiEdit2,
  FiChevronRight,
  FiCalendar,
  FiStar,
  FiPackage,
  FiHeart,
  FiUpload,
  FiBell
} from "react-icons/fi";
import { AuthContext } from "../../AuthContext/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [userStats, setUserStats] = useState({
    properties: 0,
    reviews: 0,
    favorites: 0
  });

  useEffect(() => {
    if (user?.email) {
      fetchAll();
      fetchUserStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchAll = async () => {
    try {
      // get user data
      const usersRes = await axios.get("https://final-project-gilt-rho.vercel.app/users");
      const matchedUser = usersRes.data.find(
        (u) => u.email === user.email
      );
      setDbUser(matchedUser || null);

    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      // Fetch user properties
      const propertiesRes = await axios.get(`https://final-project-gilt-rho.vercel.app/properties?ownerEmail=${user.email}`);
      
      // For reviews - you might need to adjust the endpoint based on your API
      const reviewsRes = await axios.get(`https://final-project-gilt-rho.vercel.app/reviews?userEmail=${user.email}`);
      
      // For favorites - assuming you have a favorites system
      const favoritesRes = await axios.get(`https://final-project-gilt-rho.vercel.app/favorites?userEmail=${user.email}`);
      
      setUserStats({
        properties: propertiesRes.data?.length || 0,
        reviews: reviewsRes.data?.length || 0,
        favorites: favoritesRes.data?.length || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const getRoleColor = (role) => {
    return 'from-blue-500 to-purple-600'; // Only user color now
  };

  const getRoleIcon = (role) => {
    return <FiUser className="w-5 h-5" />;
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <FiUser className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Not Logged In
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please login to view your profile
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and properties
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                  <img
                    src={user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || "User") + "&background=4F46E5&color=fff"}
                    alt={user.displayName || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg">
                  <FiUpload className="w-4 h-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {user.displayName || "User"}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FiMail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Role Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${getRoleColor(dbUser?.role || 'user')} text-white mb-6`}>
                  {getRoleIcon(dbUser?.role || 'user')}
                  <span className="font-medium capitalize">User</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.properties}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Properties</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.reviews}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.favorites}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Favorites</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Account Info */}
        <div className="space-y-8">
          {/* Account Type Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                <FiShield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Account Type
              </h3>
            </div>

            <div className="space-y-4">
              <div className={`p-4 rounded-xl border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20`}>
                <div className="flex items-center gap-3">
                  <FiUser className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">User Account</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Browse and manage properties
                    </div>
                  </div>
                  <FiCheckCircle className="ml-auto w-5 h-5 text-blue-500" />
                </div>
              </div>

              <div className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <div className="flex items-center gap-3">
                  <FiPackage className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Property Owner</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      List and manage your properties
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            
            <div className="space-y-4">
              <div className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                      <FiPackage className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Add Property</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        List your property for sale/rent
                      </p>
                    </div>
                  </div>
                  <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                
                <button
                  className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Add New Property
                </button>
              </div>

              <div className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                      <FiStar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">My Reviews</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        View and manage your reviews
                      </p>
                    </div>
                  </div>
                  <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                </div>
                
                <button
                  className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
                >
                  View My Reviews
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FiBell className="w-4 h-4" />
                <span>Get notified about property updates</span>
              </div>
            </div>
          </div>

          {/* Account Created Info */}
          {dbUser?.createdAt && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FiCalendar className="w-4 h-4" />
                <span className="text-sm">
                  Member since {new Date(dbUser.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;