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
          {/* Brand */}
          {brand && (
            <>
              <Text
                style={[
                  styles.heading,
                  {
                    color: "#d06b6d",
                    textShadowColor: "#00000022",
                    textShadowOffset: { width: 0.5, height: 0.5 },
                    textShadowRadius: 1,
                  },
                ]}
              >
                Brand Names
              </Text>
              <Text style={styles.bodyText}>{brand}</Text>
            </>
          )}

          {/* Description */}
          {description && (
            <>
              <Text
                style={[
                  styles.heading,
                  {
                    color: "#3cb3a9",
                    textShadowColor: "#00000022",
                    textShadowOffset: { width: 0.5, height: 0.5 },
                    textShadowRadius: 1,
                  },
                ]}
              >
                Description
              </Text>
              <Text style={styles.bodyText}>{description}</Text>
            </>
          )}

          {/* Dosage */}
          {dosage && (
            <>
              <Text
                style={[
                  styles.heading,
                  {
                    color: "#e68b19",
                    textShadowColor: "#00000022",
                    textShadowOffset: { width: 0.5, height: 0.5 },
                    textShadowRadius: 1,
                  },
                ]}
              >
                Dosage
              </Text>
              <Text style={styles.bodyText}>{dosage}</Text>
            </>
          )}

          {/* Side Effects */}
          {sideEffects && (
            <>
              <Text
                style={[
                  styles.heading,
                  {
                    color: "#4a65c9",
                    textShadowColor: "#00000022",
                    textShadowOffset: { width: 0.5, height: 0.5 },
                    textShadowRadius: 1,
                  },
                ]}
              >
                Potential Side Effects
              </Text>
              <Text style={styles.bodyText}>{sideEffects}</Text>
            </>
          )}

          {/* Important Info */}
          {importantInfo && (
            <>
              <Text
                style={[
                  styles.heading,
                  {
                    color: "#5fb85f",
                    textShadowColor: "#00000022",
                    textShadowOffset: { width: 0.5, height: 0.5 },
                    textShadowRadius: 1,
                  },
                ]}
              >
                Important Info
              </Text>
              <Text style={styles.bodyText}>{importantInfo}</Text>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
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
    color: colors.Black,
    lineHeight: 24,
    marginBottom: 8,
    fontFamily: "Nunito_700Bold",
  },
});
