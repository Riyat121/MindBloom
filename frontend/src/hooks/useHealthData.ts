import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/firebase";

export interface HealthLog {
	id: string;
	timestamp: string;
	sleepHours: number;
	sleepQuality: string; // "Good", "Average", "Poor"
	heartRate: number; // bpm
}

export function useHealthData() {
	const [healthLogs, setHealthLogs] = useState<HealthLog[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribeAuth = auth.onAuthStateChanged((user) => {
			if (user) {
				const q = query(
					collection(db, "users", user.uid, "health_logs"),
					orderBy("timestamp", "desc"),
					limit(30)
				);

				const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
					const data = snapshot.docs.map(doc => ({
						id: doc.id,
						...doc.data()
					})) as HealthLog[];
					setHealthLogs(data.reverse());
					setLoading(false);
				}, (error) => {
					console.error("Error fetching health data:", error);
					setLoading(false);
				});

				return () => unsubscribeSnapshot();
			} else {
				setLoading(false);
			}
		});

		return () => unsubscribeAuth();
	}, []);

	return { healthLogs, loading };
}
