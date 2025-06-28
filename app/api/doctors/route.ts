import { NextResponse } from "next/server"

// Demo doctors data with working image URLs
const demoData = {
  doctors: [
    {
      _id: "01",
      name: "Dr. Alfaz Ahmed",
      email: "alfaz@hospital.com",
      phone: "+1234567890",
      photo: "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?w=400&h=400&fit=crop&crop=face",
      ticketPrice: 300,
      role: "doctor",
      specialization: "Surgeon",
      qualifications: ["MBBS - Dhaka Medical College", "MS - General Surgery", "Fellowship in Laparoscopic Surgery"],
      experiences: [
        {
          position: "Senior Surgeon",
          hospital: "Mount Adora Hospital",
          startDate: "2015-01-01",
          endDate: null,
          isCurrent: true,
        },
      ],
      timeSlots: [
        {
          day: "Monday",
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Tuesday",
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Wednesday",
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Thursday",
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Friday",
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        },
      ],
      reviews: [
        {
          id: "1",
          patientName: "John Smith",
          rating: 5,
          comment: "Excellent surgeon with great bedside manner!",
          date: "2024-01-15",
        },
      ],
      averageRating: 4.8,
      totalRating: 272,
      isApproved: "approved",
      about:
        "Dr. Alfaz Ahmed is a highly experienced surgeon with over 15 years of practice. He specializes in minimally invasive surgical procedures and has performed thousands of successful operations.",
      hospital: "Mount Adora Hospital, Sylhet.",
      experience: "15+ years",
    },
    {
      _id: "02",
      name: "Dr. Saleh Mahmud",
      email: "saleh@hospital.com",
      phone: "+1234567891",
      photo: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=400&h=400&fit=crop&crop=face",
      ticketPrice: 250,
      role: "doctor",
      specialization: "Neurologist",
      qualifications: ["MBBS - Chittagong Medical College", "MD - Neurology", "Fellowship in Stroke Medicine"],
      experiences: [
        {
          position: "Senior Neurologist",
          hospital: "Mount Adora Hospital",
          startDate: "2012-01-01",
          endDate: null,
          isCurrent: true,
        },
      ],
      timeSlots: [
        {
          day: "Monday",
          slots: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Tuesday",
          slots: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Wednesday",
          slots: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Thursday",
          slots: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Saturday",
          slots: ["09:00", "10:00", "11:00", "12:00"],
        },
      ],
      reviews: [
        {
          id: "1",
          patientName: "Sarah Johnson",
          rating: 5,
          comment: "Dr. Mahmud is very knowledgeable and caring.",
          date: "2024-01-10",
        },
      ],
      averageRating: 4.8,
      totalRating: 272,
      isApproved: "approved",
      about:
        "Dr. Saleh Mahmud is a renowned neurologist specializing in stroke treatment and neurological disorders. He has extensive experience in treating complex neurological conditions.",
      hospital: "Mount Adora Hospital, Sylhet.",
      experience: "12+ years",
    },
    {
      _id: "03",
      name: "Dr. Farid Uddin",
      email: "farid@hospital.com",
      phone: "+1234567892",
      photo: "https://plus.unsplash.com/premium_photo-1661764570116-b1b0c2c4e4d5?w=400&h=400&fit=crop&crop=face",
      ticketPrice: 200,
      role: "doctor",
      specialization: "Dermatologist",
      qualifications: ["MBBS - Sylhet Medical College", "MD - Dermatology", "Diploma in Dermatology"],
      experiences: [
        {
          position: "Senior Dermatologist",
          hospital: "Mount Adora Hospital",
          startDate: "2014-01-01",
          endDate: null,
          isCurrent: true,
        },
      ],
      timeSlots: [
        {
          day: "Sunday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Monday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Tuesday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Wednesday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Thursday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
        },
      ],
      reviews: [
        {
          id: "1",
          patientName: "Mike Wilson",
          rating: 4,
          comment: "Great dermatologist, very professional.",
          date: "2024-01-08",
        },
      ],
      averageRating: 4.8,
      totalRating: 272,
      isApproved: "approved",
      about:
        "Dr. Farid Uddin is an expert dermatologist with a focus on skin cancer treatment and cosmetic dermatology. He provides comprehensive skin care solutions.",
      hospital: "Mount Adora Hospital, Sylhet.",
      experience: "10+ years",
    },
    {
      _id: "04",
      name: "Dr. Sarah Johnson",
      email: "sarah@hospital.com",
      phone: "+1234567893",
      photo: "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?w=400&h=400&fit=crop&crop=face",
      ticketPrice: 350,
      role: "doctor",
      specialization: "Cardiologist",
      qualifications: ["MBBS - Harvard Medical School", "MD - Cardiology", "Fellowship in Interventional Cardiology"],
      experiences: [
        {
          position: "Senior Cardiologist",
          hospital: "City General Hospital",
          startDate: "2010-01-01",
          endDate: null,
          isCurrent: true,
        },
      ],
      timeSlots: [
        {
          day: "Monday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Tuesday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Wednesday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Thursday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Friday",
          slots: ["08:00", "09:00", "10:00", "11:00"],
        },
      ],
      reviews: [
        {
          id: "1",
          patientName: "David Brown",
          rating: 5,
          comment: "Excellent cardiologist, saved my life!",
          date: "2024-01-12",
        },
      ],
      averageRating: 4.9,
      totalRating: 189,
      isApproved: "approved",
      about:
        "Dr. Sarah Johnson is a leading cardiologist with expertise in interventional cardiology and heart disease prevention. She has performed numerous life-saving procedures.",
      hospital: "City General Hospital, Dhaka.",
      experience: "14+ years",
    },
    {
      _id: "05",
      name: "Dr. Michael Chen",
      email: "michael@hospital.com",
      phone: "+1234567894",
      photo: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=400&h=400&fit=crop&crop=face",
      ticketPrice: 180,
      role: "doctor",
      specialization: "Pediatrician",
      qualifications: [
        "MBBS - Johns Hopkins University",
        "MD - Pediatrics",
        "Fellowship in Pediatric Emergency Medicine",
      ],
      experiences: [
        {
          position: "Senior Pediatrician",
          hospital: "Children's Medical Center",
          startDate: "2013-01-01",
          endDate: null,
          isCurrent: true,
        },
      ],
      timeSlots: [
        {
          day: "Monday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Tuesday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Wednesday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Thursday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Saturday",
          slots: ["10:00", "11:00", "12:00", "13:00"],
        },
      ],
      reviews: [
        {
          id: "1",
          patientName: "Lisa Anderson",
          rating: 5,
          comment: "Great with kids, very patient and caring.",
          date: "2024-01-14",
        },
      ],
      averageRating: 4.7,
      totalRating: 156,
      isApproved: "approved",
      about:
        "Dr. Michael Chen is a dedicated pediatrician with a passion for child healthcare. He specializes in pediatric emergency medicine and preventive care.",
      hospital: "Children's Medical Center, Chittagong.",
      experience: "11+ years",
    },
    {
      _id: "06",
      name: "Dr. Emily Rodriguez",
      email: "emily@hospital.com",
      phone: "+1234567895",
      photo: "https://plus.unsplash.com/premium_photo-1661764570116-b1b0c2c4e4d5?w=400&h=400&fit=crop&crop=face",
      ticketPrice: 320,
      role: "doctor",
      specialization: "Orthopedic Surgeon",
      qualifications: [
        "MBBS - Mayo Clinic College of Medicine",
        "MS - Orthopedic Surgery",
        "Fellowship in Sports Medicine",
      ],
      experiences: [
        {
          position: "Senior Orthopedic Surgeon",
          hospital: "Bone & Joint Institute",
          startDate: "2011-01-01",
          endDate: null,
          isCurrent: true,
        },
      ],
      timeSlots: [
        {
          day: "Monday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00"],
        },
        {
          day: "Tuesday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00"],
        },
        {
          day: "Wednesday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00"],
        },
        {
          day: "Thursday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00"],
        },
        {
          day: "Friday",
          slots: ["08:00", "09:00", "10:00"],
        },
      ],
      reviews: [
        {
          id: "1",
          patientName: "Robert Taylor",
          rating: 5,
          comment: "Excellent surgeon, my knee is perfect now!",
          date: "2024-01-11",
        },
      ],
      averageRating: 4.8,
      totalRating: 203,
      isApproved: "approved",
      about:
        "Dr. Emily Rodriguez is a skilled orthopedic surgeon specializing in sports medicine and joint replacement. She has helped numerous athletes return to their peak performance.",
      hospital: "Bone & Joint Institute, Sylhet.",
      experience: "13+ years",
    },
    {
      _id: "07",
      name: "Dr. Ahmed Hassan",
      email: "ahmed@hospital.com",
      phone: "+1234567896",
      photo: "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?w=400&h=400&fit=crop&crop=face",
      ticketPrice: 280,
      role: "doctor",
      specialization: "Psychiatrist",
      qualifications: ["MBBS - Dhaka Medical College", "MD - Psychiatry", "Fellowship in Child Psychiatry"],
      experiences: [
        {
          position: "Senior Psychiatrist",
          hospital: "Mental Health Institute",
          startDate: "2012-01-01",
          endDate: null,
          isCurrent: true,
        },
      ],
      timeSlots: [
        {
          day: "Sunday",
          slots: ["10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Monday",
          slots: ["10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Tuesday",
          slots: ["10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Wednesday",
          slots: ["10:00", "11:00", "15:00", "16:00", "17:00"],
        },
        {
          day: "Thursday",
          slots: ["10:00", "11:00", "15:00", "16:00", "17:00"],
        },
      ],
      reviews: [
        {
          id: "1",
          patientName: "Jennifer White",
          rating: 5,
          comment: "Very understanding and helpful psychiatrist.",
          date: "2024-01-13",
        },
      ],
      averageRating: 4.6,
      totalRating: 134,
      isApproved: "approved",
      about:
        "Dr. Ahmed Hassan is a compassionate psychiatrist with expertise in treating anxiety, depression, and other mental health conditions. He provides comprehensive mental health care.",
      hospital: "Mental Health Institute, Dhaka.",
      experience: "12+ years",
    },
    {
      _id: "08",
      name: "Dr. Lisa Thompson",
      email: "lisa@hospital.com",
      phone: "+1234567897",
      photo: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=400&h=400&fit=crop&crop=face",
      ticketPrice: 220,
      role: "doctor",
      specialization: "Gynecologist",
      qualifications: [
        "MBBS - Stanford University",
        "MD - Obstetrics & Gynecology",
        "Fellowship in Maternal-Fetal Medicine",
      ],
      experiences: [
        {
          position: "Senior Gynecologist",
          hospital: "Women's Health Center",
          startDate: "2014-01-01",
          endDate: null,
          isCurrent: true,
        },
      ],
      timeSlots: [
        {
          day: "Monday",
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Tuesday",
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Wednesday",
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Thursday",
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        },
        {
          day: "Saturday",
          slots: ["09:00", "10:00", "11:00", "12:00"],
        },
      ],
      reviews: [
        {
          id: "1",
          patientName: "Maria Garcia",
          rating: 5,
          comment: "Excellent care during my pregnancy!",
          date: "2024-01-09",
        },
      ],
      averageRating: 4.9,
      totalRating: 167,
      isApproved: "approved",
      about:
        "Dr. Lisa Thompson is a dedicated gynecologist with expertise in women's health and maternal care. She provides comprehensive care for women of all ages.",
      hospital: "Women's Health Center, Chittagong.",
      experience: "10+ years",
    },
    {
      _id: "09",
      name: "Dr. James Wilson",
      email: "james@hospital.com",
      phone: "+1234567898",
      photo: "https://plus.unsplash.com/premium_photo-1661764570116-b1b0c2c4e4d5?w=400&h=400&fit=crop&crop=face",
      ticketPrice: 400,
      role: "doctor",
      specialization: "Oncologist",
      qualifications: ["MBBS - Yale University", "MD - Oncology", "Fellowship in Radiation Oncology"],
      experiences: [
        {
          position: "Senior Oncologist",
          hospital: "Cancer Treatment Center",
          startDate: "2009-01-01",
          endDate: null,
          isCurrent: true,
        },
      ],
      timeSlots: [
        {
          day: "Monday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00"],
        },
        {
          day: "Tuesday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00"],
        },
        {
          day: "Wednesday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00"],
        },
        {
          day: "Thursday",
          slots: ["08:00", "09:00", "10:00", "14:00", "15:00"],
        },
        {
          day: "Friday",
          slots: ["08:00", "09:00", "10:00"],
        },
      ],
      reviews: [
        {
          id: "1",
          patientName: "Thomas Lee",
          rating: 5,
          comment: "Dr. Wilson gave me hope and excellent treatment.",
          date: "2024-01-07",
        },
      ],
      averageRating: 4.9,
      totalRating: 198,
      isApproved: "approved",
      about:
        "Dr. James Wilson is a leading oncologist with extensive experience in cancer treatment and research. He specializes in personalized cancer therapy.",
      hospital: "Cancer Treatment Center, Dhaka.",
      experience: "15+ years",
    },
    {
      _id: "10",
      name: "Dr. Rachel Kim",
      email: "rachel@hospital.com",
      phone: "+1234567899",
      photo: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=400&h=400&fit=crop&crop=face",
      ticketPrice: 260,
      role: "doctor",
      specialization: "Ophthalmologist",
      qualifications: ["MBBS - University of Pennsylvania", "MD - Ophthalmology", "Fellowship in Retinal Surgery"],
      experiences: [
        {
          position: "Senior Ophthalmologist",
          hospital: "Eye Care Institute",
          startDate: "2013-01-01",
          endDate: null,
          isCurrent: true,
        },
      ],
      timeSlots: [
        {
          day: "Sunday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00"],
        },
        {
          day: "Monday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00"],
        },
        {
          day: "Tuesday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00"],
        },
        {
          day: "Wednesday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00"],
        },
        {
          day: "Thursday",
          slots: ["09:00", "10:00", "11:00", "15:00", "16:00"],
        },
      ],
      reviews: [
        {
          id: "1",
          patientName: "Kevin Park",
          rating: 5,
          comment: "My vision is perfect after the surgery!",
          date: "2024-01-06",
        },
      ],
      averageRating: 4.8,
      totalRating: 145,
      isApproved: "approved",
      about:
        "Dr. Rachel Kim is a skilled ophthalmologist specializing in retinal surgery and vision correction. She has restored sight to countless patients.",
      hospital: "Eye Care Institute, Sylhet.",
      experience: "11+ years",
    },
  ],
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      doctors: demoData.doctors,
      message: "Doctors fetched successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch doctors" }, { status: 500 })
  }
}
