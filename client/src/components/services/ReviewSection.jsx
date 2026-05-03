import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, User, Calendar } from "lucide-react";

export default function ReviewSection({ serviceId, reviews = [], onAddReview }) {
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    userName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.comment.trim() || !newReview.userName.trim()) return;

    setIsSubmitting(true);
    try {
      const review = {
        id: Date.now(),
        ...newReview,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      };

      // Store in localStorage for now (can be replaced with API)
      const existingReviews = JSON.parse(localStorage.getItem(`reviews_${serviceId}`) || "[]");
      existingReviews.push(review);
      localStorage.setItem(`reviews_${serviceId}`, JSON.stringify(existingReviews));

      onAddReview?.(review);
      setNewReview({ rating: 5, comment: "", userName: "" });
      setShowAddReview(false);
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, interactive = false, onChange }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type={interactive ? "button" : "span"}
          onClick={interactive ? () => onChange?.(star) : undefined}
          className={`text-lg ${interactive ? "cursor-pointer hover:scale-110" : ""} transition-transform`}
          whileHover={interactive ? { scale: 1.1 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
        >
          <Star
            className={`w-5 h-5 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-600"
            }`}
          />
        </motion.button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-white">Reviews</h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-gray-300 text-sm">
                {averageRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>
        <motion.button
          onClick={() => setShowAddReview(!showAddReview)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25"
        >
          <MessageSquare className="w-4 h-4" />
          Write Review
        </motion.button>
      </div>

      {/* Add Review Form */}
      <AnimatePresence>
        {showAddReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6"
          >
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newReview.userName}
                  onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rating
                </label>
                <StarRating
                  rating={newReview.rating}
                  interactive
                  onChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  rows={4}
                  placeholder="Share your experience with this service..."
                  required
                />
              </div>

              <div className="flex gap-3">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </motion.button>
                <button
                  type="button"
                  onClick={() => setShowAddReview(false)}
                  className="text-gray-400 hover:text-white transition-colors px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 border border-purple-500/10 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{review.userName}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-300 leading-relaxed">{review.comment}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}