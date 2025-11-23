import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export default function FunFactsDisplay() {
    const funFacts = [
        "I am left handed (this is almost always my go-to when asked for a fun fact).",
        "My catchphrase: 'I'm just a baby!'",
        "I love talking about Nigeria's power sector. TCN baby for lifeeee.",
        "I never thought of myself as an artsy or design girlie until I became a frontend dev.",
        "My favorite color is pink. I have a ridiculous number of things that I bought simply because they were pink.",
        "I hate the cold. I sneeze a lot and I always have cold feet.",
        "I'd rather go on an hour-long walk than a ten minute run.",
        "I learned all my baking recipes from TikTok. I find the process of baking super therapeutic.",
        "I will always answer the 'Are you a feminist?' question with a YES.",
        "I am OBSESSED with Hamilton: The Musical. I can sing most songs word for word.",
        "Red velvet is my favorite cake flavor.",
        "I want to travel the world. There's so much to see.",
        "My favorite fictional character is Villanelle from Killing Eve, and I dislike people that claim the show's finale was a good ending.",
        "I like high heels as a concept and I think they are super pretty, but I despise having to wear them.",
        "I think people should endeavor to be kinder, myself included.",
        "I take a lot of pictures and videos, but rarely of myself. I've been intentional about fixing that this past year.",
        "I prefer cats to dogs. Less clingy.",
        "I talk to myself A LOT. I don't understand how people don't do that.",
        "I run a strict reward system. Hard tasks/days deserve a sweet treat.",
        "I don't like extremely loud music and crowded places.",
        "I have become a tea connoisseur, which is hilarious because earlier this year, I used to favor coffee more.",
        "I love trying out new recipes and feeding my people (Don't ask me to feed you, please.)",
        "My music taste basically boils down to gospel, Taylor Swift and Hamilton.",
        "I love to yap. But only with people I'm comfortable with, please.",
        "I find it very comforting when people claim that I give off last born energy. It used to bother me before but now I looooove it.",
    ];

    const availableImages = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [imageMap, setImageMap] = useState<Record<number, string>>({});

    // Generate random images for each fact on mount
    useEffect(() => {
        const newImageMap: Record<number, string> = {};
        funFacts.forEach((_, index) => {
            const randomIndex = Math.floor(Math.random() * availableImages.length);
            const imageNumber = availableImages[randomIndex];
            newImageMap[index] = `/birthdayshoot/If ${imageNumber}.jpg`;
        });
        setImageMap(newImageMap);
    }, []);

    // Auto-scroll effect
    useEffect(() => {
        if (!isPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % funFacts.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [isPlaying, funFacts.length]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % funFacts.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + funFacts.length) % funFacts.length);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    if (Object.keys(imageMap).length === 0) {
        return <div className="flex flex-col items-center justify-center min-h-screen w-full p-8"></div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
            <h3 className='font-priest text-3xl lg:text-5xl mb-2 sm:mb-4 text-center text-[#e45781]'>Did You Know?</h3>
            <p className='text-base text-center text-[#e45781] mb-6'>(I bet you didn't!)</p>
            <div className="max-w-lg w-full bg-[#f5e4f1]/10 border border-[#e45781] backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <img 
                    src={imageMap[currentIndex]} 
                    alt="Birthday memories" 
                    className="max-w-full h-60 object-fit object-top mb-6 rounded-2xl overflow-hidden shadow-lg mx-auto"
                />
                
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#e45781] mb-4 font-priest">
                        Fact {currentIndex + 1}/25
                    </h2>
                    <p className="text-base font-rose text-[#e45781]/90 leading-relaxed">
                        {funFacts[currentIndex]}
                    </p>
                </div>

                {/* Progress Dots
                <div className="mt-6 flex justify-center gap-1.5 flex-wrap">
                    {funFacts.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'bg-[#e45781] w-6' 
                                    : 'bg-[#e45781]/30 hover:bg-[#e45781]/50'
                            }`}
                            aria-label={`Go to fact ${index + 1}`}
                        />
                    ))}
                </div> */}

                {/* Navigation Controls */}
                <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                        onClick={goToPrevious}
                        className="p-2 bg-[#e45781] text-white rounded-full hover:bg-[#e45781]/90 transition-all duration-200 shadow-lg hover:scale-110"
                        aria-label="Previous fact"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                        onClick={togglePlayPause}
                        className="p-2 bg-[#e45781] text-white rounded-full hover:bg-[#e45781]/90 transition-all duration-200 shadow-lg hover:scale-110"
                        aria-label={isPlaying ? "Pause auto-scroll" : "Play auto-scroll"}
                    >
                        {isPlaying ? (
                            <Pause className="h-5 w-5" />
                        ) : (
                            <Play className="h-5 w-5" />
                        )}
                    </button>

                    <button
                        onClick={goToNext}
                        className="p-2 bg-[#e45781] text-white rounded-full hover:bg-[#e45781]/90 transition-all duration-200 shadow-lg hover:scale-110"
                        aria-label="Next fact"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}