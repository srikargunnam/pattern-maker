import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg mb-4">Home</Text>
      <Button
        title="Go to Measurements"
        onPress={() => router.push("/measurements")}
      />
    </View>
  );
}
