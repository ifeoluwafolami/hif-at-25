import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
// import { Download } from "lucide-react";
// import jsPDF from "jspdf";
import { ModalFrame, ModalHead, ModalBody, ModalFooter } from "../modal/Modal";

type Note = {
    _id?: string;
    message: string;
    signature?: string;
    timestamp?: number;
};

// const MOCK_NOTES: Note[] = [
//     {
//         _id: "mock-1",
//         message: "Wishing you a fabulous 40th birthday! May this milestone year be filled with joy, laughter, and countless blessings. You deserve all the happiness in the world!",
//         signature: "Sarah M.",
//         timestamp: Date.now()
//     },
//     {
//         _id: "mock-2",
//         message: "Happy 40th! You're not getting older, you're getting better. Here's to four decades of amazing memories and many more to come!",
//         signature: "John & Family",
//         timestamp: Date.now()
//     },
//     {
//         _id: "mock-3",
//         message: "Cheers to 40 years of being absolutely wonderful! May your special day be as bright and beautiful as you are. 🎉",
//         signature: "Michael",
//         timestamp: Date.now()
//     },
//     {
//         _id: "mock-4",
//         message: "40 looks amazing on you! Wishing you health, wealth, and endless happiness. Celebrate big today!",
//         signature: "The Johnsons",
//         timestamp: Date.now()
//     },
//     {
//         _id: "mock-5",
//         message: "Happy Birthday! Four decades of making the world a better place. Thank you for being such an inspiration to us all.",
//         signature: "Emily R.",
//         timestamp: Date.now()
//     },
//     {
//         _id: "mock-6",
//         message: "Welcome to the fabulous 40s club! May this year bring you everything your heart desires and more. You're simply the best!",
//         signature: "David & Grace",
//         timestamp: Date.now()
//     },
//     {
//         _id: "mock-7",
//         message: "40 never looked so good! Here's to celebrating you today and always. Wishing you love, joy, and all things wonderful. 💖",
//         signature: "Lisa",
//         timestamp: Date.now()
//     },
//     {
//         _id: "mock-8",
//         message: "Happy 40th Birthday! May your day be filled with love, laughter, and unforgettable moments with those you cherish most.",
//         signature: "The Martinez Family",
//         timestamp: Date.now()
//     },
//     {
//         _id: "mock-9",
//         message: "Congratulations on 40 amazing years! You inspire everyone around you. Here's to many more years of success and happiness!",
//         signature: "Robert & Angela",
//         timestamp: Date.now()
//     },
//     {
//         _id: "mock-10",
//         message: "Forty and fabulous! Wishing you a birthday as special as you are. May all your dreams continue to come true. 🌟",
//         signature: "Christina",
//         timestamp: Date.now()
//     },
//     {
//         _id: "mock-11",
//         message: "Happy Birthday! Thank you for being such a blessing in our lives. May your 40th year be your best one yet!",
//         signature: "The Williams",
//         timestamp: Date.now()
//     },
//     {
//         _id: "mock-12",
//         message: "Cheers to 40 years of greatness! May your birthday be filled with love, joy, and all your favorite things. You deserve it all!",
//         signature: "James & Karen",
//         timestamp: Date.now()
//     }
// ];


// Component for rendering individual note cards
const NoteCard = ({ 
    note, 
    editingNote, 
    editTimeLeft, 
    onEditNote 
}: {
    note: Note;
    editingNote: Note | null;
    editTimeLeft: number;
    onEditNote: (note: Note) => void;
}) => {
    const isEditing = editingNote?._id === note._id;
    
    return (
        <div className="mx-4">
            <div 
                data-note-id={note._id}
                className={`bg-white text-[#e45781] px-6 shadow-lg hover:scale-105 transition-transform duration-300 max-w-sm h-80 w-80 flex flex-col justify-center rounded-2xl relative ${
                    isEditing ? 'ring-2 ring-[#e45781]' : ''
                }`}
            >
                {isEditing && (
                    <div className="absolute top-2 right-2">
                        <button
                            onClick={() => onEditNote(note)}
                            className="text-xs bg-[#e45781]/20 text-[#e45781] px-2 py-1 rounded-full hover:bg-[#e45781]/30 transition-colors"
                        >
                            Edit ({editTimeLeft}s)
                        </button>
                    </div>
                )}
                <p className="text-[#c01b4d] text-center leading-relaxed mb-4">
                    {note.message}
                </p>
                {note.signature && (
                    <p className="text-[#e45781] text-right italic text-sm">
                        - {note.signature}
                    </p>
                )}
            </div>
        </div>
    );
};

// Component for rendering marquee with notes
const NotesMarquee = ({ 
    notes, 
    direction, 
    editingNote, 
    editTimeLeft, 
    onEditNote,
    className = ""
}: {
    notes: Note[];
    direction: "left" | "right";
    editingNote: Note | null;
    editTimeLeft: number;
    onEditNote: (note: Note) => void;
    className?: string;
}) => {
    const displayNotes = notes.length <= 10 
        ? [...notes, ...notes] 
        : notes;

    return (
        <Marquee
            gradient={false}
            gradientColor="#e45781"
            gradientWidth={100}
            speed={60}
            pauseOnHover={true}
            className={`h-82 my-4 overflow-hidden ${className}`}
            direction={direction}
        >
            {displayNotes.map((note, index) => (
                <NoteCard
                    key={`${direction}-${note._id || `temp-${index}`}-${index}`}
                    note={note}
                    editingNote={editingNote}
                    editTimeLeft={editTimeLeft}
                    onEditNote={onEditNote}
                />
            ))}
        </Marquee>
    );
};

interface WellWishesSectionProps {
    apiBaseUrl?: string;
}

export default function WellWishesSection({ apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000" }: WellWishesSectionProps) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [noteMessage, setNoteMessage] = useState("");
    const [noteSignature, setNoteSignature] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [editTimeLeft, setEditTimeLeft] = useState(0);
    const [useMockData, setUseMockData] = useState(false);
    // const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
    // const [pdfProgress, setPdfProgress] = useState(0);
    // const [pdfProgressText, setPdfProgressText] = useState('');
    
    const maxCharacters = 300;

    // Edit timer hook
    useEffect(() => {
        let timer: number;
        if (editTimeLeft > 0) {
            timer = setTimeout(() => setEditTimeLeft(editTimeLeft - 1), 1000);
        } else if (editingNote) {
            setEditingNote(null);
        }
        return () => clearTimeout(timer);
    }, [editTimeLeft, editingNote]);

    // Scroll to editing note
    useEffect(() => {
        if (editingNote && editTimeLeft > 0) {
            const noteElement = document.querySelector(`[data-note-id="${editingNote._id}"]`);
            if (noteElement) {
                noteElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'center'
                });
            }
        }
    }, [editingNote, editTimeLeft]);

    // Fetch notes on component mount
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/api/notes`); 
                if (!response.ok) {
                    throw new Error("Failed to fetch notes.");
                }
                const data = await response.json();
                setNotes(data);
                setUseMockData(false);
            } catch (error) {
                console.warn("Backend not connected, using mock data for development:", error);
                // Use mock data if backend is not available
                // setNotes(MOCK_NOTES);
                // setUseMockData(true);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [apiBaseUrl]);

    // API functions
    const submitNote = async (message: string, signature: string): Promise<Note> => {
        const response = await fetch(`${apiBaseUrl}/api/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, signature })
        });

        if (!response.ok) {
            throw new Error("Failed to submit note");
        }
        return await response.json();
    };

    const updateNote = async (noteId: string, message: string, signature: string): Promise<Note> => {
        const response = await fetch(`${apiBaseUrl}/api/notes/${noteId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, signature })
        });

        if (!response.ok) {
            throw new Error("Failed to update note");
        }
        return await response.json();
    };

    // Utility function to clean text for PDF
    // const cleanTextForPdf = (text: string): string => {
    //     return text
    //         .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
    //         .replace(/[\u{1F300}-\u{1F5FF}]/gu, '')
    //         .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
    //         .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '')
    //         .replace(/[\u{2600}-\u{26FF}]/gu, '')
    //         .replace(/[\u{2700}-\u{27BF}]/gu, '')
    //         .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')
    //         .replace(/[\u{1F018}-\u{1F270}]/gu, '')
    //         .replace(/[\u{238C}-\u{2454}]/gu, '')
    //         .replace(/[\u{20D0}-\u{20FF}]/gu, '')
    //         .trim()
    //         .replace(/\s+/g, ' ');
    // };

    // const updateProgress = (percentage: number, text: string) => {
    //     setPdfProgress(percentage);
    //     setPdfProgressText(text);
    //     return new Promise(resolve => setTimeout(resolve, 50));
    // };

    // PDF Download function
    // const handleDownloadNotesPdf = async () => {
    //     if (notes.length === 0) {
    //         alert('No notes available to download.');
    //         return;
    //     }

    //     setIsDownloadingPdf(true);
    //     setPdfProgress(0);
    //     setPdfProgressText('Initializing PDF generation...');

    //     try {
    //         await updateProgress(10, 'Creating PDF document...');
    //         const doc = new jsPDF();
            
    //         await updateProgress(20, 'Setting up document structure...');
            
    //         const darkPink: [number, number, number] = [139, 69, 119];
    //         const textColor: [number, number, number] = [64, 64, 64];
    //         const lightGray: [number, number, number] = [128, 128, 128];

    //         doc.setFontSize(24);
    //         doc.setTextColor(darkPink[0], darkPink[1], darkPink[2]);
    //         doc.setFont(undefined, 'bold');
    //         doc.text('Birthday Wishes', 105, 30, { align: 'center' });
            
    //         doc.setFontSize(14);
    //         doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    //         doc.setFont(undefined, 'normal');
    //         doc.text('Well Wishes from Family & Friends', 105, 45, { align: 'center' });
            
    //         doc.setDrawColor(darkPink[0], darkPink[1], darkPink[2]);
    //         doc.setLineWidth(0.5);
    //         doc.line(20, 55, 190, 55);

    //         await updateProgress(30, 'Adding header and formatting...');

    //         let yPosition = 75;
    //         const pageHeight = doc.internal.pageSize.height;
    //         const margin = 20;
    //         const bottomMargin = 30;

    //         const totalNotes = notes.length;
    //         let processedNotes = 0;

    //         for (const [index, note] of notes.entries()) {
    //             if (index % Math.max(1, Math.floor(totalNotes / 10)) === 0) {
    //                 const progressPercent = 30 + Math.floor((processedNotes / totalNotes) * 50);
    //                 await updateProgress(progressPercent, `Processing note ${index + 1} of ${totalNotes}...`);
    //             }

    //             const estimatedHeight = 40;
    //             if (yPosition + estimatedHeight > pageHeight - bottomMargin) {
    //                 doc.addPage();
    //                 yPosition = 30;
    //             }

    //             doc.setFontSize(12);
    //             doc.setTextColor(darkPink[0], darkPink[1], darkPink[2]);
    //             doc.setFont(undefined, 'bold');
    //             doc.text(`${index + 1}.`, margin, yPosition);

    //             doc.setFontSize(11);
    //             doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    //             doc.setFont(undefined, 'normal');
                
    //             const cleanedMessage = cleanTextForPdf(note.message);
    //             const messageLines = doc.splitTextToSize(cleanedMessage, 150);
    //             doc.text(messageLines, margin + 10, yPosition);
                
    //             yPosition += messageLines.length * 5;

    //             if (note.signature) {
    //                 doc.setFontSize(10);
    //                 doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    //                 doc.setFont(undefined, 'italic');
    //                 const cleanedSignature = cleanTextForPdf(note.signature);
    //                 doc.text(`- ${cleanedSignature}`, margin + 10, yPosition + 5);
    //                 yPosition += 10;
    //             }

    //             yPosition += 15;

    //             if ((index + 1) % 3 === 0 && index < notes.length - 1) {
    //                 doc.setDrawColor(200, 200, 200);
    //                 doc.setLineWidth(0.2);
    //                 doc.line(margin, yPosition - 5, 190, yPosition - 5);
    //                 yPosition += 5;
    //             }

    //             processedNotes++;
    //         }

    //         await updateProgress(85, 'Adding page numbers and footers...');

    //         const totalPages = doc.internal.getNumberOfPages();
    //         for (let i = 1; i <= totalPages; i++) {
    //             doc.setPage(i);
    //             doc.setFontSize(8);
    //             doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    //             doc.text(`Generated on ${new Date().toLocaleDateString()} | Page ${i} of ${totalPages}`, 105, pageHeight - 10, { align: 'center' });
    //         }

    //         await updateProgress(95, 'Finalizing PDF...');

    //         const fileName = `Birthday_Wishes_${new Date().toISOString().split('T')[0]}.pdf`;
            
    //         await updateProgress(100, 'Download starting...');
    //         await new Promise(resolve => setTimeout(resolve, 500));
            
    //         doc.save(fileName);

    //     } catch (error) {
    //         console.error('Error generating PDF:', error);
    //         alert('There was an error generating the PDF. Please try again.');
    //     } finally {
    //         setIsDownloadingPdf(false);
    //         setPdfProgress(0);
    //         setPdfProgressText('');
    //     }
    // };

    // Event handlers
    const handleSubmitNote = async () => {
        if (!noteMessage.trim()) return;

        // If using mock data, just add to local state
        if (useMockData) {
            const newMockNote: Note = {
                _id: `mock-${Date.now()}`,
                message: noteMessage,
                signature: noteSignature,
                timestamp: Date.now()
            };
            setNotes(prev => [...prev, newMockNote]);
            setShowNoteModal(false);
            setNoteMessage("");
            setNoteSignature("");
            alert("Note added! (Using mock data - connect backend to persist)");
            return;
        }

        setIsSubmitting(true);
        try {
            if (editingNote) {
                const updatedNote = await updateNote(editingNote._id!, noteMessage, noteSignature);
                setNotes(prev => prev.map(note => 
                    note._id === editingNote._id ? updatedNote : note
                ));
                setEditingNote(null);
                setEditTimeLeft(0);
            } else {
                const newNote = await submitNote(noteMessage, noteSignature);
                setNotes(prev => [...prev, newNote]);
                setEditingNote(newNote);
                setEditTimeLeft(10);
            }
            
            setShowNoteModal(false);
            setNoteMessage("");
            setNoteSignature("");
        } catch (error) {
            console.error("Error submitting note:", error);
            alert("Failed to submit note. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditNote = (note: Note) => {
        setEditingNote(note);
        setNoteMessage(note.message);
        setNoteSignature(note.signature || "");
        setShowNoteModal(true);
    };

    const handleAddNote = () => {
        setNoteMessage("");
        setNoteSignature("");
        setEditingNote(null);
        setShowNoteModal(true);
    };

    const closeModal = () => setShowNoteModal(false);

    // Show loading state or display notes
    const displayNotes = loading ? [] : notes;

    return (
        <div className="min-h-screen flex flex-col py-8 lg:py-12 justify-center items-center">
            {/* Development Mode Indicator */}
            {/* {useMockData && (
                <div className="mb-4 px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800 text-sm">
                    🚧 Development Mode - Using mock data (Backend not connected)
                </div>
            )} */}
            
            <h1 className="font-priest text-4xl px-4 text-center lg:text-6xl text-[#e45781] drop-shadow-lg">
                The Love Wall
            </h1>
            <p className="text-base font-bold mt-4 sm:mt-6 max-w-3xs mb-4 sm:max-w-none text-center text-[#e45781]">Leave well wishes, prayers or a fun anecdote here!</p>

            {loading ? (
                <div className="my-12 text-center">
                    <p className="text-[#e45781] text-lg">Loading wishes...</p>
                </div>
            ) : displayNotes.length === 0 ? (
                <div className="my-12 text-center">
                    <p className="text-[#e45781] text-lg">No wishes yet. Be the first to leave a note! 💝</p>
                </div>
            ) : (
                <>
                    <NotesMarquee
                        notes={displayNotes}
                        direction="right"
                        editingNote={editingNote}
                        editTimeLeft={editTimeLeft}
                        onEditNote={handleEditNote}
                        className="mt-2"
                    />

                    {/* <NotesMarquee
                        notes={displayNotes}
                        direction="left"
                        editingNote={editingNote}
                        editTimeLeft={editTimeLeft}
                        onEditNote={handleEditNote}
                        className=""
                    /> */}
                </>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                    onClick={handleAddNote}
                    className="px-8 py-4 bg-text text-light-pink font-semibold rounded-sm bg-[#e45781] text-[#f5e4f1] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                    💌 Leave a Note
                </button>
                
                {/* <button
                    onClick={handleDownloadNotesPdf}
                    disabled={isDownloadingPdf || notes.length === 0}
                    className="px-8 py-4 bg-gradient-to-r from-accent-pink to-text text-light-pink font-liberty font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 relative overflow-hidden"
                >
                    {isDownloadingPdf && (
                        <>
                            <div className="absolute inset-0 bg-black/10 rounded-full"></div>
                            <div 
                                className="absolute left-0 top-0 h-full bg-white/20 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${pdfProgress}%` }}
                            ></div>
                        </>
                    )}
                    <Download className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">
                        {isDownloadingPdf 
                            ? (
                                <span className="flex flex-col items-center">
                                    <span className="text-sm">{Math.round(pdfProgress)}%</span>
                                    <span className="text-xs opacity-90">{pdfProgressText}</span>
                                </span>
                            ) 
                            : '📄 Download All Notes'
                        }
                    </span>
                </button> */}
            </div>

            <p className="flex flex-col text-sm font-bold mt-4 sm:mt-6 max-w-2xs mb-4 sm:max-w-none text-center text-[#e45781]">
                <span>Want to send a longer message?</span> 
                <span><a href="mailto:folamihephzibah@gmail.com" className="underline hover:text-[#c01b4d] transition-colors">Send me an email!</a> I love those.</span>
            </p>
                

            {/* Note Modal */}
            {showNoteModal && (
                <ModalFrame onClose={closeModal} open={showNoteModal}>
                    <ModalHead>
                        {editingNote ? 'Edit Your Note' : 'Leave a Note for the Celebrant'}
                    </ModalHead>
                    <ModalBody>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-[#e45781] mb-2">
                                    Your Message *
                                </label>
                                <textarea
                                    id="message"
                                    value={noteMessage}
                                    onChange={(e) => {
                                        if (e.target.value.length <= maxCharacters) {
                                            setNoteMessage(e.target.value);
                                        }
                                    }}
                                    placeholder="Share your birthday wishes and kind words for the celebrant!"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-pink focus:border-transparent resize-none"
                                    rows={4}
                                    required
                                />
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-[#e45781]">
                                        {noteMessage.length}/{maxCharacters} characters
                                    </span>
                                    {editingNote && (
                                        <span className="text-xs text-accent-pink font-medium">
                                            Edit time remaining: {editTimeLeft}s
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="signature" className="block text-sm font-medium text-[#e45781]/80 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    id="signature"
                                    type="text"
                                    value={noteSignature}
                                    onChange={(e) => setNoteSignature(e.target.value)}
                                    placeholder="Name/Nickname"
                                    className="w-full p-3 border border-[#e45781] rounded-lg focus:ring-2 focus:ring-[#e45781] focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            onClick={closeModal}
                            className="px-6 py-2 border border-[#e45781]/40 text-[#e45781] rounded-lg hover:bg-[#e45781]/30 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmitNote}
                            disabled={(!noteMessage.trim() || !noteSignature.trim()) || isSubmitting}
                            className="px-6 py-2 bg-[#e45781] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isSubmitting ? (editingNote ? 'Updating...' : 'Submitting...') : (editingNote ? 'Update Note' : 'Submit Note')}
                        </button>
                    </ModalFooter>
                </ModalFrame>
            )}
        </div>
    );
}