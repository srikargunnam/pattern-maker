import { cmToInches, inchesToCm } from "@/utils";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
  { label: "Shoulder Band Width", key: "shoulderBand" },
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
  const [unit, setUnit] = useState("cm");

  const handleChange = (key: keyof typeof measurements, value: number) => {
    setMeasurements((prev) => ({
      ...prev,
      [key]: unit === "cm" ? value : inchesToCm(value),
    }));
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
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold mb-4 text-left">
            Enter Measurements
          </Text>
          <View className="flex-row gap-2 bg-gray-100 rounded-md p-2">
            <Pressable
              className={`w-10 ${
                unit === "cm" ? "bg-blue-500" : "bg-gray-200"
              } rounded-sm`}
              onPress={() => setUnit("cm")}
              disabled={unit === "cm"}
            >
              <Text className="text-center text-white font-bold">cm</Text>
            </Pressable>
            <Pressable
              className={`w-10 ${
                unit === "in" ? "bg-blue-500" : "bg-gray-200"
              } rounded-sm`}
              onPress={() => setUnit("in")}
              disabled={unit === "in"}
            >
              <Text className="text-center text-white font-bold">in</Text>
            </Pressable>
          </View>
        </View>

        {measurementsList.map(({ label, key }) => (
          <View key={key} className="mb-4">
            <Text className="text-base font-medium mb-1">
              {label} (in {unit})
            </Text>
            <TextInput
              className="border border-gray-300 rounded-md px-4 py-2"
              keyboardType="numeric"
              value={
                unit === "cm"
                  ? measurements[key as keyof typeof measurements].toString()
                  : cmToInches(
                      measurements[key as keyof typeof measurements]
                    ).toString()
              }
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
