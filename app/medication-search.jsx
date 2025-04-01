import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import medications from "./data/medications.json";

export default function MedSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeds, setFilteredMeds] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMeds([]);
      return;
    }

    const results = medications.filter(
      (med) =>
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredMeds(results);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />
      )}
      <SafeAreaView style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.headerText}>Medication Information</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#8E8E93"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medications..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Results */}
        <ScrollView style={{ marginBottom: 80 }}>
          {filteredMeds.map((med, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resultCard}
              onPress={() =>
                router.push({
                  pathname: "/medication-info-display",
                  params: {
                    name: med.name,
                    brand: med.brand,
                    description: med.description,
                  },
                })
              }
            >
              <Text style={styles.resultTitle}>
                {med.name} <Text style={styles.brand}>({med.brand})</Text>
              </Text>
              <Text style={styles.resultDesc}>{med.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom Nav */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/add-medication")}
          >
            <Ionicons name="add-circle-outline" size={24} color="#8E8E93" />
            <Text style={styles.navText}>Add Med</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/home")}
          >
            <Ionicons name="home-outline" size={24} color="#8E8E93" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#007AFF"
            />
            <Text style={[styles.navText, { color: "#007AFF" }]}>Med Info</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 20,
    marginLeft: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
    color: "#000",
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  brand: {
    fontWeight: "400",
    color: "#555",
  },
  resultDesc: {
    marginTop: 4,
    fontSize: 14,
    color: "#444",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  navItem: {
    alignItems: "center",
    marginBottom: 8,
  },
  navText: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
  },
});
