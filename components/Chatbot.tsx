
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sendMessageToBot } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { ChatIcon } from './icons/ChatIcon';
import { CloseIcon } from './icons/CloseIcon';
import { MicIcon } from './icons/MicIcon';
import { SendIcon } from './icons/SendIcon';
import { UserIcon } from './icons/UserIcon';
import { OmIcon } from './icons/OmIcon';
import { useLanguage } from '../contexts/LanguageContext';

// Check for SpeechRecognition API
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
}

const Chatbot: React.FC = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const chatboxRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        // Set initial message only once or when language changes and there are no messages
        if (messages.length === 0) {
            setMessages([{ id: 1, text: t('chatbotWelcome'), sender: 'bot' }]);
        }
    }, [t, messages.length]);


    useEffect(() => {
        if (isOpen && chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSendMessage = useCallback(async (messageText?: string) => {
        const textToSend = typeof messageText === 'string' ? messageText : inputValue;
        const trimmedInput = textToSend.trim();
        if (trimmedInput === '' || isLoading) return;

        const newUserMessage: ChatMessage = {
            id: Date.now(),
            text: trimmedInput,
            sender: 'user',
        };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const botResponseText = await sendMessageToBot(trimmedInput, messages);
            const newBotMessage: ChatMessage = {
                id: Date.now() + 1,
                text: botResponseText,
                sender: 'bot',
            };
            setMessages(prev => [...prev, newBotMessage]);
        } catch (error) {
            console.error("Error sending message to bot:", error);
            const errorMessage: ChatMessage = {
                id: Date.now() + 1,
                text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
                sender: 'bot',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [inputValue, isLoading, messages]);
    
    const handleVoiceInput = () => {
        if (!recognition) {
            alert("Voice recognition is not supported by your browser.");
            return;
        }

        if (isListening) {
            recognition.stop();
            setIsListening(false);
            return;
        }

        recognition.lang = { en: 'en-US', gu: 'gu-IN', hi: 'hi-IN' }[t('langCode') as 'en' | 'gu' | 'hi'];
        recognition.start();

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
            handleSendMessage(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        };
    };


    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-gradient-to-br from-amber to-orange-dark text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300 z-50"
                aria-label="Open Chat"
            >
                {isOpen ? <CloseIcon className="w-8 h-8"/> : <ChatIcon className="w-8 h-8" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[90vw] max-w-sm h-[70vh] max-h-[600px] bg-cream dark:bg-warmGray-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border-2 border-amber-light dark:border-amber-dark">
                    <header className="bg-gradient-to-r from-amber to-orange-light p-4 text-white flex justify-between items-center">
                        <h3 className="font-bold text-lg">{t('chatbotTitle')}</h3>
                    </header>
                    <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg) => (
                             <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-amber flex-shrink-0 flex items-center justify-center"><OmIcon className="w-5 h-5 text-white" /></div>}
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-amber-light dark:bg-amber-dark text-warmGray-900 dark:text-white rounded-br-none' : 'bg-white dark:bg-warmGray-700 text-warmGray-900 dark:text-white rounded-bl-none shadow-sm'}`}>
                                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                                </div>
                                {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-warmGray-300 dark:bg-warmGray-600 flex-shrink-0 flex items-center justify-center"><UserIcon className="w-5 h-5 text-warmGray-700 dark:text-warmGray-200" /></div>}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-end gap-2 justify-start">
                                <div className="w-8 h-8 rounded-full bg-amber flex-shrink-0 flex items-center justify-center"><OmIcon className="w-5 h-5 text-white" /></div>
                                <div className="max-w-[80%] p-3 rounded-2xl bg-white dark:bg-warmGray-700 text-warmGray-900 rounded-bl-none shadow-sm flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-amber rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-amber rounded-full animate-bounce delay-150"></span>
                                    <span className="w-2 h-2 bg-amber rounded-full animate-bounce delay-300"></span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-t border-amber-light/30 dark:border-amber-dark/30 bg-white dark:bg-warmGray-800">
                        <div className="flex items-center bg-warmGray-100 dark:bg-warmGray-900 rounded-full p-1">
                             <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder={t('chatbotPlaceholder')}
                                className="flex-1 bg-transparent px-4 py-2 text-sm text-warmGray-700 dark:text-warmGray-200 focus:outline-none"
                                disabled={isLoading}
                            />
                            <button onClick={handleVoiceInput} className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-amber-light/20 text-amber'}`}>
                                <MicIcon className="w-5 h-5"/>
                            </button>
                             <button onClick={() => handleSendMessage()} className="p-2 bg-amber rounded-full text-white ml-1 hover:bg-amber-dark transition-colors" disabled={isLoading}>
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;