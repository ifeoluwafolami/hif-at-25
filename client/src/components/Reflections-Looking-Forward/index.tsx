import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Reflections() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  const sections = [
//     {
//       title: "Gratitude",
//       content: `It's just a few hours to 25, and I'm excited, super hyper and immensely grateful to God for bringing me this far. 24 was a beautiful year. There were so many firsts, lots of stress (side-eye, NYSC); but most importantly I had fun, felt loved by my people, and made lots of unforgettable memories.

// This year would have been pure chaos if Abba hadn't been in my corner as He always is, holding my hand and guiding me along the path He prepared for me. God is a girl dad, as I always say. He took such intentional care of me this year, opening doors and helping me bloom in ways that still surprise me.`
//     },
//     {
//       title: "Thank You Notes",
//       content: `Thank you to my parents for raising me, praying for me, pampering (and occasionally scolding) me, and being my biggest cheerleaders. I love you both endlessly.

// Thank you to all my friends who held me down this year; showing up for me and making sure I was always in the right headspace. I love you guys downnnnn.

// A special thank you to Dara, as always. Doing life with you in my corner is one of God's most thoughtful gifts to me. Thank you for all the shouting, worrying, and praying. You are the bestest best friend in the world, always!

// Thank you to my uncles and aunties who add so much spice to my life. I appreciate all the babying, care and love. And thank you to everyone I encountered this past year. One way or another, you contributed to the person I am now.

// Finally, to my partner-in-crime (and the best daddy ever), DFo! Thank you for being my coach, consultant and friend. You'll always be my favourite co-celebrant!`
//     },
    {
      title: "Looking Forward",
      content: `Twenty-five is going to be an extraordinary year, by God's grace. I'm stepping into it with lots of excitement and tons of hopeful expectations. My little wishlist for this new chapter: building a fulfilling career, trying new things that push me out of my comfort zone, and (of course) taking over the world, one step at a time.`
    }
  ];

  return (
    <div className="min-h-screen font-rose overflow-x-hidden">

      <motion.div 
      style={{ opacity }}
        className="container mx-auto px-4 py-16 max-w-6xl"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="font-priest text-4xl lg:text-6xl text-[#e45781] mb-4"
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Looking Forward
          </motion.h1>
          {/* <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 w-32 bg-linear-to-r from-[#e45781] to-pink-300 mx-auto rounded-full"
          /> */}
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="lg:hidden mb-8 relative"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl max-w-2xs mx-auto"
          >
            {/* <div className="absolute inset-0 bg-linear-to-t from-[#e45781]/20 to-transparent z-10" /> */}
            <img 
              src="/birthdayshoot/If 10.jpg" 
              alt="Birthday Celebration"
              className="w-full h-auto"
            />
            {/* <motion.div
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 z-20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <span className="font-priest text-2xl text-[#e45781]">25 🎉</span>
            </motion.div> */}
          </motion.div>
        </motion.div>

        {/* Content Sections */}
        <div className="lg:hidden space-y-12 flex flex-col justify-center items-center">
          {sections.map((_section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              className="px-8 md:px-12 max-w-xl lg:max-w-2xl border border-pink-100"
            >
              
              <motion.p 
                className="text-[#e45781] text-lg md:text-xl leading-relaxed whitespace-pre-line text-justify"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.2 }}
              >
                Twenty-five is going to be an extraordinary year, by God's grace. I'm stepping into it with lots of excitement and tons of hopeful expectations. <span className='block font-black underline underline-offset-2 mt-4 '>My checklist for this new chapter:</span>
                
                 Working actively towards building a fulfilling career, trying new things that push me out of my comfort zone, and <span className='font-black italic'>(of course!)</span> taking over the world, one step at a time.
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Large Screens */}
        <div className='hidden lg:flex justify-center items-center mt-12'>
            <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8 relative"
            >
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl max-w-2xs mx-auto"
            >
                {/* <div className="absolute inset-0 bg-linear-to-t from-[#e45781]/20 to-transparent z-10" /> */}
                <img 
                src="/birthdayshoot/If 10.jpg" 
                alt="Birthday Celebration"
                className="w-full h-auto"
                />
                {/* <motion.div
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 z-20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                <span className="font-priest text-2xl text-[#e45781]">25 🎉</span>
                </motion.div> */}
            </motion.div>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-12 flex flex-col justify-center items-center">
            {sections.map((_section, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                className="px-8 md:px-12 max-w-xl lg:max-w-2xl border border-pink-100"
                >
                
                <motion.p 
                    className="text-[#e45781] text-lg md:text-xl leading-relaxed whitespace-pre-line text-justify"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                >
                    Twenty-five is going to be an extraordinary year, by God's grace. I'm stepping into it with lots of excitement and tons of hopeful expectations. <span className='block font-black underline underline-offset-2 mt-4 '>My checklist for this new chapter:</span>
                    
                    Working actively towards building a fulfilling career, trying new things that push me out of my comfort zone, and <span className='font-black italic'>(of course!)</span> taking over the world, one step at a time.
                </motion.p>
                </motion.div>
            ))}
            </div>   
        </div>
        

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16 space-y-6"
        >
          <motion.p 
            className="font-priest text-5xl md:text-6xl text-[#e45781] leading-20"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(228, 87, 129, 0.3)",
                "0 0 20px rgba(228, 87, 129, 0.5)",
                "0 0 10px rgba(228, 87, 129, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Cheers to the birthday girl! 🥂🎉
          </motion.p>
          <motion.p 
            className="text-[#e45781] text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            See you this time next year! ❤
          </motion.p>
          <motion.p 
            className="font-priest text-3xl md:text-4xl text-[#e45781] mt-4"
            whileHover={{ scale: 1.1 }}
          >
            - H. I. Folami
          </motion.p>
        </motion.div>

        {/* Confetti effect */}
        {/* <div className="fixed inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-[#e45781] rounded-full opacity-60"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -20,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: 360,
                opacity: [0.6, 0.3, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div> */}
      </motion.div>
    </div>
  );
}