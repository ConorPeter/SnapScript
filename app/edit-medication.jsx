import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";
import colors from "../lib/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNotification } from "../contexts/NotificationContext";

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

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const user = auth.currentUser;
        if (user && id) {
          const medDoc = await getDoc(
            doc(db, "users", user.uid, "medications", id)
          );
          if (medDoc.exists()) {
            const data = medDoc.data();
            setMedicationName(data.name);
            setDosageAmount(data.dosageAmount);
            setDosageForm(data.dosageForm);
            setInstructions(data.instructions);
            setFrequency(data.frequency);
            setDailyReminder(data.dailyReminder);
            setRefillReminder(data.refillReminder);
            setRefillDate(data.refillDate?.toDate?.() || new Date());
            setReminderTime(data.reminderTime?.toDate?.() || new Date());
          }
        }
      } catch (err) {
        console.error("Failed to load medication", err);
      }
    };

    fetchMedication();
  }, [id]);

  const scheduleReminder = (med) => {
    if (med.dailyReminder && med.reminderTime) {
      const now = new Date();
      const reminderTime = new Date(med.reminderTime);

      const timeDifference =
        reminderTime.getTime() - now.getTime() > 0
          ? reminderTime.getTime() - now.getTime()
          : 24 * 60 * 60 * 1000 + (reminderTime.getTime() - now.getTime());

      setTimeout(() => {
        showNotification("Medication Reminder", `Time to take ${med.name}!`);
      }, timeDifference);
    }

    if (med.refillReminder && med.refillDate) {
      const refillDate = new Date(med.refillDate);
      refillDate.setHours(10, 0, 0, 0);

      const now = new Date();
      const timeDifference = refillDate.getTime() - now.getTime();

      if (timeDifference > 0) {
        setTimeout(() => {
          showNotification("Refill Reminder", `Time to get more ${med.name}!`);
        }, timeDifference);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !id) return;

      const updatedData = {
        ...(medicationName && { name: medicationName }),
        ...(dosageAmount && { dosageAmount }),
        ...(dosageForm && { dosageForm }),
        ...(instructions && { instructions }),
        ...(frequency && { frequency }),
        ...(dailyReminder !== undefined && { dailyReminder }),
        ...(refillReminder !== undefined && { refillReminder }),
        ...(refillDate && { refillDate }),
        ...(reminderTime && { reminderTime }),
      };

      const medRef = doc(db, "users", user.uid, "medications", id);
      await updateDoc(medRef, updatedData);

      // Schedule reminders after updating
      scheduleReminder({ ...updatedData, id });

      Alert.alert("Success", "Medication updated.");
      router.push("/home");
    } catch (err) {
      console.error("Error updating medication:", err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

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
    if (value) {
      setShowDatePicker(true); // Ensure the date picker remains visible
    } else {
      setShowDatePicker(false);
      setHasShownDatePicker(false);
    }
  };

  const handleDailyReminderToggle = (value) => {
    setDailyReminder(value);
    if (value) {
      setShowTimePicker(true); // Ensure the time picker remains visible
    } else {
      setShowTimePicker(false);
      setHasShownTimePicker(false);
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
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={44} color="#333" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <Image
                source={require("../assets/images/Logo.png")}
                style={styles.logo}
              />
              <Text style={styles.headerText}>Edit Medication</Text>
            </View>

            <View style={styles.graphicContainer}>
              <Image
                source={require("../assets/images/MedicalGraphic.jpg")}
                style={styles.graphic}
              />
            </View>

            <Text style={styles.label}>Medication Name</Text>
            <TextInput
              style={styles.input}
              value={medicationName}
              onChangeText={setMedicationName}
              placeholder="Medication name"
              placeholderTextColor="#8E8E93"
            />

            <Text style={styles.label}>Dosage Amount</Text>
            <TextInput
              style={styles.input}
              value={dosageAmount}
              onChangeText={setDosageAmount}
              placeholder="e.g., 200 mg"
              placeholderTextColor="#8E8E93"
            />

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

            <Text style={styles.label}>Instructions</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={instructions}
              onChangeText={setInstructions}
              placeholder="e.g., Take with food"
              placeholderTextColor="#8E8E93"
              multiline
            />

            <View style={styles.switchContainerDaily}>
              <Text style={styles.label}>Daily Reminder?</Text>
              <Switch
                value={dailyReminder}
                onValueChange={handleDailyReminderToggle}
                trackColor={{ false: "#8E8E93", true: "#007AFF" }}
                thumbColor={dailyReminder ? "#FFFFFF" : "#FFFFFF"}
              />
            </View>

            {dailyReminder && (
              <DateTimePicker
                value={reminderTime}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}

            <View style={styles.switchContainerRefill}>
              <Text style={styles.label}>Refill Reminder?</Text>
              <Switch
                value={refillReminder}
                onValueChange={handleRefillReminderToggle}
                trackColor={{ false: "#8E8E93", true: "#007AFF" }}
                thumbColor={refillReminder ? "#FFFFFF" : "#FFFFFF"}
              />
            </View>

            {refillReminder && (
              <DateTimePicker
                value={refillDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleUpdate}
            >
              <Text style={styles.submitButtonText}>Update Medication</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
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
    marginRight: 5,
    marginLeft: 60,
  },
  headerTitle: {
    fontSize: 28,
    color: "#000",
    fontFamily: "Nunito_700Bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 5,
    marginLeft: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Nunito_700Bold",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 60 : 60,
    left: 10,
    zIndex: 10,
  },
});
