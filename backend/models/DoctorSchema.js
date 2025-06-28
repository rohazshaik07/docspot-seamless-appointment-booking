import mongoose from "mongoose"

const DoctorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      default: "",
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    role: {
      type: String,
      default: "doctor",
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    qualifications: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        year: { type: Number, required: true },
      },
    ],
    experiences: [
      {
        position: { type: String, required: true },
        hospital: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        isCurrent: { type: Boolean, default: false },
      },
    ],
    bio: {
      type: String,
      maxLength: 500,
      trim: true,
    },
    about: {
      type: String,
      maxLength: 2000,
      trim: true,
    },
    timeSlots: [
      {
        day: {
          type: String,
          enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
          required: true,
        },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isAvailable: { type: Boolean, default: true },
      },
    ],
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRating: {
      type: Number,
      default: 0,
      min: 0,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Booking",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
DoctorSchema.index({ email: 1 })
DoctorSchema.index({ specialization: 1 })
DoctorSchema.index({ isApproved: 1 })
DoctorSchema.index({ averageRating: -1 })

export default mongoose.model("Doctor", DoctorSchema)
