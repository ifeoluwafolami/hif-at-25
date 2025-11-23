import { motion } from "framer-motion"

export default function Cheers() {
    return (
        <>
            {/* Closing */}
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 space-y-6 mb-12 flex flex-col justify-center items-center text-center"
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
                Cheers to the birthday girl! <br />🥂🎉
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
        </>
    )
}