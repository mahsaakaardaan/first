'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiFillCaretLeft } from 'react-icons/ai';
import { AiFillCaretRight } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

interface Slide {
  image: string;
  text: string;
  search: string;
}

interface SliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Slider({
  slides,
  autoPlay = true,
  interval = 4000
}: SliderProps) {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  // Go to next slide
  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  // Go to previous slide
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto play effect
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  const handleSlideClick = (link?: string) => {
    if (link) router.push('/search?q=' + link);
  };

  return (
    <div className="relative w-full h-[50vh] max-md:h-[30vh] overflow-hidden shadow-lg">
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === current;

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              isActive
                ? 'opacity-100 z-10 cursor-pointer'
                : 'opacity-0 z-0'
            }`}
            onClick={() =>
              isActive && handleSlideClick(slide.search)
            }>
            <Image
              src={slide.image}
              alt={slide.text}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute bottom-0 w-full bg-black/50 text-white text-center h-full  flex items-end justify-start">
              <div className="lg:w-[20%] max-md:w-[70%] md:w-[40%] text-right mr-20 mb-8 text-xl">
                {slide.text}
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70">
        <AiFillCaretLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70">
        <AiFillCaretRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
