import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Heart, Moon, Activity } from "lucide-react";
import { db, auth } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

const HealthLogForm = ({ onComplete }: { onComplete?: () => void }) => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		sleepHours: '',
		sleepQuality: 'Average',
		heartRate: ''
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!auth.currentUser) {
			toast.error("You must be logged in to save health data.");
			return;
		}
		if (!formData.sleepHours || !formData.heartRate) {
			toast.error("Please fill in all fields");
			return;
		}

		setLoading(true);
		try {
			await addDoc(collection(db, "users", auth.currentUser.uid, "health_logs"), {
				sleepHours: parseFloat(formData.sleepHours),
				sleepQuality: formData.sleepQuality,
				heartRate: parseInt(formData.heartRate),
				timestamp: new Date().toISOString()
			});
			toast.success("Health stats logged!");
			setFormData({ sleepHours: '', sleepQuality: 'Average', heartRate: '' });
			onComplete?.();
		} catch (error) {
			console.error("Error logging health stats:", error);
			toast.error("Failed to log health stats.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg">
					<Activity className="h-5 w-5 text-rose-500" />
					Log Daily Stats
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="sleepHours">Sleep (Hours)</Label>
							<div className="relative">
								<Input
									id="sleepHours"
									type="number"
									step="0.5"
									placeholder="7.5"
									value={formData.sleepHours}
									onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
								/>
								<Moon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="sleepQuality">Sleep Quality</Label>
							<Select
								value={formData.sleepQuality}
								onValueChange={(value) => setFormData({ ...formData, sleepQuality: value })}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Good">Good</SelectItem>
									<SelectItem value="Average">Average</SelectItem>
									<SelectItem value="Poor">Poor</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="heartRate">Heart Rate (BPM)</Label>
							<div className="relative">
								<Input
									id="heartRate"
									type="number"
									placeholder="72"
									value={formData.heartRate}
									onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
								/>
								<Heart className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
							</div>
						</div>
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Saving..." : "Save Stats"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default HealthLogForm;
