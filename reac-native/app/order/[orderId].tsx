import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const orderIdScreen = () => {
  const { orderId } = useLocalSearchParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const isValidTimestamp = (timestamp: number) => {
      return typeof timestamp === "number" && timestamp > 0 && !isNaN(new Date(timestamp).getTime());
    };

    const numericValue = Number(orderId);

    if (isValidTimestamp(numericValue)) {
      const date = new Date(numericValue);
      const dateString = date.toLocaleString("es-ES");
      setData({ date, dateString, orderId });
    } else {
      setData({ orderId });
    }
  }, [orderId]); // Ejecutar cuando 'id' cambie

  return (
    <View style={{ marginHorizontal: 10 }}>
      <Text style={styles.text}>Chat ID Screen</Text>
      <Text style={styles.text}>data: {JSON.stringify(data, null, 2)}</Text>
    </View>
  );
};

export default orderIdScreen;

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
    color: "green",
    fontSize: 20,
  },
});
