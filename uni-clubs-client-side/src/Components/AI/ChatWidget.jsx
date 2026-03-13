// frontend/src/components/ChatWidget.jsx
import React, { useState } from 'react';
import AIChatbot from './AIChatbot';
import { FiMessageCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const welcomeMessage = "👋 Hello! I'm your University Club Assistant. Ask me about clubs, events, or how to join!";

    return (
        <>
            {/* Chat Icon */}
            <motion.div className="fixed bottom-4 right-4 z-50"
                animate={{ y: [1, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
            >
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className="p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition cursor-pointer"
                >
                    <FiMessageCircle size={24} />
                </button>
            </motion.div>

            {/* Chat Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-20 right-4 w-80 max-w-xs h-[400px] bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col z-50"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
                        {/* Header */}
                        <div className="bg-blue-500 text-white p-2 rounded-t-lg flex justify-between items-center">
                            <span>University Club Assistant</span>
                            <button onClick={() => setIsOpen(false)} className="font-bold text-xl cursor-pointer">×</button>
                        </div>

                        {/* Chat Content */}
                        <div className="flex-1 p-2 overflow-y-auto">
                            <AIChatbot defaultMessage={welcomeMessage} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;