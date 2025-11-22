import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { db, auth } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Smile, Frown, Meh, Moon, Sun, Battery } from "lucide-react";

const EMOTIONS = [
	"Happy", "Sad", "Anxious", "Excited", "Tired", "Energetic", "Calm", "Frustrated", "Grateful", "Stressed"
];

export function MoodQuiz({ onComplete }: { onComplete?: () => void }) {
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);

	const [data, setData] = useState({
		mood: 5,
		emotions: [] as string[],
		sleep: 7,
		energy: "Medium",
		journal: ""
	});

	const handleEmotionToggle = (emotion: string) => {
		setData(prev => ({
			...prev,
			emotions: prev.emotions.includes(emotion)
				? prev.emotions.filter(e => e !== emotion)
				: [...prev.emotions, emotion]
		}));
	};

	const handleSubmit = async () => {
		if (!auth.currentUser) {
			toast.error("You must be logged in to save your mood.");
			return;
		}

		setLoading(true);
		try {
			await addDoc(collection(db, "users", auth.currentUser.uid, "mood_logs"), {
				...data,
				timestamp: new Date().toISOString()
			});
			toast.success("Mood logged successfully!");
			setOpen(false);
			setStep(1);
			setData({ mood: 5, emotions: [], sleep: 7, energy: "Medium", journal: "" });
			onComplete?.();
		} catch (error) {
			console.error("Error logging mood:", error);
			toast.error("Failed to log mood.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
					Log Your Mood
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Daily Check-in</DialogTitle>
				</DialogHeader>

				<div className="py-4 space-y-6">
					{step === 1 && (
						<div className="space-y-4">
							<Label className="text-lg font-medium">How are you feeling today? (1-10)</Label>
							<div className="flex items-center justify-between text-2xl">
								<Frown className="text-red-400" />
								<span className="font-bold text-primary">{data.mood}</span>
								<Smile className="text-green-400" />
							</div>
							<Slider
								value={[data.mood]}
								min={1}
								max={10}
								step={1}
								onValueChange={(val) => setData({ ...data, mood: val[0] })}
								className="py-4"
							/>
							<Button className="w-full" onClick={() => setStep(2)}>Next</Button>
						</div>
					)}

					{step === 2 && (
						<div className="space-y-4">
							<Label className="text-lg font-medium">What emotions are you feeling?</Label>
							<div className="flex flex-wrap gap-2">
								{EMOTIONS.map(emotion => (
									<Button
										key={emotion}
										variant={data.emotions.includes(emotion) ? "default" : "outline"}
										onClick={() => handleEmotionToggle(emotion)}
										className="rounded-full"
										size="sm"
									>
										{emotion}
									</Button>
								))}
							</div>
							<div className="flex gap-2">
								<Button variant="outline" onClick={() => setStep(1)} className="w-1/3">Back</Button>
								<Button onClick={() => setStep(3)} className="w-2/3">Next</Button>
							</div>
						</div>
					)}

					{step === 3 && (
						<div className="space-y-4">
							<Label className="text-lg font-medium">How did you sleep?</Label>
							<div className="flex items-center gap-4">
								<Moon className="text-indigo-400" />
								<Slider
									value={[data.sleep]}
									min={0}
									max={12}
									step={0.5}
									onValueChange={(val) => setData({ ...data, sleep: val[0] })}
									className="flex-1"
								/>
								<span className="font-bold w-12 text-right">{data.sleep}h</span>
							</div>

							<Label className="text-lg font-medium mt-4 block">Energy Level</Label>
							<Select value={data.energy} onValueChange={(val) => setData({ ...data, energy: val })}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Low">Low</SelectItem>
									<SelectItem value="Medium">Medium</SelectItem>
									<SelectItem value="High">High</SelectItem>
								</SelectContent>
							</Select>

							<div className="flex gap-2 mt-4">
								<Button variant="outline" onClick={() => setStep(2)} className="w-1/3">Back</Button>
								<Button onClick={() => setStep(4)} className="w-2/3">Next</Button>
							</div>
						</div>
					)}

					{step === 4 && (
						<div className="space-y-4">
							<Label className="text-lg font-medium">Journal (Optional)</Label>
							<Textarea
								placeholder="Write down your thoughts..."
								value={data.journal}
								onChange={(e) => setData({ ...data, journal: e.target.value })}
								className="h-32"
							/>
							<div className="flex gap-2">
								<Button variant="outline" onClick={() => setStep(3)} className="w-1/3">Back</Button>
								<Button onClick={handleSubmit} disabled={loading} className="w-2/3">
									{loading ? "Saving..." : "Complete Check-in"}
								</Button>
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
