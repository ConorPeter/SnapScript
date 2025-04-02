import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Switch,
  ScrollView,
  Modal,
  FlatList,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import colors from "../lib/colors";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";
import { Alert } from "react-native";

export default function ManualEntryScreen() {
  const [medicationName, setMedicationName] = useState("");
  const [dosageAmount, setDosageAmount] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [instructions, setInstructions] = useState("");
  const [frequency, setFrequency] = useState("");
  const [dailyReminder, setDailyReminder] = useState(false);
  const [refillReminder, setRefillReminder] = useState(false);
  const [refillDate, setRefillDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasShownDatePicker, setHasShownDatePicker] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [hasShownTimePicker, setHasShownTimePicker] = useState(false);
  const router = useRouter();
  const [isDosageFormModalVisible, setDosageFormModalVisible] = useState(false);
  const [isFrequencyModalVisible, setFrequencyModalVisible] = useState(false);

  const dosageFormOptions = [
    "Tablet",
    "Capsule",
    "Liquid",
    "Injection",
    "Drops",
    "Cream",
    "Other",
  ];
  const frequencyOptions = [
    "Daily",
    "Every 12 hours",
    "Every 8 hours",
    "Weekly",
    "As Needed",
  ];

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || refillDate;
    setShowDatePicker(false);
    setHasShownDatePicker(true);
    setRefillDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || reminderTime;
    setShowTimePicker(false);
    setHasShownTimePicker(true);
    setReminderTime(currentTime);
  };

  const handleRefillReminderToggle = (value) => {
    setRefillReminder(value);
    if (value && !hasShownDatePicker) {
      setShowDatePicker(true);
    } else if (!value) {
      setShowDatePicker(false);
      setHasShownDatePicker(false);
    }
  };

  const handleAddMedication = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Not logged in", "Please log in to save medications.");
      return;
    }

    if (!medicationName || !dosageAmount || !dosageForm) {
      Alert.alert("Missing fields", "Please complete all required fields.");
      return;
    }

    const medicationData = {
      name: medicationName,
      dosage: dosageAmount,
      dosageForm,
      instructions,
      frequency,
      dailyReminder,
      reminderTime: dailyReminder ? reminderTime.toISOString() : null,
      refillReminder,
      refillDate: refillReminder ? refillDate.toISOString() : null,
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(
        collection(db, "users", user.uid, "medications"),
        medicationData
      );
      Alert.alert("Success", "Medication added!");
      router.replace("/home");
    } catch (error) {
      console.error("Error saving medication:", error);
      Alert.alert("Error", "Failed to save medication. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <StatusBar
          backgroundColor="#F5F5F5"
          barStyle="dark-content"
          translucent={false}
        />
      )}

      <SafeAreaView style={styles.contentContainer}>
        {/* Header with Logo and Title */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>Add Medication</Text>
        </View>

        {/* Scrollable content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Graphic */}
            <View style={styles.graphicContainer}>
              <Image
                source={require("../assets/images/Pharmacist.jpg")}
                style={styles.graphic}
              />
            </View>

            {/* Scan Label Button */}
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Scan Label</Text>
            </TouchableOpacity>

            {/* Medication Name */}
            <Text style={styles.label}>Medication Name</Text>
            <TextInput
              style={styles.input}
              value={medicationName}
              onChangeText={setMedicationName}
              placeholder="Medication name"
              placeholderTextColor="#8E8E93"
            />

            {/* Dosage Amount */}
            <Text style={styles.label}>Dosage Amount</Text>
            <TextInput
              style={styles.input}
              value={dosageAmount}
              onChangeText={setDosageAmount}
              placeholder="e.g., 200 mg"
              placeholderTextColor="#8E8E93"
            />

            {/* Dosage Form */}
            <Text style={styles.label}>Dosage Form</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDosageFormModalVisible(true)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !dosageForm && styles.placeholderText,
                ]}
              >
                {dosageForm || "Select dosage form"}
              </Text>
            </TouchableOpacity>

            {/* Dosage Form Modal */}
            <Modal
              visible={isDosageFormModalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setDosageFormModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setDosageFormModalVisible(false)}
              >
                <View style={styles.modalContent}>
                  <FlatList
                    data={dosageFormOptions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                          setDosageForm(item);
                          setDosageFormModalVisible(false);
                        }}
                      >
                        <Text style={styles.modalItemText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Frequency Selector */}
            <Text style={styles.label}>Frequency</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setFrequencyModalVisible(true)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !frequency && styles.placeholderText,
                ]}
              >
                {frequency || "Select frequency"}
              </Text>
            </TouchableOpacity>

            {/* Frequency Modal */}
            <Modal
              visible={isFrequencyModalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setFrequencyModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setFrequencyModalVisible(false)}
              >
                <View style={styles.modalContent}>
                  <FlatList
                    data={frequencyOptions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                          setFrequency(item);
                          setFrequencyModalVisible(false);
                        }}
                      >
                        <Text style={styles.modalItemText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Instructions */}
            <Text style={styles.label}>Instructions</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={instructions}
              onChangeText={setInstructions}
              placeholder="e.g., Take with food"
              placeholderTextColor="#8E8E93"
              multiline
            />

            {/* Daily Reminder */}
            <View style={styles.switchContainerDaily}>
              <Text style={styles.label}>Daily Reminder?</Text>
              <Switch
                value={dailyReminder}
                onValueChange={(value) => {
                  setDailyReminder(value);
                  if (value && !hasShownTimePicker) {
                    setShowTimePicker(true);
                  } else if (!value) {
                    setShowTimePicker(false);
                    setHasShownTimePicker(false);
                  }
                }}
                trackColor={{ false: "#8E8E93", true: "#007AFF" }}
                thumbColor={dailyReminder ? "#FFFFFF" : "#FFFFFF"}
              />
            </View>

            {/* Daily Reminder Time Picker */}
            {dailyReminder && showTimePicker && (
              <DateTimePicker
                value={reminderTime}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}

            {/* Refill Reminder */}
            <View style={styles.switchContainerRefill}>
              <Text style={styles.label}>Refill Reminder?</Text>
              <Switch
                value={refillReminder}
                onValueChange={handleRefillReminderToggle}
                trackColor={{ false: "#8E8E93", true: "#007AFF" }}
                thumbColor={refillReminder ? "#FFFFFF" : "#FFFFFF"}
              />
            </View>

            {/* Refill Reminder Date Picker (Conditional) */}
            {refillReminder && showDatePicker && (
              <DateTimePicker
                value={refillDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddMedication}
            >
              <Text style={styles.submitButtonText}>Add Medication</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/add-medication")}
          >
            <Ionicons name="add-circle-outline" size={26} color="#3B8EE2" />
            <Text style={[styles.navText, { color: "#3B8EE2" }]}>Add Med</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/home")}
          >
            <Ionicons name="home-outline" size={26} color="#8E8E93" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/medication-search")}
          >
            <Ionicons
              name="information-circle-outline"
              size={26}
              color="#8E8E93"
            />
            <Text style={styles.navText}>Med Info</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 16,
  },
  graphicContainer: {
    marginBottom: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  graphic: {
    width: 350,
    height: 175,
    resizeMode: "cover",
    borderRadius: 50,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
    fontFamily: "Nunito_700Bold",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    color: "#000",
    marginBottom: 25,
    fontFamily: "Nunito_700Bold",
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 25,
  },
  dropdownText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Nunito_700Bold",
  },
  placeholderText: {
    color: "#8E8E93",
    fontFamily: "Nunito_700Bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: "80%",
    maxHeight: "50%",
    padding: 10,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  modalItemText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Nunito_700Bold",
  },
  switchContainerRefill: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  switchContainerDaily: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scanButton: {
    backgroundColor: colors.Blue,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  scanButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.OffWhite,
    fontFamily: "Nunito_700Bold",
  },
  submitButton: {
    backgroundColor: colors.Blue,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 30,
    alignItems: "center",
    marginBottom: 70,
  },
  submitButtonText: {
    fontSize: 20,
    color: colors.OffWhite,
    fontFamily: "Nunito_700Bold",
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    marginBottom: 5,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 18,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Nunito_700Bold",
  },
});
