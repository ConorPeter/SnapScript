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
import colors from "../lib/colors";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

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

    results.sort((a, b) => {
      const query = searchQuery.toLowerCase();
      const aNameStartsWith = a.name.toLowerCase().startsWith(query);
      const bNameStartsWith = b.name.toLowerCase().startsWith(query);
      const aBrandStartsWith = a.brand.toLowerCase().startsWith(query);
      const bBrandStartsWith = b.brand.toLowerCase().startsWith(query);

      if (aNameStartsWith && !bNameStartsWith) return -1;
      if (!aNameStartsWith && bNameStartsWith) return 1;
      if (aBrandStartsWith && !bBrandStartsWith) return -1;
      if (!aBrandStartsWith && bBrandStartsWith) return 1;

      return 0;
    });

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
          <Text style={styles.headerText}>Medication Info</Text>
        </View>

        {/* Search Bar */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.searchWrapper}>
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
          </View>
        </TouchableWithoutFeedback>

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
                    dosage: med.dosage,
                    sideEffects: med.sideEffects,
                    importantInfo: med.importantInfo,
                  },
                })
              }
            >
              <View>
                <Text style={styles.resultTitle}>{med.name}</Text>
                <Text style={styles.brand}>{med.brand}</Text>
              </View>

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
            <Ionicons name="add-circle-outline" size={26} color="#8E8E93" />
            <Text style={styles.navText}>Add Med</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/home")}
          >
            <Ionicons name="home-outline" size={26} color="#8E8E93" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons
              name="information-circle-outline"
              size={26}
              color="#3B8EE2"
            />
            <Text style={[styles.navText, { color: "#3B8EE2" }]}>Med Info</Text>
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
    marginBottom: 5,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 20,
    marginLeft: 15,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "600",
    color: colors.Black,
    fontFamily: "Nunito_700Bold",
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
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
    color: colors.Black,
    fontFamily: "Nunito_700Bold",
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.Black,
    fontFamily: "Nunito_700Bold",
  },
  brand: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666",
    fontFamily: "Nunito_700Bold",
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
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 4,
    fontFamily: "Nunito_700Bold",
  },
  searchWrapper: {
    marginBottom: 12,
    paddingVertical: 6,
  },
});
