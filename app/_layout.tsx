import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { NotificationProvider } from "../contexts/NotificationContext";
import { auth, db } from "../lib/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const medsQuery = query(collection(db, "users", user.uid, "medications"));
    const unsubscribe = onSnapshot(medsQuery, (snapshot) => {
      const meds = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMedications(meds);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const scheduleReminders = () => {
      medications.forEach((med) => {
        if (med.dailyReminder && med.reminderTime) {
          const now = new Date();
          const reminderTime = new Date(med.reminderTime);

          const timeDifference =
            reminderTime.getTime() - now.getTime() > 0
              ? reminderTime.getTime() - now.getTime()
              : 24 * 60 * 60 * 1000 + (reminderTime.getTime() - now.getTime());

          setTimeout(() => {
            console.log(`Reminder: It's time to take ${med.name}!`);
          }, timeDifference);
        }
      });
    };

    scheduleReminders();
  }, [medications]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NotificationProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </NotificationProvider>
  );
}
