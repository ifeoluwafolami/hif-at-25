import { useState, useEffect } from 'react';

const COLUMNS = 3;
const WIDTH = 240;
const HEIGHT = 320;

// Responsive sizing based on screen width
const getResponsiveSizes = () => {
  if (typeof window === 'undefined') return { width: WIDTH, height: HEIGHT, columns: COLUMNS };
  
  const screenWidth = window.innerWidth;
  
  if (screenWidth < 640) { // mobile
    return { width: 140, height: 200, columns: 2 };
  } else if (screenWidth < 1024) { // tablet
    return { width: 180, height: 260, columns: 2 };
  } else { // desktop
    return { width: 240, height: 320, columns: 3 };
  }
};

interface ImageData {
  src: string;
  caption: string;
}

const allImages: ImageData[] = [
  { src: "/throwbacks/IMG-20251121-WA0048.jpg", caption: "Ife Baby!" },
  { src: "/throwbacks/IMG-20251121-WA0049.jpg", caption: "I was such a cute princess." },
  { src: "/throwbacks/IMG-20251122-WA0120.jpg", caption: "First birthday." },
  { src: "/throwbacks/IMG-20251121-WA0051.jpg", caption: "My favorite throwback 😂" },
  { src: "/throwbacks/IMG-20251121-WA0052.jpg", caption: "Such a sweet angel." },
  { src: "/throwbacks/IMG-20251121-WA0044.jpg", caption: "Big stepper!" },
  { src: "/throwbacks/IMG-20251122-WA0059.jpg", caption: "Nursery school graduation" },
  { src: "/throwbacks/IMG-20251121-WA0041.jpg", caption: "Shakira actually had nothing on me." },
  { src: "/throwbacks/IMG-20251121-WA0042.jpg", caption: "'Show us your 32!'" },
  { src: "/throwbacks/IMG-20251122-WA0071.jpg", caption: "Cool kid!" },
  { src: "/throwbacks/IMG-20251122-WA0050.jpg", caption: "Glad my tomboy era barely registered." },
  { src: "/throwbacks/IMG-20251121-WA0047.jpg", caption: "Scholar!" },
  { src: "/throwbacks/IMG-20251121-WA0045.jpg", caption: "10th birthday!" },
  { src: "/throwbacks/IMG-20251122-WA0124.jpg", caption: "Serving looks 😂" },
  { src: "/throwbacks/IMG-20251122-WA0130.jpg", caption: "First day in secondary school! 😂" },
  { src: "/throwbacks/IMG-20251122-WA0128.jpg", caption: "Big baby." },
  { src: "/throwbacks/IMG-20251122-WA0129.jpg", caption: "I used to be camera shy at some point." },
  
  { src: "/throwbacks/IMG-20251122-WA0131.jpg", caption: "Sycamore!" },
  { src: "/throwbacks/IMG-20251122-WA0133.jpg", caption: "Sitting pretty, okay!" },
  { src: "/throwbacks/IMG-20251122-WA0134.jpg", caption: "Cosplaying as an adrenaline junkie." },
  { src: "/throwbacks/IMG-20251122-WA0135.jpg", caption: "Soft girl." },
  { src: "/throwbacks/IMG-20251122-WA0136.jpg", caption: "GMNSE!!!!!" },
  { src: "/throwbacks/IMG-20251122-WA0137.jpg", caption: "Globetrotter, soon!" },
  { src: "/throwbacks/IMG-20251122-WA0138.jpg", caption: "Cape Coast, take me backkkkk." },
  { src: "/throwbacks/IMG-20251122-WA0139.jpg", caption: "Accra!" }
];

interface RotationData {
  row: number;
  col: number;
  rot: number;
  zIndex: number[];
}

interface RotationsState {
  [key: string]: RotationData;
}

const chunkArray = (myArray: ImageData[], chunkSize: number): ImageData[][] => {
  const arrayLength = myArray.length;
  const tempArray: ImageData[][] = [];
  for (let index = 0; index < arrayLength; index += chunkSize) {
    tempArray.push(myArray.slice(index, index + chunkSize));
  }
  return tempArray;
};

export default function ThrowbackGallery() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [rotations, setRotations] = useState<RotationsState>({});
  const [sizes, setSizes] = useState(getResponsiveSizes());
  const [currentSet, setCurrentSet] = useState<number>(0);

  // Display 5 images at a time, rotating through all 26 images
  const imagesPerSet = 5;
  const totalSets = Math.ceil(allImages.length / imagesPerSet);
  const displayedImages = allImages.slice(
    currentSet * imagesPerSet, 
    (currentSet + 1) * imagesPerSet
  );

  const rows: ImageData[][] = chunkArray(displayedImages, sizes.columns);
  const rowsCount: number = rows.length;

  useEffect(() => {
    const handleResize = () => {
      setSizes(getResponsiveSizes());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    updateRotations();
    setIsFirstRender(false);
  }, [isHover, sizes, currentSet]);

  // Auto-rotate through sets every 5 seconds when not hovering
  useEffect(() => {
    if (!isHover) {
      const interval = setInterval(() => {
        setCurrentSet((prev) => (prev + 1) % totalSets);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isHover, totalSets]);

  const toggleHover = (): void => setIsHover(!isHover);

  const getCenter = (row: number, col: number): { translateY: number; translateX: number } => {
    const rowOffset = rowsCount / 2 - row;
    let translateY = rowOffset * (sizes.height + 60) + rowOffset * 50;
    if (!(rowsCount % 2)) {
      if (!translateY) {
        translateY -= 205;
      } else {
        translateY /= 2;
      }
    }
    const colOffset = Math.floor(sizes.columns / 2 - col);
    const containerWidth = typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 1200) : 1200;
    let translateX =
      colOffset * (sizes.width + 40) +
      (colOffset * (containerWidth - (sizes.width + 40) * sizes.columns)) / sizes.columns;
    return {
      translateY,
      translateX
    };
  };

  const updateRotations = (): void => {
    const shuffleArray = (arr: number[]): number[] =>
      arr
        .map((a) => [Math.random(), a] as [number, number])
        .sort((a, b) => a[0] - b[0])
        .map((a) => a[1]);
    
    let indices: number[] = shuffleArray(Array.from(Array(displayedImages.length).keys()));
    const newRotations: RotationsState = {};
    
    rows.forEach((row, i) =>
      row.forEach((_col, j) => {
        const getRandom = (min: number, max: number): number =>
          Math.floor(Math.random() * (max - min + 1) + min);
        const centre = getCenter(i, j);
        let translateY = centre.translateY;
        const translateYTolerance = (sizes.height + 60) * 0.5;
        translateY += getRandom(-translateYTolerance, translateYTolerance);
        let translateX = centre.translateX;
        // Reduce tolerance on mobile to keep sprawl more centered
        const translateXTolerance = typeof window !== 'undefined' && window.innerWidth < 640 
          ? (sizes.width + 40) * 0.25 
          : (sizes.width + 40) * 0.5;
        translateX += getRandom(-translateXTolerance, translateXTolerance);
        newRotations[`${i},${j}`] = {
          row: translateY,
          col: translateX,
          rot: getRandom(-60, 60),
          zIndex: indices.splice(0, 1)
        };
      })
    );
    
    setRotations(newRotations);
  };

  const getPostcardStyle = (row: number, col: number): React.CSSProperties => {
    const key: string = `${row},${col}`;
    if (!rotations[key]) return {};
    
    return {
      width: `${sizes.width + 40}px`,
      height: `${sizes.height + 60}px`,
      transform: `translateX(${rotations[key].col}px) translateY(${rotations[key].row}px) rotateZ(${rotations[key].rot}deg)`
    };
  };

  return (
    <div className="min-h-[70vh] flex flex-col sm:flex-row items-center justify-center bg-transparent py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&family=Work+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
        
        body {
          font-family: 'Work Sans', sans-serif;
          font-weight: 500;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .gallery {
          position: relative;
          width: 100%;
          max-width: 1200px;
          perspective: 1000px;
        }
        
        .gallery__row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        
        .gallery__row + .gallery__row {
          margin-top: 30px;
        }
        
        @media (min-width: 640px) {
          .gallery__row + .gallery__row {
            margin-top: 40px;
          }
        }
        
        @media (min-width: 1024px) {
          .gallery__row + .gallery__row {
            margin-top: 50px;
          }
        }
        
        .gallery__row__image {
          text-align: center;
        }
        
        .gallery-display .postcard {
          transform: none !important;
        }
        
        .postcard {
          transform-style: preserve-3d;
          box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048), 
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072), 
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          margin: auto;
          transition: all 0.6s;
          position: relative;
          font-size: 18px;
          font-family: "Shadows Into Light", cursive;
          border-radius: 4px;
        }
        
        .postcard__front {
          background-color: floralwhite;
          box-sizing: border-box;
          padding: 12px 12px 32px 12px;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
        
        .postcard__image {
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .postcard__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .postcard__caption {
          width: 100%;
          padding-top: 8px;
          text-align: center;
          font-size: 14px;
          color: #333;
          font-family: "Shadows Into Light", cursive;
        }
        
        @media (min-width: 640px) {
          .postcard__front {
            padding: 16px 16px 40px 16px;
          }
          .postcard__caption {
            font-size: 16px;
          }
        }
        
        @media (min-width: 1024px) {
          .postcard__front {
            padding: 20px 20px 50px 20px;
          }
          .postcard__caption {
            font-size: 18px;
          }
        }
      `}</style>
      
      <div className='flex flex-col'>
        <h3 className='font-priest text-3xl lg:text-5xl mb-2 sm:mb-6 text-center text-[#f8f4f7]'>From The Vault</h3>
        <p className='text-base text-center text-[#f8f4f7] mb-6 sm:mb-0'>(Proof that I have always been a pretty girl!)</p>
        <p className='hidden sm:flex text-xs text-center font-black text-[#f8f4f7] absolute top-[95%] left-[50%] sm:mb-0'>HOVER ON PICTURE STASH TO OPEN. <span className='mx-1 underline cursor-pointer'>HOVER HERE</span> TO CHANGE TO A NEW SET.</p>
      </div>
      
      <div 
        className={`gallery ${isHover ? 'gallery-display' : ''}`}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        <div>
          {rows.map((row, rowIndex) => (
            <div className="gallery__row" key={rowIndex}>
              {row.map((imageData, imageIndex) => (
                <div 
                  className="gallery__row__image" 
                  style={{ width: `${100 / sizes.columns}%` }} 
                  key={imageIndex}
                >
                  <div 
                    className="postcard" 
                    style={!isFirstRender ? getPostcardStyle(rowIndex, imageIndex) : {}}
                  >
                    <div className="postcard__front">
                      <div className="postcard__image">
                        <img src={imageData.src} alt={imageData.caption} />
                      </div>
                      <div className="postcard__caption">
                        {imageData.caption}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className='flex sm:hidden'>
      <p className='text-xs text-center font-black text-[#f8f4f7] mt-6 sm:mb-0'>CLICK ON PICTURE STASH TO OPEN. <br></br> <span className='mx-1 underline cursor-pointer'>CLICK HERE</span> TO CHANGE TO A NEW SET.</p>
      </div>          
      
      
      {/* Set indicator dots */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {Array.from({ length: totalSets }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSet(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSet === index ? 'bg-[#f8f4f7] w-6' : 'bg-[#f8f4f7]/50'
            }`}
            aria-label={`Go to set ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
}