import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Activity, Moon, Utensils, Scale, Ruler, User } from "lucide-react";

interface HealthData {
	age: string;
	gender: string;
	height: string; // in cm
	weight: string; // in kg
}

interface CalculatedStats {
	bmi: number;
	bmiCategory: string;
	sleepRecommendation: string;
	calorieRecommendation: string;
}

const HealthProfile = () => {
	const [isEditing, setIsEditing] = useState(true);
	const [formData, setFormData] = useState<HealthData>({
		age: '',
		gender: '',
		height: '',
		weight: ''
	});
	const [stats, setStats] = useState<CalculatedStats | null>(null);

	useEffect(() => {
		const savedData = localStorage.getItem('mindbloom_health_profile');
		if (savedData) {
			const parsed = JSON.parse(savedData);
			setFormData(parsed);
			calculateStats(parsed);
			setIsEditing(false);
		}
	}, []);

	const calculateStats = (data: HealthData) => {
		const heightM = parseFloat(data.height) / 100;
		const weightKg = parseFloat(data.weight);
		const age = parseInt(data.age);

		if (!heightM || !weightKg || !age) return;

		// BMI Calculation
		const bmi = weightKg / (heightM * heightM);
		let bmiCategory = '';
		if (bmi < 18.5) bmiCategory = 'Underweight';
		else if (bmi < 25) bmiCategory = 'Healthy Weight';
		else if (bmi < 30) bmiCategory = 'Overweight';
		else bmiCategory = 'Obese';

		// Sleep Recommendation (General guidelines)
		let sleep = '7-9 hours';
		if (age < 18) sleep = '8-10 hours';
		if (age > 65) sleep = '7-8 hours';

		// Calorie Recommendation (Mifflin-St Jeor Equation - simplified)
		// BMR = 10W + 6.25H - 5A + 5 (Men) / -161 (Women)
		let bmr = (10 * weightKg) + (6.25 * parseFloat(data.height)) - (5 * age);
		if (data.gender === 'male') bmr += 5;
		else bmr -= 161;

		// Assuming sedentary to lightly active (x1.375) as a baseline for "Energy Needs"
		const calories = Math.round(bmr * 1.375);

		setStats({
			bmi: parseFloat(bmi.toFixed(1)),
			bmiCategory,
			sleepRecommendation: sleep,
			calorieRecommendation: `${calories} kcal/day`
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.age || !formData.gender || !formData.height || !formData.weight) {
			toast.error("Please fill in all fields");
			return;
		}

		localStorage.setItem('mindbloom_health_profile', JSON.stringify(formData));
		calculateStats(formData);
		setIsEditing(false);
		toast.success("Health profile saved!");
	};

	if (!isEditing && stats) {
		return (
			<div className="space-y-6 animate-fade-in">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl font-bold text-primary">Your Health Profile</h2>
					<Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">BMI Score</CardTitle>
							<Scale className="h-4 w-4 text-blue-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.bmi}</div>
							<p className="text-xs text-blue-600 dark:text-blue-400">{stats.bmiCategory}</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-800">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Sleep Needs</CardTitle>
							<Moon className="h-4 w-4 text-indigo-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.sleepRecommendation}</div>
							<p className="text-xs text-indigo-600 dark:text-indigo-400">Recommended daily</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Energy Needs</CardTitle>
							<Utensils className="h-4 w-4 text-emerald-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.calorieRecommendation}</div>
							<p className="text-xs text-emerald-600 dark:text-emerald-400">Est. maintenance</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Profile</CardTitle>
							<User className="h-4 w-4 text-purple-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{formData.age} yrs</div>
							<p className="text-xs text-purple-600 dark:text-purple-400">{formData.gender}, {formData.height}cm</p>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Activity className="h-6 w-6 text-primary" />
					Setup Health Profile
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label htmlFor="age">Age</Label>
							<Input
								id="age"
								type="number"
								placeholder="Years"
								value={formData.age}
								onChange={(e) => setFormData({ ...formData, age: e.target.value })}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="gender">Gender</Label>
							<Select
								value={formData.gender}
								onValueChange={(value) => setFormData({ ...formData, gender: value })}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select gender" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="male">Male</SelectItem>
									<SelectItem value="female">Female</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="height">Height (cm)</Label>
							<div className="relative">
								<Input
									id="height"
									type="number"
									placeholder="170"
									value={formData.height}
									onChange={(e) => setFormData({ ...formData, height: e.target.value })}
								/>
								<Ruler className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="weight">Weight (kg)</Label>
							<div className="relative">
								<Input
									id="weight"
									type="number"
									placeholder="70"
									value={formData.weight}
									onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
								/>
								<Scale className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
							</div>
						</div>
					</div>

					<div className="flex justify-end gap-4">
						{stats && (
							<Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
								Cancel
							</Button>
						)}
						<Button type="submit">
							{stats ? 'Update Profile' : 'Save Profile'}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default HealthProfile;
