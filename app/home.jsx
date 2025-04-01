import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("✅ Logged out");
      router.replace("/landing");
    } catch (error) {
      console.error("❌ Logout error:", error);
      Alert.alert("Logout failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <StatusBar
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          translucent={false}
        />
      )}

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>Welcome, [Name]!</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.content}>
          <View style={styles.illustrationContainer}>
            <Image
              source={require("../assets/images/Calender.png")}
              style={styles.customImage}
            />
          </View>
          <Text style={styles.noMedsText}>No active Medications</Text>
          <Text style={styles.subText}>Would you like to set one up?</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add New Medication</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="add-circle-outline" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Add Med</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: "#007AFF" }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#8E8E93"
          />
          <Text style={styles.navText}>Med Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 8,
    color: "#000",
    marginTop: 35,
  },
  logoutButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "red",
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 80,
  },
  illustrationContainer: {
    marginBottom: 26,
  },
  customImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginLeft: 20,
  },
  noMedsText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  subText: {
    fontSize: 18,
    color: "#8E8E93",
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    paddingBottom: Platform.OS === "ios" ? 0 : 12,
  },
  navItem: {
    alignItems: "center",
    marginBottom: 20,
  },
  navText: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginTop: 35,
  },
});
