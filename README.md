# SnapScript

## Medication management mobile app with AI-powered label scanning

SnapScript is a mobile app built with React Native and Expo that makes managing medications simple and reliable. Its key feature is the ability to scan a prescription label with your phone’s camera, automatically extracting dosage, schedule, and refill details using OCR and AI. Users can also add medications manually, receive smart daily and refill reminders, and search a built-in database for medication information.

---

## Features

- **Scan Medication Labels**  
  Use your camera and OCR to extract medication info from labels.

- **Manual Entry Option**  
  Enter medication name, dosage, instructions, and more.

- **Smart Reminders**  
  Daily and refill reminders built-in with in-app notification support.

- **Search Medication Info**  
  Browse common medications with brand names, dosage, side effects, and warnings.

- **Firestore Integration**  
  User medications are stored securely via Firebase Firestore.

- **Authentication**  
  Sign up and log in with Firebase Auth.

---

## Built With

- **React Native + Expo Router**
- **Firebase (Auth + Firestore)**
- **Expo OCR**
- **ChatGPT API** (to extract structured data from label text)
- **Expo Notifications**
- **Custom Styling**

---

## App Screens

- Welcome
- Sign Up / Log In
- Home (Current Medications)
- Add Medication (Scan or Manual Entry)
- Medication Info (Search + View Details)
- Edit Medication Details

---

## Getting Started

**1. Clone the repo**

- git clone https://github.com/Conor1406/SnapScript.git
- cd SnapScript

**2. Install Dependancies**

- npm install

**3. Insert API keys**

- Add firebase config, Openai API, and firestore API keys

**4. Start Expo server**

- npx expo start

**5. Run on device using Expo Go**
