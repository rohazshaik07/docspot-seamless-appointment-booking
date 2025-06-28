import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
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
    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled", "completed"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      maxLength: 500,
      trim: true,
    },
    prescription: {
      type: String,
      maxLength: 2000,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
bookingSchema.index({ doctor: 1, appointmentDate: 1 })
bookingSchema.index({ user: 1, appointmentDate: -1 })
bookingSchema.index({ status: 1 })

export default mongoose.model("Booking", bookingSchema)
