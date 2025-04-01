import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MedicationDetailScreen() {
  const router = useRouter();

  const medication = {
    name: "Ibuprofen",
    brandNames: ["Advil", "Motrin", "Nurofen", "Midol"],
    description:
      "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation.",
    dosage:
      "200-400 mg every 4 to 6 hours as needed. Do not exceed 1200 mg per day without doctor supervision.",
    sideEffects: ["Nausea", "Dizziness", "Stomach pain", "Heartburn"],
    instructions: "Take with food or milk to avoid stomach upset.",
    warnings:
      "Avoid using with other NSAIDs. Long-term use may increase risk of heart attack or stroke.",
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />
      )}
      <SafeAreaView style={styles.safeArea}>
        {/* Back Arrow */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={38} color="#007AFF" />
        </TouchableOpacity>

        {/* Header: Logo + Medication Name */}
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>{medication.name}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Brand Names</Text>
          <Text style={styles.bodyText}>
            {medication.brandNames.join(", ")}
          </Text>

          <Text style={styles.heading}>Description</Text>
          <Text style={styles.bodyText}>{medication.description}</Text>

          <Text style={styles.heading}>Dosage</Text>
          <Text style={styles.bodyText}>{medication.dosage}</Text>

          <Text style={styles.heading}>Side Effects May Include</Text>
          <Text style={styles.bodyText}>
            {medication.sideEffects.join(", ")}
          </Text>

          <Text style={styles.heading}>Instructions</Text>
          <Text style={styles.bodyText}>{medication.instructions}</Text>

          <Text style={styles.heading}>Warnings</Text>
          <Text style={styles.bodyText}>{medication.warnings}</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  safeArea: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 60 : 60,
    left: 10,
    zIndex: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  content: {
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginTop: 20,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});
