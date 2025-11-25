import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useGemini } from "@/hooks/useGemini";
import { cn } from "@/lib/utils";

export function Chatbot() {
	const [isOpen, setIsOpen] = useState(false);
	const { messages, sendMessage, loading } = useGemini();
	const [input, setInput] = useState("");
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const handleSend = () => {
		if (!input.trim()) return;
		sendMessage(input);
		setInput("");
	};

	return (
		<div className="fixed bottom-6 right-6 z-50">
			{!isOpen && (
				<Button
					onClick={() => setIsOpen(true)}
					size="icon"
					className="h-14 w-14 rounded-full shadow-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
				>
					<MessageCircle className="h-8 w-8 text-white" />
				</Button>
			)}

			{isOpen && (
				<Card className="w-[380px] md:w-[450px] h-[600px] shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 fade-in border-2 border-primary/20">
					<CardHeader className="bg-primary text-primary-foreground p-4 rounded-t-xl flex flex-row justify-between items-center shrink-0">
						<CardTitle className="text-lg flex items-center gap-2">
							<MessageCircle className="h-5 w-5" />
							Mindbloom Companion
						</CardTitle>
						<Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary-foreground/20">
							<X className="h-5 w-5" />
						</Button>
					</CardHeader>

					<CardContent className="flex-1 p-4 overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
						<ScrollArea className="h-full pr-4">
							<div className="space-y-4 pb-4">
								{messages.map((msg) => (
									<div
										key={msg.id}
										className={cn(
											"flex w-fit max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm shadow-sm",
											msg.role === "user"
												? "ml-auto bg-primary text-primary-foreground rounded-br-none"
												: "bg-muted text-foreground rounded-bl-none"
										)}
									>
										<p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
									</div>
								))}
								{loading && (
									<div className="flex w-fit max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm bg-muted rounded-bl-none">
										<div className="flex gap-1">
											<span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
											<span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
											<span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></span>
										</div>
									</div>
								)}
								<div ref={scrollRef} />
							</div>
						</ScrollArea>
					</CardContent>

					<CardFooter className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleSend();
							}}
							className="flex w-full items-center gap-2"
						>
							<Input
								placeholder="Type a message..."
								value={input}
								onChange={(e) => setInput(e.target.value)}
								disabled={loading}
								className="flex-1 bg-background"
							/>
							<Button type="submit" size="icon" disabled={loading} className="shrink-0">
								<Send className="h-4 w-4" />
							</Button>
						</form>
					</CardFooter>
				</Card>
			)}
		</div>
	);
}
