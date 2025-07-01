import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const blouseStyles = [
  { label: "Plain Blouse", id: "plain_blouse" },
  { label: "Choli Blouse", id: "choli_blouse" },
  { label: "Saree Blouse", id: "saree_blouse" },
  { label: "High Neck Blouse", id: "high_neck_blouse" },
];

const DesignsScreen = () => {
  const handleSelect = (id: string) => {
    router.push(`/pattern-screen/${id}`);
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-6">
      <Text className="text-2xl font-bold text-center mb-4">
        Select Blouse Style
      </Text>

      <View className="gap-4">
        {blouseStyles.map((design) => (
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
};

export default DesignsScreen;
