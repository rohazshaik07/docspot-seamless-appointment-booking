import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
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
      trim: true,
    },
    photo: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["patient", "admin"],
      default: "patient",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      default: "O+",
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

// Index for better query performance
UserSchema.index({ email: 1 })
UserSchema.index({ role: 1 })

export default mongoose.model("User", UserSchema)
