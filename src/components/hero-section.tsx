"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Fresh Vegetables",
    subtitle: "Farm to Table in 24 Hours",
    image: "/fresh-vegetables-market-display.jpg",
    cta: "Shop Vegetables",
  },
  {
    id: 2,
    title: "Organic Fruits",
    subtitle: "Naturally Grown, Naturally Delicious",
    image: "/fresh-colorful-fruits.jpg",
    cta: "Shop Fruits",
  },
  {
    id: 3,
    title: "Fresh Fruits",
    subtitle: "Freshness in Every Bite", // updated subtitle
    image: "/Fresh-fruits.jpg",
    cta: "Shop Fruits", // updated CTA
  },

{
  id: 4,
  title: "Organic Vegetable",
  subtitle: "Shop the Best Organic Vegetables",
  image: "/hero-vegetables.jpg",
  cta: "Shop Organic Vegetable",
},


];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-8 md:p-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              {slide.subtitle}
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition">
              {slide.cta}
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
