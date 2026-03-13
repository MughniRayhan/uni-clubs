// frontend/src/components/AIChatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import UseAxios from '../../Hooks/UseAxios';

const AIChatbot = ({ defaultMessage }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const axios = UseAxios();
    const chatEndRef = useRef(null);

    // Add default message on mount
    useEffect(() => {
        if (defaultMessage) {
            setMessages([{ sender: 'ai', text: defaultMessage }]);
        }
    }, [defaultMessage]);


    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);

        try {
            const { data } = await axios.post('/chat', {
                message: input,
                history: messages.map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text
                }))
            });

            setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { sender: 'ai', text: 'AI unavailable. Try later.' }]);
        }

        setInput('');
    };

    // Scroll to bottom whenever messages change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-2 p-1 flex flex-col">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`my-1 p-2 rounded inline-block max-w-[70%] break-words
        ${msg.sender === 'user' ? 'bg-blue-100 text-right self-end' : 'bg-gray-200 text-left self-start'}
      `}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            {/* Input */}
            <div className="flex gap-1 p-1 border-t border-gray-200">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask about clubs, events..."
                    className="flex-1 p-2 border border-gray-400 rounded"
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded">Send</button>
            </div>
        </div>
    );
};

export default AIChatbot;