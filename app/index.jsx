import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SnapScript</Text>

      <View style={styles.buttonContainer}>
        <Link href="/signup" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/home" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/add-medication" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Medication</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/medication-search" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Medication Search</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/edit-medication" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Medication</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/medication-info-display" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Medication Info display</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/welcome" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Welcome</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
