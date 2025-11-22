import { useEffect, useState } from "react";

export default function FunFacts() {
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

    const [factNumber, setFactNumber] = useState(0);
    const [randomFact, setRandomFact] = useState("");
    const [randomImage, setRandomImage] = useState("");

    useEffect(() => {
        // Get random fun fact
        const factIndex = Math.floor(Math.random() * funFacts.length);
        setFactNumber(factIndex);
        setRandomFact(funFacts[factIndex]);

        // Get random image (1-17)
        const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const imageNumber = availableNumbers[randomIndex];
        setRandomImage(`/birthdayshoot/If ${imageNumber}.jpg`);
    }, []);

    if (!randomFact || !randomImage) {
        return <div className="flex flex-col items-center justify-center h-screen w-full p-8"></div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full p-8">
            <div className="max-w-lg w-full bg-[#f5e4f1]/10 border border-[#e45781] backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <img 
                    src={randomImage} 
                    alt="Birthday memories" 
                    className="max-w-full h-60 object-fit object-top mb-6 rounded-2xl overflow-hidden shadow-lg mx-auto"
                />
                
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#e45781] mb-4 font-priest">Random Fact {factNumber + 1}/25</h2>
                    <p className="text-base font-rose text-[#e45781]/90 leading-relaxed">
                        {randomFact}
                    </p>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-[#e45781] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-3 h-3 bg-[#e45781] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-3 h-3 bg-[#e45781] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}