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
    <View>
      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5E8C7" />
        <View style={styles.container}>
          {/* Illustration Section */}
          <View style={styles.illustrationWrapper}>
            <Image
              source={require("../assets/images/LandingGraphic.png")}
              style={styles.illustration}
              resizeMode="stretch"
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
              />
              <Text style={styles.appName}>SnapScript</Text>
            </View>

            {/* Tagline */}
            <Text style={styles.tagline}>
              Smart Scanning for Smarter Health!
            </Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  illustrationWrapper: {
    overflow: "hidden",
    backgroundColor: "#F8F9FA",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
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
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
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
    resizeMode: "contain",
  },
  appName: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  tagline: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 80,
    textAlign: "center",
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
  },
  terms: {
    fontSize: 12,
    color: "#F8F9FA",
    textAlign: "center",
    opacity: 0.8,
  },
});
