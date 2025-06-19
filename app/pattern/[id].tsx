import { Feather } from "@expo/vector-icons";
import * as Print from "expo-print";
import { useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import { useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import PatternSheet from "../../components/patterns/PatternSheet";

export default function PatternScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const supportedDesigns = ["boatneck", "v-neck", "square-neck", "round-neck"];
  const isSupported = id && supportedDesigns.includes(id);

  const patternRef = useRef<View>(null);

  const handleExportToPDF = async () => {
    try {
      const imageUri = await captureRef(patternRef, {
        format: "png",
        quality: 1,
      });

      const html = `
        <html>
          <body style="margin:0;padding:0;">
            <img src="${imageUri}" style="width:100%;" />
          </body>
        </html>
      `;

      const { uri: pdfUri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(pdfUri, {
        dialogTitle: `Export ${id} Pattern`,
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-2xl font-bold mb-4 capitalize text-center">
          {isSupported
            ? `${id.replace("-", " ")} blouse pattern`
            : "Invalid Design"}
        </Text>

        {isSupported ? (
          <View
            ref={patternRef}
            collapsable={false}
            className="bg-white rounded-md overflow-hidden"
          >
            <PatternSheet design={id} />
          </View>
        ) : (
          <Text className="text-center text-red-500">
            Design not supported.
          </Text>
        )}
      </ScrollView>

      {isSupported && (
        <TouchableOpacity
          onPress={handleExportToPDF}
          className="absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg"
        >
          <Feather name="download" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}
