import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View style={styles.container}>
        {/* Illustration Section */}
        <View style={styles.illustrationWrapper}>
          {/* Optional Fallback if image missing */}
          <Image
            source={require("../assets/images/LandingGraphic.png")}
            style={styles.illustration}
            resizeMode="stretch"
            onError={() => console.warn("LandingGraphic not found")}
          />
          <View style={styles.imageBottomMargin} />
        </View>

        {/* Main Content Section */}
        <View style={styles.contentContainer}>
          {/* Logo and App Name */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/Logo.png")}
              style={styles.logo}
              resizeMode="contain"
              onError={() => console.warn("Logo not found")}
            />
            <Text style={styles.appName}>SnapScript</Text>
          </View>

          {/* Tagline */}
          <Text style={styles.tagline}>Smart Scanning for Smarter Health!</Text>

          {/* Continue Button */}
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </Link>

          {/* Terms Note */}
          <Text style={styles.terms}>
            Note: By clicking continue, you{"\n"}agree to our terms and
            conditions
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "light-blue",
  },
  container: {
    flex: 1,
  },
  illustrationWrapper: {
    backgroundColor: "#F8F9FA",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
  },
  illustration: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  imageBottomMargin: {
    height: 20,
    backgroundColor: "#F8F9FA",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: -90,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 120,
  },
  appName: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#000", // changed from white
    textAlign: "center",
  },
  tagline: {
    fontSize: 18,
    color: "#333", // changed from white
    marginBottom: 80,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 8,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#007AFF",
  },
  terms: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    opacity: 0.8,
  },
});
