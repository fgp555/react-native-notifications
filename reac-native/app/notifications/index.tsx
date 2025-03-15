// https://expo.dev/notifications

import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { usePushNotifications } from "@/src/hooks/usePushNotifications";
import { router } from "expo-router";

export default function PushApp() {
  const { expoPushToken, notifications, sendPushNotification } = usePushNotifications();
  const [time, setTime] = useState<string>("");
  const [counter, setCounter] = useState(0);
  const [timeArray, setTimeArray] = useState<string[]>([]);

  const message = {
    to: [expoPushToken],
    sound: "default",
    title: "Title Now: " + new Date().toLocaleTimeString(),
    body: "Body time: " + new Date().toLocaleTimeString(),
    data: { orderId: Date.now(), Time: new Date().toLocaleTimeString() },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    await sendPushNotification(message);
    setCounter(counter + 1);
    setTimeArray([...timeArray, new Date().toLocaleTimeString()]);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          router.push("./template");
        }}
      >
        <Text style={styles.textButton}>Expo push notifications Test</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Token: </Text>
      <TextInput style={styles.input}>
        <Text>{expoPushToken}</Text>
      </TextInput>
      <Button title="Send Time Notification" onPress={handleSubmit} />

      <Text style={styles.title}>Time: {time}</Text>
      <Text style={styles.title}>Counter: {counter}</Text>
      <View style={{ height: 10 }} />

      {timeArray.map((item, index) => (
        <View key={index}>
          <Text>
            {index + 1} — {item}
          </Text>
        </View>
      ))}
      <Text style={styles.title}>Notifications: </Text>
      <View style={{ height: 10 }} />
      {notifications && notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.request.identifier}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                router.push(`./order/${item.request.content.data.orderId}`);
              }}
            >
              <Text style={styles.subTitle}>{item.request.content.title}</Text>
              <Text>{item.request.content.body}</Text>
              <Text>orderId: {item.request.content.data.orderId}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      ) : (
        <Text>No notifications</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "green",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textButton: {
    color: "white",
    // fontWeight: "bold",
  },
});
