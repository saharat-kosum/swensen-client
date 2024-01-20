"use client"
import { useState } from "react";

interface CarouselProps {
  slides : string[]
}

export default function Carousel({ slides } : CarouselProps ) {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative max-w-96">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, i) => <img src={s} key={i} />)}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-[#e21c23] px-3 text-3xl">
        <button className="bg-[rgba(255,255,255,0.9)] p-2 rounded-full" onClick={previousSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button className="bg-[rgba(255,255,255,0.9)] p-2 rounded-full" onClick={nextSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-3 w-full relative z-30">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-6 h-2 cursor-pointer  ${
                i == current ? "bg-[#e21c23]" : "bg-gray-200"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}