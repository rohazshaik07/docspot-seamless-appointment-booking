import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
      maxLength: 1000,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to prevent duplicate reviews
reviewSchema.index({ doctor: 1, user: 1 }, { unique: true })
reviewSchema.index({ doctor: 1, rating: -1 })

export default mongoose.model("Review", reviewSchema)
