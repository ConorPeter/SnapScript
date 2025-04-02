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
import colors from "../lib/colors";

export default function MedicationDetailScreen() {
  const router = useRouter();
  const { name, brand, description, dosage, sideEffects, importantInfo } =
    useLocalSearchParams();

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />
      )}
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={44} color="#333" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>{name || "Medication"}</Text>
        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.content}>
          {brand && (
            <>
              <Text style={styles.heading}>Brand Names</Text>
              <Text style={styles.bodyText}>{brand}</Text>
            </>
          )}

          {description && (
            <>
              <Text style={styles.heading}>Description</Text>
              <Text style={styles.bodyText}>{description}</Text>
            </>
          )}

          {dosage && (
            <>
              <Text style={styles.heading}>Dosage</Text>
              <Text style={styles.bodyText}>{dosage}</Text>
            </>
          )}

          {sideEffects && (
            <>
              <Text style={styles.heading}>Potential Side Effects</Text>
              <Text style={styles.bodyText}>{sideEffects}</Text>
            </>
          )}

          {importantInfo && (
            <>
              <Text style={styles.heading}>Important Info</Text>
              <Text style={styles.bodyText}>{importantInfo}</Text>
            </>
          )}
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
    justifyContent: "flex-start",
    marginTop: 5,
    paddingHorizontal: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 5,
    marginLeft: 50,
  },
  title: {
    fontSize: 28,
    color: colors.Black,
    fontFamily: "Nunito_700Bold",
  },
  content: {
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 22,
    color: colors.Black,
    marginTop: 30,
    marginBottom: 6,
    fontFamily: "Nunito_700Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    paddingBottom: 4,
  },
  bodyText: {
    fontSize: 16,
    color: "#5A5A5A",
    lineHeight: 24,
    marginBottom: 8,
    fontFamily: "Nunito_700Bold",
  },
});
