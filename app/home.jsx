import React, { useEffect, useState } from "react";
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
import { auth, db } from "../lib/firebaseConfig";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";

export default function HomeScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out");
      router.replace("/landing");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout failed", error.message);
    }
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFirstName(data.firstName || "");
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserName();
  }, []);

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
          <Text
            style={styles.headerTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Welcome{firstName ? `, ${firstName}` : ""}
          </Text>
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
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/add-medication")}
          >
            <Text style={styles.addButtonText}>Add New Medication</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/add-medication")}
        >
          <Ionicons name="add-circle-outline" size={26} color="#8E8E93" />
          <Text style={styles.navText}>Add Med</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={26} color="#3B8EE2" />
          <Text style={[styles.navText, { color: "#3B8EE2" }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/medication-search")}
        >
          <Ionicons
            name="information-circle-outline"
            size={26}
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
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginTop: 40,
    marginLeft: 2,
    fontFamily: "Nunito_700Bold",
    flexShrink: 1,
  },
  logoutButton: {
    marginTop: 40,
    marginLeft: 20,
    padding: 8,
    backgroundColor: "#3B8EE2",
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 18,
    color: "#F8F9FA",
    fontFamily: "Nunito_700Bold",
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
    fontFamily: "Nunito_700Bold",
  },
  subText: {
    fontSize: 20,
    color: "#8E8E93",
    marginBottom: 24,
    fontFamily: "Nunito_700Bold",
  },
  addButton: {
    backgroundColor: "#3B8EE2",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Nunito_700Bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
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
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 4,
    fontFamily: "Nunito_700Bold",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginTop: 35,
  },
});
