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
import { auth, db } from "../lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function SignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!firstName || !email || !password) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        email,
        createdAt: serverTimestamp(),
      });

      console.log("✅ User saved to Firestore");
      Alert.alert("Success", "Account created!");

      router.replace("/home");
    } catch (error) {
      console.error("❌ Sign up error:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/Logo.png")}
        style={styles.logo}
      />

      {/* Title and Subtitle */}
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Smart Scanning for Smarter Health!</Text>

      {/* First Name Input */}
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#999"
        value={firstName}
        onChangeText={setFirstName}
      />

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleSignUp}
      >
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>

      {/* Login Redirect */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.loginButtonText}>Already have an account?</Text>
      </TouchableOpacity>
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
    marginBottom: 40,
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
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  loginButtonText: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "500",
  },
  createAccountButton: {
    width: "100%",
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  createAccountText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
