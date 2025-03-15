import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App</Text>
      <Button title="Go to Notifications" onPress={() => router.push("/notifications")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "green",
    margin: 50,
    textAlign: "center",
  },
});
