import { useEffect, useState } from "react";
import FunFacts from "./components/FunFacts"
import HeroSection from "./components/Hero"
import ThrowbackGallery from "./components/ThrowbackGallery"
import LoveWall from "./components/Wishes-LoveWall"
import PhotoshootGallery from "./components/PhotoshootGallery";
import Reflections from "./components/Reflections-Looking-Forward";
import { Globe, Heart, Mail, MessageCircle } from "lucide-react";
import { ModalBody, ModalFooter, ModalFrame, ModalHead } from "./components/modal/Modal";

function App() {
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Prevent scrolling when loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  const closeContactModal = () => setShowContactModal(false);
  const openContactModal = () => setShowContactModal(true);

  const handleContactClick = (type: string, value: string) => {
      switch (type) {
          case 'email':
              window.open(`mailto:${value}`, '_blank');
              break;
          case 'phone':
              window.open(`tel:${value}`, '_blank');
              break;
          case 'whatsapp':
              window.open(`https://wa.me/${value}`, '_blank');
              break;
          case 'website':
              window.open(value, '_blank');
              break;
          default:
              break;
      }
    };

  return (
    <>
      <div className={`bg-[#f5e4f1] z-50 fixed inset-0 ${loading ? "" : "hidden"}`}>
        <FunFacts />
      </div>
      <div className="bg-[#f5e4f1] font-rose">
        <HeroSection />

        <div className="bg-[#e45781]">
          <ThrowbackGallery />
        </div>

        <div>
          <LoveWall />
        </div>

        <div className="bg-[#e45781]">
          <PhotoshootGallery />
        </div>

        <div>
          <Reflections />
        </div>

        {/* Footer */}
        <div className="bg-[#e45781] text-[#f5e4f1] w-full flex justify-center items-center h-20">
            <p>Made with</p> 
            <Heart className="h-4 w-4 mx-1" /> 
            <p>by</p>
            <button
                onClick={openContactModal}
                className="ml-1 text-[#f5e4f1] hover:text-[#f5e4f1]/90 underline underline-offset-2 hover:underline-offset-4 transition-all duration-200 font-medium"
            >
                Ifeoluwa Folami
            </button>
        </div>

        {/* Contact Modal */}
        {showContactModal && (
            <ModalFrame onClose={closeContactModal} open={showContactModal}>
                <ModalHead>
                    Contact Developer
                </ModalHead>
                <ModalBody>
                    <div className="space-y-6">
                        <div className="text-start">
                            <h3 className="text-xl font-semibold text-[#e45781] mb-2">Ifeoluwa Folami</h3>
                            <p className="text-[#e45781]/60 mb-4">Full Stack Developer</p>
                        </div>
                        
                        <div className="space-y-4">
                            <button
                                onClick={() => handleContactClick('email', 'folamihephzibah@gmail.com')}
                                className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                            >
                                <Mail className="h-5 w-5 text-[#e45781]/60 group-hover:text-accent-pink transition-colors" />
                                <div className="text-left">
                                    <p className="font-medium text-[#e45781]">Email</p>
                                    <p className="text-sm text-[#e45781]/60">folamihephzibah@gmail.com</p>
                                </div>
                            </button>

                            <button
                                onClick={() => handleContactClick('whatsapp', '+2348138041811')}
                                className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                            >
                                <MessageCircle className="h-5 w-5 text-[#e45781]/60 group-hover:text-accent-pink transition-colors" />
                                <div className="text-left">
                                    <p className="font-medium text-[#e45781]">WhatsApp</p>
                                    <p className="text-sm text-[#e45781]/60">Send a message</p>
                                </div>
                            </button>

                            <button
                                onClick={() => handleContactClick('website', 'https://www.linkedin.com/in/ifeoluwafolami')}
                                className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                            >
                                <Globe className="h-5 w-5 text-[#e45781]/60 group-hover:text-accent-pink transition-colors" />
                                <div className="text-left">
                                    <p className="font-medium text-[#e45781]">LinkedIn</p>
                                    <p className="text-sm text-[#e45781]/60">www.linkedin.com/in/ifeoluwafolami</p>
                                </div>
                            </button>
                        </div>

                        <div className="text-center pt-4 border-t border-gray-200">
                            <p className="text-sm text-[#e45781]">
                                Available for freelance projects and collaborations
                            </p>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        onClick={closeContactModal}
                        className="px-6 py-2 bg-text text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Close
                    </button>
                </ModalFooter>
            </ModalFrame>
        )}
        
      </div>
    </>
    
  )
}

export default App