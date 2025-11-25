import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
		// 1. Update UI immediately with user message
		const userMsg: Message = { id: Date.now().toString(), role: "user", text };
		// We create a temp variable for history because setMessages is async
		const newHistory = [...messages, userMsg];
		setMessages(newHistory);
		setLoading(true);

		try {
			const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
			if (!API_KEY) throw new Error("Gemini API Key is missing.");

			const genAI = new GoogleGenerativeAI(API_KEY);

			// SYSTEM INSTRUCTION: The correct way to give the bot a persona
			const systemInstruction = "You are a friendly, empathetic mental health companion named Mindbloom. Your goal is to listen, provide comforting words, and suggest healthy coping mechanisms. You are NOT a doctor and should suggest professional help for serious issues. Keep responses concise and warm.";

			let model;
			let result;

			try {
				// Try Flash 1.5 with native systemInstruction
				model = genAI.getGenerativeModel({
					model: "gemini-2.5-flash",
					systemInstruction: systemInstruction
				});
				const chat = startChatSession(model, newHistory, false); // false = don't manually inject system prompt
				result = await chat.sendMessage(text);
			} catch (e: any) {
				console.warn("gemini-1.5-flash failed, trying gemini-pro...", e.message);

				// Fallback to Pro (Does not support systemInstruction property, needs manual injection)
				model = genAI.getGenerativeModel({ model: "gemini-pro" });
				const chat = startChatSession(model, newHistory, true); // true = manually inject system prompt
				result = await chat.sendMessage(text);
			}

			const response = result.response;
			const textResponse = response.text();

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "model",
                text: textResponse
            }]);
        } catch (error: any) {
            console.error("Gemini Error:", error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "model",
                text: "I'm having trouble connecting right now. Please try again."
            }]);
        } finally {
            setLoading(false);
        }
    };

    return { messages, sendMessage, loading };
		}

// Helper to format history correctly
function startChatSession(model: any, currentMessages: Message[], manualSystemPrompt: boolean) {
			// 1. Filter out the very first "Hello" message if it's the model. 
			// This prevents the "Model -> Model" collision if we are manually injecting history.
			// The API doesn't need to see the initial greeting to know context.
			const apiHistory = currentMessages
				.filter((m, index) => index !== 0 || m.role !== "model")
				.slice(0, -1) // Remove the very last user message (because sendMessage sends it)
				.map(m => ({
					role: m.role,
					parts: [{ text: m.text }]
				}));

			const historyConfig = [];

			// If using gemini-pro (older), we manually inject the persona into history
			if (manualSystemPrompt) {
				historyConfig.push(
					{
						role: "user",
						parts: [{ text: "You are a friendly, empathetic mental health companion named Mindbloom..." }]
					},
					{
						role: "model",
						parts: [{ text: "Understood. I will be warm and supportive." }]
					}
				);
			}

			// Add the rest of the conversation
			historyConfig.push(...apiHistory);

			return model.startChat({
				history: historyConfig
			});
		}