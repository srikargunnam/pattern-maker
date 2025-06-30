import { router } from "expo-router";
import { useAtom } from "jotai";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { measurementsAtom } from "../atoms/measurements";

const measurementsList = [
  { label: "Chest", key: "chest" },
  { label: "Waist", key: "waist" },
  { label: "Full Length", key: "fullLength" },
  { label: "Shoulder", key: "shoulder" },
  { label: "Blouse Length", key: "blouseLength" },
  { label: "Armhole Depth", key: "armhole" },
  { label: "Sleeve Length", key: "sleeveLength" },
  { label: "Sleeve Round", key: "sleeveRound" },
  { label: "Neck Depth (Front)", key: "neckFront" },
  { label: "Neck Depth (Back)", key: "neckBack" },
  { label: "Height", key: "height" },
];

const MeasurementsScreen = () => {
  const [measurements, setMeasurements] = useAtom(measurementsAtom);

  const handleChange = (key: keyof typeof measurements, value: number) => {
    setMeasurements((prev) => ({ ...prev, [key]: value }));
  };

  const isFormComplete = Object.values(measurements).every((val) => val !== "");

  const handleSave = () => {
    // Alert.alert("Measurements Saved", JSON.stringify(measurements, null, 2));
    router.push("/designs");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        className="p-4"
      >
        <Text className="text-2xl font-bold mb-4 text-center">
          Enter Measurements
        </Text>

        {measurementsList.map(({ label, key }) => (
          <View key={key} className="mb-4">
            <Text className="text-base font-medium mb-1">
              {label} (in inches)
            </Text>
            <TextInput
              className="border border-gray-300 rounded-md px-4 py-2"
              keyboardType="numeric"
              value={measurements[key as keyof typeof measurements].toString()}
              onChangeText={(text) =>
                handleChange(key as keyof typeof measurements, Number(text))
              }
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </View>
        ))}
      </ScrollView>

      <View className="absolute bottom-4 left-4 right-4">
        <TouchableOpacity
          disabled={!isFormComplete}
          onPress={handleSave}
          className={`py-3 rounded-full ${
            isFormComplete ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          <Text className="text-center text-white text-lg font-semibold">
            Save Measurements
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MeasurementsScreen;
