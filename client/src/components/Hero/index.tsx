import FireworksBackgroundDemo from "../fireworks"

export default function HeroSection() {
    return (
        <>
            {/* Hero - Large Screens */}
            <div className="hidden lg:flex h-screen justify-center items-center">
                <div className="h-full w-1/2" style={{
                    backgroundImage: "url('/birthdayshoot/If 12.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top"
                }}>

                </div>
                <div className="flex flex-col justify-center items-center gap-8 w-1/2">
                    <div className="font-priest text-[5rem] flex flex-col justify-center items-center gap-2 text-[#e45781]">
                    <span>Hephzibah</span>
                    <span>Ifeoluwa</span> 
                    <span>Folami</span>
                    </div>
                    <div className="text-lg text-center font-semibold tracking-widest text-[#e45781] flex flex-col gap-4">
                    <h4 className="text-2xl">v25.0.0</h4>
                    <p>PEACE. ABUNDANCE. SOFT LIFE.</p>
                    </div>
                </div>
                
                <FireworksBackgroundDemo population={3} />
            </div>
                
            {/* Hero - Mobile */}
            <div className="lg:hidden flex h-screen justify-center items-center"
            style={{
            backgroundImage: "url('/birthdayshoot/If 12.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
            }}>

                <div className="absolute inset-0 bg-black/70 shadow-inner-dark"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
                    <div className="font-priest text-[5rem] flex flex-col justify-center items-center gap-2 text-[#e45781]">
                    <span>Hephzibah</span>
                    <span>Ifeoluwa</span> 
                    <span>Folami</span>
                    </div>
                    <div className="text-lg text-center font-semibold tracking-widest text-[#e45781] flex flex-col gap-4">
                    <h4 className="text-2xl">v25.0.0</h4>
                    <p>PEACE. ABUNDANCE. <span className="block">SOFT LIFE.</span></p>
                    </div>
                </div>
                
                <FireworksBackgroundDemo population={3} />
            </div>
        </>
    )
}