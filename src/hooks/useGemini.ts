import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export interface Message {
	id: string;
	role: "user" | "model";
	text: string;
}

export function useGemini() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			role: "model",
			text: "Hello! I'm your Mindbloom companion. How are you feeling today?"
		}
	]);
	const [loading, setLoading] = useState(false);

	const sendMessage = async (text: string) => {
		const userMsg: Message = { id: Date.now().toString(), role: "user", text };
		setMessages(prev => [...prev, userMsg]);
		setLoading(true);

		try {
			// Check if API key is available
			if (!API_KEY) {
				throw new Error("Gemini API Key is missing. Please check your .env file.");
			}
			console.log("Using Gemini API Key:", API_KEY.substring(0, 5) + "...");

			// Use the standard flash model. 
			// If this fails, ensure your API key is from Google AI Studio (https://aistudio.google.com/), NOT Google Cloud Vertex AI.
			const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

			// Construct history for context
			const history = messages.map(m => ({
				role: m.role === "model" ? "model" : "user",
				parts: [{ text: m.text }]
			}));

			const chat = model.startChat({
				history: [
					{
						role: "user",
						parts: [{ text: "You are a friendly, empathetic mental health companion named Mindbloom. Your goal is to listen, provide comforting words, and suggest healthy coping mechanisms. You are NOT a doctor and should suggest professional help for serious issues. Keep responses concise and warm." }]
					},
					{
						role: "model",
						parts: [{ text: "Understood. I will be a warm, supportive friend and navigator, offering gentle guidance and listening with empathy." }]
					},
					...history
				]
			});

			const result = await chat.sendMessage(text);
			const response = result.response;
			const textResponse = response.text();

			setMessages(prev => [...prev, {
				id: (Date.now() + 1).toString(),
				role: "model",
				text: textResponse
			}]);
		} catch (error: any) {
			console.error("Gemini Error Details:", error);
			const errorMessage = error.message || "Unknown error";
			setMessages(prev => [...prev, {
				id: (Date.now() + 1).toString(),
				role: "model",
				text: `Connection error: ${errorMessage}. Please check your API key and internet connection.`
			}]);
		} finally {
			setLoading(false);
		}
	};

	return { messages, sendMessage, loading };
}
