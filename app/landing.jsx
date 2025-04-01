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
    backgroundColor: "#3B8EE2",
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
    color: "#F8F9FA",
    textAlign: "center",
    fontFamily: "Nunito_700Bold",
  },
  tagline: {
    fontSize: 18,
    color: "#F8F9FA",
    marginBottom: 80,
    textAlign: "center",
    fontFamily: "Nunito_700Bold",
  },
  button: {
    backgroundColor: "#F8F9FA",
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 8,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3B8EE2",
    fontFamily: "Nunito_700Bold",
  },
  terms: {
    fontSize: 14,
    color: "#F8F9FA",
    textAlign: "center",
    opacity: 0.8,
    fontFamily: "Nunito_700Bold",
  },
});
