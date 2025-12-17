import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	addDoc,
	doc,
	setDoc,
	getDoc,
	updateDoc,
	increment
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export interface GratitudeEntry {
	id: string;
	text: string;
	timestamp: string;
}

export interface WellnessStats {
	totalFocusMinutes: number;
	totalWaterCups: number;
}

export function useWellnessData() {
	const [stats, setStats] = useState<WellnessStats>({ totalFocusMinutes: 0, totalWaterCups: 0 });
	const [gratitudeLogs, setGratitudeLogs] = useState<GratitudeEntry[]>([]);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(auth.currentUser);

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (!currentUser) {
				setStats({ totalFocusMinutes: 0, totalWaterCups: 0 });
				setGratitudeLogs([]);
				setLoading(false);
			}
		});
		return () => unsubscribeAuth();
	}, []);

	useEffect(() => {
		if (!user) return;

		// Fetch Stats
		const statsRef = doc(db, "users", user.uid, "wellness", "stats");
		const unsubscribeStats = onSnapshot(statsRef, (docSnap) => {
			if (docSnap.exists()) {
				setStats(docSnap.data() as WellnessStats);
			} else {
				// Initialize if not exists
				setDoc(statsRef, { totalFocusMinutes: 0, totalWaterCups: 0 });
			}
		});

		// Fetch Gratitude Logs
		const gratitudeRef = collection(db, "users", user.uid, "wellness_gratitude");
		const q = query(gratitudeRef, orderBy("timestamp", "desc"));
		const unsubscribeGratitude = onSnapshot(q, (snapshot) => {
			const logs = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			} as GratitudeEntry));
			setGratitudeLogs(logs);
			setLoading(false);
		});

		return () => {
			unsubscribeStats();
			unsubscribeGratitude();
		};
	}, [user]);

	const addFocusTime = async (minutes: number) => {
		if (!user) return;
		const statsRef = doc(db, "users", user.uid, "wellness", "stats");
		await updateDoc(statsRef, {
			totalFocusMinutes: increment(minutes)
		});
	};

	const addWater = async (cups: number) => {
		if (!user) return;
		const statsRef = doc(db, "users", user.uid, "wellness", "stats");
		await updateDoc(statsRef, {
			totalWaterCups: increment(cups)
		});
	};

	const addGratitude = async (text: string) => {
		if (!user) return;
		const gratitudeRef = collection(db, "users", user.uid, "wellness_gratitude");
		await addDoc(gratitudeRef, {
			text,
			timestamp: new Date().toISOString()
		});
	};

	return {
		stats,
		gratitudeLogs,
		loading,
		addFocusTime,
		addWater,
		addGratitude
	};
}
