import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplets, Timer, Heart, Wind, Play, Pause, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useWellnessData } from "@/hooks/useWellnessData";

export const WellnessTools = () => {
	const { addFocusTime, addWater, addGratitude, stats } = useWellnessData();

	// Breathing Tool
	const [isBreathing, setIsBreathing] = useState(false);
	const [breathText, setBreathText] = useState("Inhale");

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isBreathing) {
			let phase = 0; // 0: Inhale, 1: Hold, 2: Exhale
			interval = setInterval(() => {
				phase = (phase + 1) % 3;
				if (phase === 0) setBreathText("Inhale");
				else if (phase === 1) setBreathText("Hold");
				else setBreathText("Exhale");
			}, 4000);
		} else {
			setBreathText("Ready?");
		}
		return () => clearInterval(interval);
	}, [isBreathing]);

	// Pomodoro Tool
	const [timeLeft, setTimeLeft] = useState(25 * 60);
	const [isTimerRunning, setIsTimerRunning] = useState(false);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isTimerRunning && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);
		} else if (timeLeft === 0) {
			setIsTimerRunning(false);
			toast.success("Focus session complete! +25 mins saved.");
			addFocusTime(25);
			setTimeLeft(25 * 60);
		}
		return () => clearInterval(interval);
	}, [isTimerRunning, timeLeft]);

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	};

	// Water Tool
	const [sessionWater, setSessionWater] = useState(0);

	const handleAddWater = () => {
		setSessionWater(prev => prev + 1);
		addWater(1);
		toast.success("Hydration recorded! 💧");
	};

	// Gratitude Tool
	const [gratitudeInput, setGratitudeInput] = useState("");

	const saveGratitude = (e: React.FormEvent) => {
		e.preventDefault();
		if (!gratitudeInput.trim()) return;
		addGratitude(gratitudeInput);
		toast.success("Gratitude saved! ✨");
		setGratitudeInput("");
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold tracking-tight">Quick Wellness Tools</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

				{/* Breathing Card */}
				<Card className="bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium flex items-center gap-2 text-sky-700 dark:text-sky-300">
							<Wind className="h-4 w-4" /> 1-Min Breathe
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-center justify-center py-4 space-y-4">
						<div className={`relative flex items-center justify-center w-24 h-24 rounded-full border-4 border-sky-400 transition-all duration-[4000ms] ${isBreathing ? (breathText === 'Inhale' ? 'scale-110' : 'scale-90') : ''}`}>
							<span className="text-lg font-bold text-sky-700 dark:text-sky-300">{breathText}</span>
						</div>
						<Button
							size="sm"
							variant={isBreathing ? "destructive" : "default"}
							onClick={() => setIsBreathing(!isBreathing)}
							className="w-full"
						>
							{isBreathing ? "Stop" : "Start"}
						</Button>
					</CardContent>
				</Card>

				{/* Pomodoro Card */}
				<Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-700 dark:text-orange-300">
							<Timer className="h-4 w-4" /> Focus Timer
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-center justify-center py-4 space-y-4">
						<div className="text-4xl font-mono font-bold text-orange-800 dark:text-orange-200">
							{formatTime(timeLeft)}
						</div>

						{/* Custom Time Input */}
						{!isTimerRunning && (
							<div className="flex items-center justify-center gap-2">
								<span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Set:</span>
								<Input
									type="number"
									min="1"
									max="120"
									placeholder="25"
									className="h-8 w-16 text-center bg-white/50 dark:bg-black/20 border-orange-200 dark:border-orange-800 focus-visible:ring-orange-400"
									onChange={(e) => {
										const val = parseInt(e.target.value);
										if (val > 0) setTimeLeft(val * 60);
									}}
								/>
								<span className="text-xs text-orange-600 dark:text-orange-400">min</span>
							</div>
						)}

						<div className="flex gap-2 w-full">
							<Button
								size="sm"
								className="flex-1"
								onClick={() => setIsTimerRunning(!isTimerRunning)}
							>
								{isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={() => { setIsTimerRunning(false); setTimeLeft(25 * 60); }}
							>
								<RefreshCw className="h-4 w-4" />
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Water Card */}
				<Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700 dark:text-blue-300">
							<Droplets className="h-4 w-4" /> Hydration
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-center justify-center py-4 space-y-4">
						<div className="flex items-end gap-1">
							<span className="text-4xl font-bold text-blue-800 dark:text-blue-200">{sessionWater}</span>
							<span className="text-sm text-blue-600 dark:text-blue-400 mb-1">cups today</span>
						</div>
						<Button
							size="sm"
							className="w-full bg-blue-500 hover:bg-blue-600"
							onClick={handleAddWater}
						>
							+ Add Cup
						</Button>
					</CardContent>
				</Card>

				{/* Gratitude Card */}
				<Card className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium flex items-center gap-2 text-pink-700 dark:text-pink-300">
							<Heart className="h-4 w-4" /> Gratitude
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col justify-center py-4 space-y-4">
						<form onSubmit={saveGratitude} className="space-y-2">
							<Input
								placeholder="I'm grateful for..."
								value={gratitudeInput}
								onChange={(e) => setGratitudeInput(e.target.value)}
								className="bg-white/50"
							/>
							<Button size="sm" type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
								Save Note
							</Button>
						</form>
					</CardContent>
				</Card>

			</div>
		</div>
	);
};
