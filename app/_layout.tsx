import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
      <Stack.Screen name="home" />
      <Stack.Screen name="add-medication" />
      <Stack.Screen name="medication-search" />
      <Stack.Screen name="edit-medication" />
      <Stack.Screen name="landing" />
      <Stack.Screen name="medication-info-display" />
    </Stack>
  );
}
