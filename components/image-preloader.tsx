"use client"

import { useEffect } from "react"

const criticalImages = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1594824475317-29bb4b1c8c8d?w=400&h=400&fit=crop&crop=face",
]

export function ImagePreloader() {
  useEffect(() => {
    // Preload critical images
    criticalImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  return null
}
