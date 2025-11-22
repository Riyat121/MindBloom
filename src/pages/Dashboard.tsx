import { useEffect, useState } from "react";
import { MoodQuiz } from "@/components/dashboard/MoodQuiz";
import { MoodChart } from "@/components/dashboard/MoodChart";
import { Suggestions } from "@/components/dashboard/Suggestions";
import { Resources } from "@/components/dashboard/Resources";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { AnalyticsView } from "@/components/dashboard/AnalyticsView";
import { useMoodData } from "@/hooks/useMoodData";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Loading } from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Calendar, BarChart2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/mode-toggle";

export default function Dashboard() {
	const navigate = useNavigate();
	const [user, setUser] = useState(auth.currentUser);
	const { logs, loading: dataLoading } = useMoodData();
	const [authLoading, setAuthLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				navigate("/auth");
			} else {
				setUser(currentUser);
			}
			setAuthLoading(false);
		});
		return () => unsubscribe();
	}, [navigate]);

	const handleLogout = async () => {
		await signOut(auth);
		localStorage.removeItem("mindease_student_auth");
		navigate("/auth");
	};

	if (authLoading || dataLoading) return <Loading />;

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
			{/* Top Navigation Bar */}
			<header className="bg-white dark:bg-gray-800 shadow-sm border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
				<div
					className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
					onClick={() => navigate("/dashboard")}
				>
					<div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
						M
					</div>
					<h1 className="text-xl font-bold text-gray-900 dark:text-white hidden md:block">Mindbloom</h1>
				</div>

				<div className="flex items-center gap-4">
					<ModeToggle />
					<span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline-block">
						Welcome, {user?.displayName?.split(" ")[0]}
					</span>
					<Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
						<LogOut className="h-4 w-4 mr-2" />
						Log Out
					</Button>
				</div>
			</header>

			<main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
				{/* Welcome & Quick Action Section */}
				<div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold">How are you feeling today?</h2>
						<p className="text-indigo-100 max-w-xl">
							Tracking your mood is the first step to understanding your well-being. Take a moment to check in with yourself.
						</p>
					</div>
					<div className="bg-white/10 p-1 rounded-xl backdrop-blur-sm">
						<MoodQuiz onComplete={() => window.location.reload()} />
					</div>
				</div>

				{/* Main Content Tabs */}
				<Tabs defaultValue="overview" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
						<TabsTrigger value="overview" className="flex gap-2"><LayoutDashboard className="h-4 w-4" /> Overview</TabsTrigger>
						<TabsTrigger value="calendar" className="flex gap-2"><Calendar className="h-4 w-4" /> Calendar</TabsTrigger>
						<TabsTrigger value="analytics" className="flex gap-2"><BarChart2 className="h-4 w-4" /> Analytics</TabsTrigger>
					</TabsList>

					<TabsContent value="overview" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{/* Left Column: Recent Stats & Suggestions */}
							<div className="md:col-span-2 space-y-6">
								<MoodChart data={logs} />
								<Resources />
							</div>

							{/* Right Column: Quick Stats or Calendar Preview */}
							<div className="space-y-6">
								<Suggestions logs={logs} />
								<CalendarView logs={logs} />
							</div>
						</div>
					</TabsContent>

					<TabsContent value="calendar">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<CalendarView logs={logs} />
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Recent Entries</h3>
								{logs.slice(0, 5).map(log => (
									<div key={log.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border flex justify-between items-center">
										<div>
											<p className="font-medium">{new Date(log.timestamp).toLocaleDateString()}</p>
											<p className="text-sm text-muted-foreground">{log.emotions.join(", ")}</p>
										</div>
										<div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-white"
											style={{ backgroundColor: log.mood >= 7 ? '#4ade80' : log.mood >= 4 ? '#fbbf24' : '#f87171' }}>
											{log.mood}
										</div>
									</div>
								))}
							</div>
						</div>
					</TabsContent>

					<TabsContent value="analytics">
						<AnalyticsView logs={logs} />
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
