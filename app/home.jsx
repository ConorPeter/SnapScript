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
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth, db } from "../lib/firebaseConfig";
import { useRouter } from "expo-router";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

export default function HomeScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [medications, setMedications] = useState([]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/landing");
    } catch (error) {
      Alert.alert("Logout failed", error.message);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Medication",
      "Are you sure you want to delete this medication?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (!user) return;

              await deleteDoc(doc(db, "users", user.uid, "medications", id));
              setMedications((prev) => prev.filter((med) => med.id !== id));
              Alert.alert("Success", "Medication deleted.");
            } catch (error) {
              console.error("Error deleting medication:", error);
              Alert.alert("Error", "Failed to delete medication. Try again.");
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFirstName(data.firstName || "");
        }

        const medsQuery = query(
          collection(db, "users", user.uid, "medications"),
          orderBy("createdAt", "desc")
        );
        const medsSnapshot = await getDocs(medsQuery);
        const medsData = medsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMedications(medsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  const renderMedItem = ({ item }) => (
    <View style={styles.medCard}>
      <View style={styles.cardContent}>
        {/* Left Side - Medication Info */}
        <View style={styles.cardText}>
          <Text style={styles.medName}>{item.name}</Text>
          <Text style={styles.medDetail}>
            {item.dosageAmount} {item.dosageForm} • {item.frequency}
          </Text>
        </View>

        {/* Right Side - Buttons */}
        <View style={styles.cardButtons}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() =>
              router.push({
                pathname: "/edit-medication",
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
          {medications.length === 0 ? (
            <>
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
            </>
          ) : (
            <>
              <Text style={styles.scheduleText}>
                Here's Today's Schedule...
              </Text>
              <FlatList
                data={medications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.medCard}>
                    <View style={styles.cardContent}>
                      {/* Left Side - Medication Info */}
                      <View style={styles.cardText}>
                        <Text style={styles.medName}>{item.name}</Text>
                        <Text style={styles.medDetail}>
                          {item.dosageAmount} {item.dosageForm} •{" "}
                          {item.frequency}
                        </Text>
                        {item.instructions && (
                          <Text style={styles.medInstructions}>
                            {item.instructions.length > 40
                              ? `${item.instructions.slice(0, 40)}...`
                              : item.instructions}
                          </Text>
                        )}
                        <View style={styles.reminderIconWrapper}>
                          <Ionicons
                            name={
                              item.dailyReminder
                                ? "notifications-outline"
                                : "notifications-off-outline"
                            }
                            size={18}
                            color={item.dailyReminder ? "#007AFF" : "#8E8E93"}
                          />
                          <Text style={styles.reminderText}>
                            {item.dailyReminder ? "Reminder On" : "No Reminder"}
                          </Text>
                        </View>
                      </View>

                      {/* Right Side - Buttons */}
                      <View style={styles.cardButtons}>
                        <TouchableOpacity
                          style={styles.editBtn}
                          onPress={() =>
                            router.push({
                              pathname: "/edit-medication",
                              params: { id: item.id },
                            })
                          }
                        >
                          <Text style={styles.btnText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.deleteBtn}
                          onPress={() => handleDelete(item.id)}
                        >
                          <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
              />
            </>
          )}
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
  container: { flex: 1, backgroundColor: "#F8F9FA" },
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
  customImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginLeft: 90,
    marginTop: 40,
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
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  noMedsText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    fontFamily: "Nunito_700Bold",
    textAlign: "center",
  },
  scheduleText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    fontFamily: "Nunito_700Bold",
    marginLeft: 5,
    marginTop: -5,
  },
  subText: {
    fontSize: 20,
    color: "#8E8E93",
    marginBottom: 24,
    fontFamily: "Nunito_700Bold",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#3B8EE2",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Nunito_700Bold",
  },
  medCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  medName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Nunito_700Bold",
  },
  medDetail: {
    fontSize: 16,
    color: "#444",
    marginTop: 4,
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
  medCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cardText: {
    flex: 1,
    paddingRight: 10,
  },

  cardButtons: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  editBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 8,
  },

  deleteBtn: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },

  btnText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },

  medName: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Nunito_700Bold",
  },

  medDetail: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
    fontFamily: "Nunito_700Bold",
  },
  medInstructions: {
    fontSize: 15,
    color: "#555",
    marginTop: 4,
    fontFamily: "Nunito_700Bold",
  },

  reminderIconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  reminderText: {
    fontSize: 14,
    marginLeft: 6,
    color: "#444",
    fontFamily: "Nunito_700Bold",
  },
});
