import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FiStar,
  FiEdit2,
  FiTrash2,
  FiMessageSquare,
  FiCalendar,
  FiUser,
  FiPackage,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiChevronRight,
  FiEye,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp
} from "react-icons/fi";
import { RiRestaurantLine } from "react-icons/ri";
import { AuthContext } from "../../AuthContext/AuthContext";

export default function MyReviewPage() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [updateData, setUpdateData] = useState({ rating: 5, comment: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRating, setSelectedRating] = useState("all");

  // Fetch user's reviews
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://final-project-gilt-rho.vercel.app/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to load reviews",
        icon: "error",
        confirmButtonColor: "#2ECC71",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter when user loads
  useEffect(() => {
    if (!user?.email || reviews.length === 0) return;
    const filtered = reviews.filter(
      review => review.reviewerEmail === user.email
    );
    setMyReviews(filtered);
    setFilteredReviews(filtered);
  }, [user, reviews]);

  // Apply search and filters
  useEffect(() => {
    let result = [...myReviews];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(review =>
        review.mealName?.toLowerCase().includes(term) ||
        review.comment?.toLowerCase().includes(term)
      );
    }

    // Rating filter
    if (selectedRating !== "all") {
      result = result.filter(review => review.rating === parseInt(selectedRating));
    }

    setFilteredReviews(result);
  }, [searchTerm, selectedRating, myReviews]);

  // Delete review
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2ECC71",
      cancelButtonColor: "#6B7280",
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`https://final-project-gilt-rho.vercel.app/reviews/${id}`);
      setReviews(reviews.filter((r) => r._id !== id));
      Swal.fire({
        title: "Deleted!",
        text: "Your review has been deleted.",
        icon: "success",
        confirmButtonColor: "#2ECC71",
        timer: 1500
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to delete review",
        icon: "error",
        confirmButtonColor: "#2ECC71",
      });
    }
  };

  // Open modal for update
  const openUpdateModal = (review) => {
    setSelectedReview(review);
    setUpdateData({ rating: review.rating, comment: review.comment });
  };

  // Update review
  const handleUpdate = async () => {
    if (!updateData.comment.trim()) {
      Swal.fire({
        title: "Comment Required",
        text: "Please enter a comment for your review",
        icon: "warning",
        confirmButtonColor: "#2ECC71",
      });
      return;
    }

    try {
      await axios.put(`https://final-project-gilt-rho.vercel.app/reviews/${selectedReview._id}`, updateData);
      setReviews(
        reviews.map((r) =>
          r._id === selectedReview._id ? { ...r, ...updateData } : r
        )
      );
      setSelectedReview(null);
      Swal.fire({
        title: "Updated!",
        text: "Review updated successfully.",
        icon: "success",
        confirmButtonColor: "#2ECC71",
        timer: 1500
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to update review",
        icon: "error",
        confirmButtonColor: "#2ECC71",
      });
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-emerald-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  const getRatingBackground = (rating) => {
    if (rating >= 4) return "bg-emerald-50 dark:bg-emerald-900/20";
    if (rating >= 3) return "bg-yellow-50 dark:bg-yellow-900/20";
    return "bg-red-50 dark:bg-red-900/20";
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              My Reviews
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {myReviews.length} review{myReviews.length !== 1 ? 's' : ''} · {filteredReviews.length} shown
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchReviews}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all"
            >
              <FiRefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <Link
              to="/meals"
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <RiRestaurantLine className="w-4 h-4" />
              <span>Write New Review</span>
            </Link>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiFilter className="w-4 h-4" />
              <span>Filter</span>
              {showFilters ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-medium text-gray-700 dark:text-gray-300">Filter by Rating:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedRating("all")}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${selectedRating === "all" 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    All Ratings
                  </button>
                  {[5,4,3,2,1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating.toString())}
                      className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${selectedRating === rating.toString() 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <FiStar className="w-4 h-4" />
                      <span>{rating}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedRating("all");
                    setSearchTerm("");
                  }}
                  className="ml-auto px-4 py-1.5 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Content */}
      {myReviews.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
            <FiMessageSquare className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            No Reviews Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            You haven't reviewed any meals yet. Share your experience to help other customers!
          </p>
          <Link
            to="/meals"
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all"
          >
            <RiRestaurantLine className="w-5 h-5" />
            <span>Browse Meals</span>
          </Link>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
            <FiSearch className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            No Results Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            No reviews match your search criteria.
          </p>
          <button
            onClick={() => {
              setSelectedRating("all");
              setSearchTerm("");
            }}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:border-emerald-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Meal Info */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={review.mealImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                      alt={review.mealName}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                    />
                    <div className="absolute -top-2 -right-2">
                      <div className={`px-2 py-1 rounded-lg ${getRatingBackground(review.rating)}`}>
                        <div className="flex items-center gap-1">
                          <span className={`font-bold ${getRatingColor(review.rating)}`}>
                            {review.rating}
                          </span>
                          <FiStar className={`w-3 h-3 ${getRatingColor(review.rating)} fill-current`} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                          {review.mealName || "Unknown Meal"}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                          <FiCalendar className="w-4 h-4" />
                          <span className="text-sm">
                            {getTimeAgo(review.date)} · {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[1,2,3,4,5].map((star) => (
                        <FiStar
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment & Actions */}
                <div className="flex-1">
                  <div className="mb-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <FiUser className="w-4 h-4" />
                        <span>You</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiPackage className="w-4 h-4" />
                        <span>{review.likes || 0} helpful</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                      <button
                        onClick={() => openUpdateModal(review)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit Your Review
                </h3>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Update your review for {selectedReview.mealName}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Star Rating */}
              <div className="mb-6">
                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Your Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUpdateData({ ...updateData, rating: star })}
                      className="text-3xl transition-transform hover:scale-110 active:scale-95"
                    >
                      <FiStar 
                        className={`${star <= updateData.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {updateData.rating} star{updateData.rating !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Your Review
                </label>
                <textarea
                  value={updateData.comment}
                  onChange={(e) => setUpdateData({ ...updateData, comment: e.target.value })}
                  className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 dark:text-gray-300 resize-none"
                  placeholder="Share your updated experience..."
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Minimum 10 characters
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  disabled={updateData.comment.trim().length < 10}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
                    updateData.comment.trim().length < 10
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'
                  }`}
                >
                  Update Review
                </button>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      {myReviews.length > 0 && (
        <div className="mt-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Help Others Decide</h3>
              <p className="text-emerald-100">
                Your reviews help other customers make better choices. Keep sharing your experiences!
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/meals"
                className="px-6 py-3 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Write More Reviews
              </Link>
              <button
                onClick={fetchReviews}
                className="px-6 py-3 bg-emerald-600/20 border-2 border-white text-white font-bold rounded-xl hover:bg-emerald-600/30 transition-colors"
              >
                Refresh Reviews
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}