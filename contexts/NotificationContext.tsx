import React, { createContext, useContext, useState } from "react";
import { Modal, View, Text, Button } from "react-native";

type NotificationContextType = {
  showNotification: (title: string, message: string) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used inside NotificationProvider");
  return context;
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const showNotification = (title: string, message: string) => {
    setTitle(title);
    setMessage(message);
    setVisible(true);
  };

  const hideNotification = () => setVisible(false);

  return (
    <NotificationContext.Provider
      value={{ showNotification, hideNotification }}
    >
      {children}
      {visible && (
        <Modal
          animationType="slide"
          transparent
          visible={visible}
          onRequestClose={hideNotification}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000000aa",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                maxWidth: "80%",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
              >
                {title}
              </Text>
              <Text style={{ marginBottom: 20 }}>{message}</Text>
              <Button title="OK" onPress={hideNotification} />
            </View>
          </View>
        </Modal>
      )}
    </NotificationContext.Provider>
  );
};
