import { useState, useRef, useEffect } from 'react';

const AUTO_PLAY_INTERVAL = 4000; // 4 seconds

// Gallery images from birthdayshoot folder
const availableNumbers = [12, 2, 9, 3, 10, 4, 11, 5, 17, 6, 13, 1, 14, 7, 16];
const galleryImages = availableNumbers.map(num => `/birthdayshoot/If ${num}.jpg`);

// Preload images
const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

type CardPosition = 'prev' | 'current' | 'next';

export default function PhotoshootGallery() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const intervalRef = useRef<number | null>(null);

  // Preload all images on mount
  useEffect(() => {
    preloadImages(galleryImages);
  }, []);

  useEffect(() => {
    if (isAutoPlaying && galleryImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === galleryImages.length - 1 ? 0 : prev + 1
        );
      }, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % galleryImages.length;
    goToSlide(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx =
      currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    goToSlide(prevIdx);
  };

  const getWrappedIndex = (index: number) => {
    if (index < 0) return galleryImages.length + index;
    return index % galleryImages.length;
  };

  const prevIndex = getWrappedIndex(currentIndex - 1);
  const nextIndex = getWrappedIndex(currentIndex + 1);

  const getCardStyle = (position: CardPosition): React.CSSProperties => {
    const styles = {
      prev: { 
        left: '50%',
        transform: 'translateX(calc(-50% + 100px)) scale(0.85)',
        opacity: 0.6,
        zIndex: 1
      },
      current: { 
        left: '50%',
        transform: 'translateX(-50%) scale(1)',
        opacity: 1,
        zIndex: 10
      },
      next: { 
        left: '50%',
        transform: 'translateX(calc(-50% - 100px)) scale(0.85)',
        opacity: 0.6,
        zIndex: 1
      },
    };
    return styles[position];
  };

  const renderCard = (imageUrl: string, position: CardPosition, index: number) => {
    const style = getCardStyle(position);

    return (
      <div
        key={`card-${index}`}
        style={style}
        className={`absolute top-1/2 -translate-y-1/2
          ${position === "current" ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`flex flex-col overflow-hidden relative
          w-72 h-96 md:w-80 md:h-[480px] lg:w-[360px] lg:h-[520px]
          ${
            position === "current"
              ? "hover:-translate-y-2"
              : "brightness-90"
          }`}
        >
          <div className="relative w-full h-fit overflow-hidden rounded-2xl">
            <img
              src={imageUrl}
              alt="Gallery photo"
              loading="eager"
              decoding="async"
              className="w-full h-full rounded-2xl object-contain shadow-2xl"
            //   style={{
            //     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 20px -5px rgba(0, 0, 0, 0.4)'
            //   }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div
        className="w-full py-16 md:py-12 lg:py-20 overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col justify-center items-center mb-12 relative z-10">
          <h3 className="font-priest text-2xl lg:text-4xl mb-4 sm:mb-6 text-center text-[#f8f4f7]">
            Quarter Century Portraits
          </h3>
          <p className="text-base tracking-[0.3em] text-center text-[#f8f4f7] max-w-2xs sm:max-w-none mb-4 sm:mb-0">
            TWENTY FINE!
          </p>
        </div>

        <div className="flex items-center justify-center relative w-full max-w-2xl mx-auto px-4 md:px-8 lg:px-8">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute left-2 md:left-4 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 rounded-full bg-[#f8f4f7]/90 border-none text-[#e45781] cursor-pointer transition-all duration-300 flex items-center justify-center shadow-lg hover:bg-[#f8f4f7] hover:scale-110"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Carousel Track */}
          <div className="flex items-center justify-center relative w-full h-96 md:h-[400px] lg:h-[480px]">
            {galleryImages.length > 1 &&
              renderCard(galleryImages[prevIndex], "prev", prevIndex)}
            {renderCard(galleryImages[currentIndex], "current", currentIndex)}
            {galleryImages.length > 1 &&
              renderCard(galleryImages[nextIndex], "next", nextIndex)}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute right-2 md:right-4 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 rounded-full bg-[#f8f4f7]/90 border-none text-[#e45781] cursor-pointer transition-all duration-300 flex items-center justify-center shadow-lg hover:bg-[#f8f4f7] hover:scale-110"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <a href="https://drive.google.com/drive/folders/1G8QSH1cPx4Fu4tt-5ZQtIqmp5xXzhDgr?usp=drive_link" target='_blank' className='flex justify-center items-center mt-4'>
            <button
                className="px-8 py-4 bg-text text-light-pink rounded-sm bg-[#f5e4f1] text-[#e45781] font-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
                Download Pictures
            </button>
        </a>
      </div>
    </div>
  );
}