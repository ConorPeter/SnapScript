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
import { useRouter, useLocalSearchParams } from "expo-router";

export default function MedicationDetailScreen() {
  const router = useRouter();
  const { name, brand, description } = useLocalSearchParams();

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
          <Text style={styles.title}>{name || "Medication"}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Brand Name</Text>
          <Text style={styles.bodyText}>{brand || "Not provided"}</Text>

          <Text style={styles.heading}>Description</Text>
          <Text style={styles.bodyText}>
            {description || "No description available."}
          </Text>

          {/* Optional fallback placeholders if you expand */}
          <Text style={styles.heading}>Dosage</Text>
          <Text style={styles.bodyText}>
            Check your prescription for details.
          </Text>

          <Text style={styles.heading}>Side Effects May Include</Text>
          <Text style={styles.bodyText}>
            Nausea, dizziness, or other reactions may occur.
          </Text>

          <Text style={styles.heading}>Instructions</Text>
          <Text style={styles.bodyText}>
            Follow the instructions from your healthcare provider.
          </Text>

          <Text style={styles.heading}>Warnings</Text>
          <Text style={styles.bodyText}>
            Use as directed. Contact a doctor if symptoms persist.
          </Text>
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
