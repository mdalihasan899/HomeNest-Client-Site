import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { AuthContext } from '../AuthContext/AuthContext';
import axios from 'axios';
import {
    FiHome,
    FiUser,
    FiPackage,
    FiStar,
    FiHeart,
    FiPlusCircle,
    FiGrid,
    FiUsers,
    FiBell,
    FiBarChart2,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX,
    FiChevronRight,
    FiChevronLeft,
    FiCheckCircle,
    FiClock,
    FiDollarSign
} from 'react-icons/fi';
import { RiRestaurantLine, RiAdminLine } from 'react-icons/ri';
import { GiChefToque } from 'react-icons/gi';
import { TbHome } from 'react-icons/tb';

const DashboardLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState('user');
    const [stats, setStats] = useState({
        orders: 0,
        reviews: 0,
        favorites: 0,
        pending: 0
    });
    const location = useLocation();

    const fetchUsers = async () => {
        if (!user?.email) return;

        try {
            setLoading(true);
            const res = await axios.get('https://book-management-server-psi.vercel.app/users');
            const allUsers = res.data;
            setUsers(allUsers);

            const currentUser = allUsers.find(u => u.email === user.email);
            setUserRole(currentUser?.role || 'user');

            // Calculate stats (mock data - replace with actual API calls)
            calculateStats();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = () => {
        // Mock stats - replace with actual API calls
        setStats({
            orders: 5,
            reviews: 12,
            favorites: 8,
            pending: 2
        });
    };

    useEffect(() => {
        if (user?.email) {
            fetchUsers();
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    // Only user links - removed admin and chef links
    const userLinks = [
        { to: "/", icon: <FiHome />, label: "Home", exact: true },
        { to: "/my-profile", icon: <FiUser />, label: "My Profile" },
        { to: "/my-properties", icon: <FiPackage />, label: "My Properties" },
        { to: "/my-reviews", icon: <FiStar />, label: "My Reviews" },
        { to: "/my-ratings", icon: <FiHeart />, label: "My Ratings" },
    ];

    // Removed chefLinks and adminLinks arrays

    const allLinks = [
        ...userLinks,
        // Removed conditional links for chef and admin
    ];

    const getActiveLink = () => {
        return allLinks.find(link =>
            link.exact
                ? location.pathname === link.to
                : location.pathname.startsWith(link.to)
        )?.label || 'Dashboard';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left side - Mobile menu button & Title */}
                        <div className="flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                            </button>

                            <div className="ml-4 flex items-center gap-3">
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Dashboard
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {getActiveLink()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right side - User info */}
                        <div className="flex items-center gap-4">
                            {/* Stats Badges */}
                            <div className="hidden md:flex items-center gap-3">
                                <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                                    <span className="font-bold">{stats.orders}</span> Properties
                                </div>
                                <div className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                                    <span className="font-bold">{stats.favorites}</span> Rating
                                </div>
                            </div>

                            {/* User Profile */}
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {user?.displayName?.split(' ')[0] || 'User'}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                        {userRole}
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden">
                                        <img
                                            src={user?.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.displayName || "User")}
                                            alt={user?.displayName || "User"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${userRole === 'admin' ? 'bg-purple-500' :
                                        userRole === 'chef' ? 'bg-yellow-500' :
                                            'bg-blue-500'
                                        }`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className={`hidden lg:block bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'
                    }`}>
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className={`flex items-center gap-3 ${sidebarOpen ? '' : 'justify-center'}`}>
                            <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-1">
                                <TbHome className="w-8 h-8 text-white" />
                            </div>
                            {sidebarOpen && (
                                <div className="flex justify-between h-20 items-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        HomeNest
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Content */}
                    <div className="p-4">
                        <div className="space-y-1">
                            {allLinks.map((link) => {
                                const isActive = link.exact
                                    ? location.pathname === link.to
                                    : location.pathname.startsWith(link.to);

                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <div className={`text-lg ${isActive ? 'text-white' : 'text-blue-500'}`}>
                                            {link.icon}
                                        </div>
                                        {sidebarOpen && (
                                            <>
                                                <span className="font-medium">{link.label}</span>
                                                <FiChevronRight className={`ml-auto w-4 h-4 transition-transform ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                                    }`} />
                                            </>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Role Badge - Simplified for user only */}
                        <div className={`mt-8 p-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white ${sidebarOpen ? '' : 'p-3'}`}>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                                    <FiUser className="w-5 h-5" />
                                </div>
                                {sidebarOpen && (
                                    <div>
                                        <p className="font-semibold capitalize">User</p>
                                        <p className="text-sm opacity-90">Account Type</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className={`w-full flex items-center gap-3 px-4 py-3 mt-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors ${sidebarOpen ? '' : 'justify-center'
                                }`}
                        >
                            <FiLogOut className="w-5 h-5" />
                            {sidebarOpen && <span className="font-medium">Logout</span>}
                        </button>
                    </div>

                    {/* Toggle Sidebar Button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="absolute -right-3 top-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-1.5 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {sidebarOpen ? (
                            <FiChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        ) : (
                            <FiChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        )}
                    </button>
                </aside>

                {/* Mobile Sidebar */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
                        <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-2xl">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                                            <TbHome className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-gray-900 dark:text-white">HomeNest</h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <FiX className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 h-[calc(100vh-88px)] overflow-y-auto">
                                <div className="space-y-1">
                                    {allLinks.map((link) => {
                                        const isActive = link.exact
                                            ? location.pathname === link.to
                                            : location.pathname.startsWith(link.to);

                                        return (
                                            <Link
                                                key={link.to}
                                                to={link.to}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`}
                                            >
                                                <div className={`text-lg ${isActive ? 'text-white' : 'text-blue-500'}`}>
                                                    {link.icon}
                                                </div>
                                                <span className="font-medium">{link.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>

                                {/* Quick Stats */}
                                <div className="mt-8 grid grid-cols-2 gap-3">
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FiPackage className="w-4 h-4 text-blue-500" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Orders</span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.orders}</div>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FiHeart className="w-4 h-4 text-purple-500" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Favorites</span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.favorites}</div>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-800/10 rounded-xl border border-blue-200 dark:border-blue-800/30">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user?.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.displayName || "User")}
                                            alt={user?.displayName || "User"}
                                            className="w-12 h-12 rounded-full border-2 border-blue-500/30"
                                        />
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">
                                                {user?.displayName || "User"}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                {userRole} Account
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 mt-8 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium"
                                >
                                    <FiLogOut className="w-5 h-5" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className={`flex-1 p-4 lg:p-6 transition-all duration-300 ${sidebarOpen ? '' : 'lg:ml-20'
                    }`}>
                    {/* Welcome Card */}
                    <div className="mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">
                                        Welcome back, {user?.displayName?.split(' ')[0] || 'User'}! 👋
                                    </h2>
                                    <p className="text-blue-100">
                                        Track your properties, reviews, and favorites
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="hidden lg:flex items-center gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">{stats.orders || 0}</div>
                                            <div className="text-sm text-blue-100">Properties</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">{stats.reviews || 0}</div>
                                            <div className="text-sm text-blue-100">Reviews</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">{stats.favorites || 0}</div>
                                            <div className="text-sm text-blue-100">Favorites</div>
                                        </div>
                                    </div>
                                    <Link
                                        to="/"
                                        className="px-6 py-2.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors"
                                    >
                                        Visit Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;