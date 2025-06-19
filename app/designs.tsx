import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const designs = [
  { label: "Boatneck", id: "boatneck" },
  { label: "V-Neck", id: "v-neck" },
  { label: "Square Neck", id: "square-neck" },
  { label: "Round Neck", id: "round-neck" },
];

export default function DesignsScreen() {
  const handleSelect = (id: string) => {
    router.push(`/pattern/${id}`);
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-6">
      <Text className="text-2xl font-bold text-center mb-4">
        Select Blouse Design
      </Text>

      <View className="gap-4">
        {designs.map((design) => (
          <TouchableOpacity
            key={design.id}
            className="bg-blue-600 py-4 px-6 rounded-xl"
            onPress={() => handleSelect(design.id)}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {design.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
