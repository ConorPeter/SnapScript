import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { auth } from "../lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter your email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("✅ Logged in:", userCredential.user);
      Alert.alert("Success", "Logged in!");
      router.replace("/home");
    } catch (error) {
      console.error("❌ Login error:", error);
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Let's Sign You In</Text>
      <Text style={styles.subtitle}>Welcome Back!</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/signup" asChild>
        <TouchableOpacity style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#999",
    marginBottom: 30,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  createAccountButton: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  createAccountText: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "500",
  },
});
