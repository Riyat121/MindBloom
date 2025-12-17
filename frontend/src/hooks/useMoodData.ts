import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, onSnapshot, where } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

export interface MoodLog {
	id: string;
	mood: number;
	sleep: number;
	emotions: string[];
	energy: string;
	journal: string;
	timestamp: string;
}

export function useMoodData() {
	const [logs, setLogs] = useState<MoodLog[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribeAuth = auth.onAuthStateChanged((user) => {
			if (user) {
				const q = query(
					collection(db, "users", user.uid, "mood_logs"),
					orderBy("timestamp", "desc"),
					limit(30)
				);

				const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
					const data = snapshot.docs.map(doc => ({
						id: doc.id,
						...doc.data()
					})) as MoodLog[];
					setLogs(data.reverse());
					setLoading(false);
				}, (error) => {
					console.error("Error fetching mood data:", error);
					setLoading(false);
				});

				return () => unsubscribeSnapshot();
			} else {
				setLoading(false);
			}
		});

		return () => unsubscribeAuth();
	}, []);

	return { logs, loading };
}
