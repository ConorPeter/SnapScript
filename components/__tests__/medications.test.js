import { render, fireEvent } from "@testing-library/react-native";
import { renderHook } from "@testing-library/react-hooks";
import { NotificationProvider } from "../../contexts/NotificationContext";
import useCustomFonts from "../../hooks/useCustomFonts";

const medications = require("../../app/data/medications.json");

describe("Medications JSON Data", () => {
  // Test 1: Check if the JSON is an array
  test("should be an array", () => {
    expect(Array.isArray(medications)).toBe(true);
  });

  // Test 2: Validate the structure of each medication object
  test("each medication should have required fields", () => {
    medications.forEach((medication) => {
      expect(medication).toHaveProperty("name");
      expect(medication).toHaveProperty("brand");
      expect(medication).toHaveProperty("description");
      expect(medication).toHaveProperty("dosage");
      expect(medication).toHaveProperty("sideEffects");
      expect(medication).toHaveProperty("importantInfo");
    });
  });

  // Test 3: Ensure no medication has an empty "name" field
  test("no medication should have an empty name", () => {
    medications.forEach((medication) => {
      expect(medication.name).not.toBe("");
    });
  });
});

// Test 4: Tests the ability to show and hide notifications
describe("NotificationContext", () => {
  it("shows and hides notifications", () => {
    const TestComponent = () => {
      const { showNotification, hideNotification } =
        React.useContext(NotificationProvider);

      return (
        <>
          <TouchableOpacity onPress={() => showNotification("Test", "Message")}>
            <Text>Show</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hideNotification}>
            <Text>Hide</Text>
          </TouchableOpacity>
        </>
      );
    };

    const { getByText, queryByText } = render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    fireEvent.press(getByText("Show"));
    expect(queryByText("Test")).toBeTruthy();

    fireEvent.press(getByText("Hide"));
    expect(queryByText("Test")).toBeNull();
  });
});

// Test 5: useCustomFonts() hook returns true when fonts have loaded
describe("useCustomFonts", () => {
  it("returns true when fonts are loaded", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCustomFonts());
    await waitForNextUpdate();
    expect(result.current).toBe(true);
  });
});
