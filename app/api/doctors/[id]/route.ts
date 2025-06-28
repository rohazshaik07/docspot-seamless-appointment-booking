import { type NextRequest, NextResponse } from "next/server"

const doctorDetails = {
  "01": {
    id: "01",
    name: "Dr. Alfaz Ahmed",
    specialty: "Surgeon",
    avgRating: 4.8,
    totalRating: 272,
    photo: "/assets/images/doctor-img01.png",
    totalPatients: 1500,
    hospital: "Mount Adora Hospital, Sylhet.",
    ticketPrice: 150,
    experience: "10+ years",
    about:
      "Dr. Alfaz Ahmed is a highly experienced surgeon with over 10 years of practice. He specializes in minimally invasive surgical procedures and has performed over 2000 successful surgeries.",
    qualifications: [
      "MBBS - Dhaka Medical College",
      "MS in Surgery - Bangabandhu Sheikh Mujib Medical University",
      "Fellowship in Laparoscopic Surgery - India",
    ],
    experiences: [
      {
        position: "Senior Surgeon",
        hospital: "Mount Adora Hospital",
        duration: "2018 - Present",
      },
      {
        position: "Assistant Surgeon",
        hospital: "Dhaka Medical College Hospital",
        duration: "2014 - 2018",
      },
    ],
    timeSlots: [
      { day: "Monday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { day: "Tuesday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { day: "Wednesday", slots: ["09:00", "10:00", "11:00"] },
      { day: "Thursday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { day: "Friday", slots: ["09:00", "10:00", "11:00", "14:00"] },
    ],
    reviews: [
      {
        id: 1,
        patientName: "John Doe",
        rating: 5,
        comment: "Excellent doctor! Very professional and caring. The surgery went perfectly.",
        date: "2024-01-15",
      },
      {
        id: 2,
        patientName: "Sarah Smith",
        rating: 5,
        comment: "Dr. Ahmed is amazing. He explained everything clearly and made me feel comfortable.",
        date: "2024-01-10",
      },
    ],
  },
  "02": {
    id: "02",
    name: "Dr. Saleh Mahmud",
    specialty: "Neurologist",
    avgRating: 4.9,
    totalRating: 189,
    photo: "/assets/images/doctor-img02.png",
    totalPatients: 1200,
    hospital: "Mount Adora Hospital, Sylhet.",
    ticketPrice: 200,
    experience: "15+ years",
    about:
      "Dr. Saleh Mahmud is an expert neurologist with extensive experience in treating neurological conditions. He specializes in stroke care and neurological rehabilitation.",
    qualifications: [
      "MBBS - Chittagong Medical College",
      "MD in Neurology - BSMMU",
      "Fellowship in Stroke Medicine - UK",
    ],
    experiences: [
      {
        position: "Senior Neurologist",
        hospital: "Mount Adora Hospital",
        duration: "2015 - Present",
      },
      {
        position: "Neurologist",
        hospital: "Chittagong Medical College Hospital",
        duration: "2010 - 2015",
      },
    ],
    timeSlots: [
      { day: "Monday", slots: ["10:00", "11:00", "14:00", "15:00", "16:00"] },
      { day: "Tuesday", slots: ["10:00", "11:00", "14:00", "15:00", "16:00"] },
      { day: "Wednesday", slots: ["10:00", "11:00", "14:00"] },
      { day: "Thursday", slots: ["10:00", "11:00", "14:00", "15:00", "16:00"] },
      { day: "Friday", slots: ["10:00", "11:00", "14:00", "15:00"] },
    ],
    reviews: [
      {
        id: 1,
        patientName: "Mike Johnson",
        rating: 5,
        comment: "Outstanding neurologist. Helped me recover from my stroke completely.",
        date: "2024-01-12",
      },
    ],
  },
  "03": {
    id: "03",
    name: "Dr. Farid Uddin",
    specialty: "Dermatologist",
    avgRating: 4.7,
    totalRating: 156,
    photo: "/assets/images/doctor-img03.png",
    totalPatients: 800,
    hospital: "Mount Adora Hospital, Sylhet.",
    ticketPrice: 120,
    experience: "8+ years",
    about:
      "Dr. Farid Uddin is a skilled dermatologist specializing in skin conditions, cosmetic procedures, and dermatological surgery.",
    qualifications: [
      "MBBS - Rajshahi Medical College",
      "MD in Dermatology - BSMMU",
      "Certificate in Cosmetic Dermatology - India",
    ],
    experiences: [
      {
        position: "Senior Dermatologist",
        hospital: "Mount Adora Hospital",
        duration: "2020 - Present",
      },
      {
        position: "Dermatologist",
        hospital: "Rajshahi Medical College Hospital",
        duration: "2016 - 2020",
      },
    ],
    timeSlots: [
      { day: "Monday", slots: ["09:00", "10:00", "11:00", "15:00", "16:00"] },
      { day: "Tuesday", slots: ["09:00", "10:00", "11:00", "15:00", "16:00"] },
      { day: "Wednesday", slots: ["09:00", "10:00", "11:00"] },
      { day: "Thursday", slots: ["09:00", "10:00", "11:00", "15:00", "16:00"] },
      { day: "Friday", slots: ["09:00", "10:00", "11:00", "15:00"] },
    ],
    reviews: [
      {
        id: 1,
        patientName: "Lisa Brown",
        rating: 5,
        comment: "Great dermatologist! Solved my skin problem quickly and effectively.",
        date: "2024-01-08",
      },
    ],
  },
  "04": {
    id: "04",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    avgRating: 4.9,
    totalRating: 189,
    photo: "/assets/images/doctor-img01.png",
    totalPatients: 1200,
    hospital: "City General Hospital, Dhaka.",
    ticketPrice: 180,
    experience: "12+ years",
    about:
      "Dr. Sarah Johnson is a renowned cardiologist specializing in heart disease prevention, diagnosis, and treatment. She has extensive experience in interventional cardiology.",
    qualifications: [
      "MBBS - Dhaka Medical College",
      "MD in Cardiology - NICVD",
      "Fellowship in Interventional Cardiology - USA",
    ],
    experiences: [
      {
        position: "Senior Cardiologist",
        hospital: "City General Hospital",
        duration: "2018 - Present",
      },
      {
        position: "Cardiologist",
        hospital: "National Heart Foundation",
        duration: "2012 - 2018",
      },
    ],
    timeSlots: [
      { day: "Monday", slots: ["08:00", "09:00", "10:00", "14:00", "15:00"] },
      { day: "Tuesday", slots: ["08:00", "09:00", "10:00", "14:00", "15:00"] },
      { day: "Wednesday", slots: ["08:00", "09:00", "10:00"] },
      { day: "Thursday", slots: ["08:00", "09:00", "10:00", "14:00", "15:00"] },
      { day: "Friday", slots: ["08:00", "09:00", "10:00", "14:00"] },
    ],
    reviews: [
      {
        id: 1,
        patientName: "Robert Wilson",
        rating: 5,
        comment: "Dr. Johnson saved my life. Excellent cardiologist with great bedside manner.",
        date: "2024-01-20",
      },
    ],
  },
  "05": {
    id: "05",
    name: "Dr. Michael Chen",
    specialty: "Pediatrician",
    avgRating: 4.7,
    totalRating: 156,
    photo: "/assets/images/doctor-img02.png",
    totalPatients: 800,
    hospital: "Children's Medical Center, Chittagong.",
    ticketPrice: 140,
    experience: "9+ years",
    about:
      "Dr. Michael Chen is a dedicated pediatrician with a passion for children's health. He specializes in pediatric care from newborns to adolescents.",
    qualifications: [
      "MBBS - Chittagong Medical College",
      "DCH - Bangladesh College of Physicians",
      "Fellowship in Pediatric Cardiology - India",
    ],
    experiences: [
      {
        position: "Senior Pediatrician",
        hospital: "Children's Medical Center",
        duration: "2019 - Present",
      },
      {
        position: "Pediatrician",
        hospital: "Chittagong Medical College Hospital",
        duration: "2015 - 2019",
      },
    ],
    timeSlots: [
      { day: "Monday", slots: ["09:00", "10:00", "11:00", "16:00", "17:00"] },
      { day: "Tuesday", slots: ["09:00", "10:00", "11:00", "16:00", "17:00"] },
      { day: "Wednesday", slots: ["09:00", "10:00", "11:00"] },
      { day: "Thursday", slots: ["09:00", "10:00", "11:00", "16:00", "17:00"] },
      { day: "Friday", slots: ["09:00", "10:00", "11:00", "16:00"] },
    ],
    reviews: [
      {
        id: 1,
        patientName: "Jennifer Lee",
        rating: 5,
        comment: "Dr. Chen is wonderful with children. My kids love visiting him!",
        date: "2024-01-18",
      },
    ],
  },
  "06": {
    id: "06",
    name: "Dr. Emily Rodriguez",
    specialty: "Gynecologist",
    avgRating: 4.8,
    totalRating: 203,
    photo: "/assets/images/doctor-img03.png",
    totalPatients: 950,
    hospital: "Women's Health Center, Rajshahi.",
    ticketPrice: 160,
    experience: "11+ years",
    about:
      "Dr. Emily Rodriguez is a compassionate gynecologist dedicated to women's health. She specializes in reproductive health, pregnancy care, and gynecological surgery.",
    qualifications: [
      "MBBS - Rajshahi Medical College",
      "FCPS in Gynecology & Obstetrics",
      "Training in Laparoscopic Surgery - Thailand",
    ],
    experiences: [
      {
        position: "Senior Gynecologist",
        hospital: "Women's Health Center",
        duration: "2017 - Present",
      },
      {
        position: "Gynecologist",
        hospital: "Rajshahi Medical College Hospital",
        duration: "2013 - 2017",
      },
    ],
    timeSlots: [
      { day: "Monday", slots: ["10:00", "11:00", "12:00", "15:00", "16:00"] },
      { day: "Tuesday", slots: ["10:00", "11:00", "12:00", "15:00", "16:00"] },
      { day: "Wednesday", slots: ["10:00", "11:00", "12:00"] },
      { day: "Thursday", slots: ["10:00", "11:00", "12:00", "15:00", "16:00"] },
      { day: "Friday", slots: ["10:00", "11:00", "12:00", "15:00"] },
    ],
    reviews: [
      {
        id: 1,
        patientName: "Maria Santos",
        rating: 5,
        comment: "Dr. Rodriguez is an excellent gynecologist. Very caring and professional.",
        date: "2024-01-16",
      },
    ],
  },
  "07": {
    id: "07",
    name: "Dr. David Wilson",
    specialty: "Orthopedic",
    avgRating: 4.6,
    totalRating: 134,
    photo: "/assets/images/doctor-img01.png",
    totalPatients: 700,
    hospital: "Bone & Joint Clinic, Khulna.",
    ticketPrice: 170,
    experience: "13+ years",
    about:
      "Dr. David Wilson is an experienced orthopedic surgeon specializing in bone, joint, and muscle disorders. He has expertise in sports medicine and joint replacement surgery.",
    qualifications: [
      "MBBS - Khulna Medical College",
      "MS in Orthopedics - BSMMU",
      "Fellowship in Joint Replacement - Germany",
    ],
    experiences: [
      {
        position: "Senior Orthopedic Surgeon",
        hospital: "Bone & Joint Clinic",
        duration: "2016 - Present",
      },
      {
        position: "Orthopedic Surgeon",
        hospital: "Khulna Medical College Hospital",
        duration: "2011 - 2016",
      },
    ],
    timeSlots: [
      { day: "Monday", slots: ["08:00", "09:00", "10:00", "14:00", "15:00"] },
      { day: "Tuesday", slots: ["08:00", "09:00", "10:00", "14:00", "15:00"] },
      { day: "Wednesday", slots: ["08:00", "09:00", "10:00"] },
      { day: "Thursday", slots: ["08:00", "09:00", "10:00", "14:00", "15:00"] },
      { day: "Friday", slots: ["08:00", "09:00", "10:00", "14:00"] },
    ],
    reviews: [
      {
        id: 1,
        patientName: "Tom Anderson",
        rating: 5,
        comment: "Dr. Wilson performed my knee replacement surgery perfectly. Excellent surgeon!",
        date: "2024-01-14",
      },
    ],
  },
  "08": {
    id: "08",
    name: "Dr. Lisa Thompson",
    specialty: "Psychiatrist",
    avgRating: 4.9,
    totalRating: 167,
    photo: "/assets/images/doctor-img02.png",
    totalPatients: 600,
    hospital: "Mental Health Institute, Barisal.",
    ticketPrice: 190,
    experience: "14+ years",
    about:
      "Dr. Lisa Thompson is a compassionate psychiatrist specializing in mental health disorders. She has extensive experience in treating depression, anxiety, and other psychiatric conditions.",
    qualifications: [
      "MBBS - Barisal Medical College",
      "MD in Psychiatry - NIMH",
      "Certificate in Cognitive Behavioral Therapy - UK",
    ],
    experiences: [
      {
        position: "Senior Psychiatrist",
        hospital: "Mental Health Institute",
        duration: "2015 - Present",
      },
      {
        position: "Psychiatrist",
        hospital: "National Institute of Mental Health",
        duration: "2010 - 2015",
      },
    ],
    timeSlots: [
      { day: "Monday", slots: ["11:00", "12:00", "13:00", "16:00", "17:00"] },
      { day: "Tuesday", slots: ["11:00", "12:00", "13:00", "16:00", "17:00"] },
      { day: "Wednesday", slots: ["11:00", "12:00", "13:00"] },
      { day: "Thursday", slots: ["11:00", "12:00", "13:00", "16:00", "17:00"] },
      { day: "Friday", slots: ["11:00", "12:00", "13:00", "16:00"] },
    ],
    reviews: [
      {
        id: 1,
        patientName: "Anna Davis",
        rating: 5,
        comment: "Dr. Thompson helped me overcome my depression. She's an amazing psychiatrist.",
        date: "2024-01-22",
      },
    ],
  },
  "09": {
    id: "09",
    name: "Dr. Ahmed Hassan",
    specialty: "Ophthalmologist",
    avgRating: 4.7,
    totalRating: 145,
    photo: "/assets/images/doctor-img03.png",
    totalPatients: 850,
    hospital: "Eye Care Center, Sylhet.",
    ticketPrice: 130,
    experience: "10+ years",
    about:
      "Dr. Ahmed Hassan is a skilled ophthalmologist specializing in eye diseases and vision problems. He has expertise in cataract surgery and retinal disorders.",
    qualifications: [
      "MBBS - Sylhet Medical College",
      "DO in Ophthalmology - BSMMU",
      "Fellowship in Retinal Surgery - India",
    ],
    experiences: [
      {
        position: "Senior Ophthalmologist",
        hospital: "Eye Care Center",
        duration: "2018 - Present",
      },
      {
        position: "Ophthalmologist",
        hospital: "Sylhet Medical College Hospital",
        duration: "2014 - 2018",
      },
    ],
    timeSlots: [
      { day: "Monday", slots: ["09:00", "10:00", "11:00", "15:00", "16:00"] },
      { day: "Tuesday", slots: ["09:00", "10:00", "11:00", "15:00", "16:00"] },
      { day: "Wednesday", slots: ["09:00", "10:00", "11:00"] },
      { day: "Thursday", slots: ["09:00", "10:00", "11:00", "15:00", "16:00"] },
      { day: "Friday", slots: ["09:00", "10:00", "11:00", "15:00"] },
    ],
    reviews: [
      {
        id: 1,
        patientName: "Hassan Ali",
        rating: 5,
        comment: "Dr. Hassan performed my cataract surgery excellently. My vision is perfect now!",
        date: "2024-01-19",
      },
    ],
  },
  "10": {
    id: "10",
    name: "Dr. Maria Garcia",
    specialty: "Endocrinologist",
    avgRating: 4.8,
    totalRating: 178,
    photo: "/assets/images/doctor-img01.png",
    totalPatients: 750,
    hospital: "Diabetes & Hormone Center, Comilla.",
    ticketPrice: 175,
    experience: "12+ years",
    about:
      "Dr. Maria Garcia is an expert endocrinologist specializing in diabetes, thyroid disorders, and hormonal imbalances. She provides comprehensive care for metabolic disorders.",
    qualifications: [
      "MBBS - Comilla Medical College",
      "MD in Endocrinology - BIRDEM",
      "Certificate in Diabetes Management - Australia",
    ],
    experiences: [
      {
        position: "Senior Endocrinologist",
        hospital: "Diabetes & Hormone Center",
        duration: "2017 - Present",
      },
      {
        position: "Endocrinologist",
        hospital: "BIRDEM General Hospital",
        duration: "2012 - 2017",
      },
    ],
    timeSlots: [
      { day: "Monday", slots: ["10:00", "11:00", "12:00", "15:00", "16:00"] },
      { day: "Tuesday", slots: ["10:00", "11:00", "12:00", "15:00", "16:00"] },
      { day: "Wednesday", slots: ["10:00", "11:00", "12:00"] },
      { day: "Thursday", slots: ["10:00", "11:00", "12:00", "15:00", "16:00"] },
      { day: "Friday", slots: ["10:00", "11:00", "12:00", "15:00"] },
    ],
    reviews: [
      {
        id: 1,
        patientName: "Carlos Rodriguez",
        rating: 5,
        comment: "Dr. Garcia helped me manage my diabetes effectively. Excellent endocrinologist!",
        date: "2024-01-21",
      },
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const doctor = doctorDetails[params.id as keyof typeof doctorDetails]

    if (!doctor) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 })
    }

    return NextResponse.json({ doctor })
  } catch (error) {
    console.error("Get doctor details error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
