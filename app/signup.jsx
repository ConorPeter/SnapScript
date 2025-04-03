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
import colors from "../lib/colors";

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

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        email,
        createdAt: serverTimestamp(),
      });

      console.log("User saved to Firestore");
      Alert.alert("Success", "Account created!");

      router.replace("/home");
    } catch (error) {
      console.error("Sign up error:", error);
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
    backgroundColor: colors.OffWhite,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.Black,
    marginBottom: 10,
    fontFamily: "Nunito_700Bold",
  },
  subtitle: {
    fontSize: 20,
    color: colors.Grey,
    marginBottom: 40,
    fontFamily: "Nunito_700Bold",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 22,
    fontWeight: "500",
    color: colors.Black,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: "Nunito_700Bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.LightGrey,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
    color: colors.Black,
    fontFamily: "Nunito_700Bold",
  },
  loginButton: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.Blue,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.OffWhite,
  },
  loginButtonText: {
    color: colors.Blue,
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Nunito_700Bold",
  },
  createAccountButton: {
    width: "100%",
    backgroundColor: colors.Blue,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  createAccountText: {
    color: colors.OffWhite,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Nunito_700Bold",
  },
});
