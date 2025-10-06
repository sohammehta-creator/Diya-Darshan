
import { GoogleGenAI, Chat } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';
import type { ChatMessage } from "../types";

let chat: Chat | null = null;

function initializeChat() {
    if (process.env.API_KEY) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: AI_SYSTEM_INSTRUCTION,
            },
        });
    } else {
        console.error("API_KEY environment variable not set.");
    }
}

export const sendMessageToBot = async (message: string, history: ChatMessage[]): Promise<string> => {
    if (!chat) {
        initializeChat();
    }
    
    if (!chat) {
        return "I'm sorry, my connection to the server is not configured. Please check the API key.";
    }

    try {
        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Gemini API error:", error);
        // In case of an error, re-initialize chat for the next message.
        initializeChat(); 
        return "An error occurred while communicating with the AI. Please try again.";
    }
};
