import { Feather } from "@expo/vector-icons";
import * as Print from "expo-print";
import { useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { captureRef } from "react-native-view-shot";

import { measurementsAtom } from "@/atoms/measurements";
import { PatternView } from "@/components/PatternView";
import { useAtomValue } from "jotai";
import { useRef } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const PatternScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  // const supportedDesigns = ["boatneck", "v-neck", "square-neck", "round-neck"];
  // const isSupported = id && supportedDesigns.includes(id);
  const isSupported = true;
  const measurements = useAtomValue(measurementsAtom);

  const patternRef = useRef(null);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const savedOffsetX = useSharedValue(0);
  const savedOffsetY = useSharedValue(0);

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      // Reset zoom and pan
      scale.value = 1;
      savedScale.value = 1;

      offsetX.value = 0;
      offsetY.value = 0;
      savedOffsetX.value = 0;
      savedOffsetY.value = 0;
    });

  const panGesture = Gesture.Pan()
    // .onBegin(() => {
    //   savedOffsetX.value = offsetX.value;
    //   savedOffsetY.value = offsetY.value;
    // })
    .onUpdate((e) => {
      offsetX.value = savedOffsetX.value + e.translationX;
      offsetY.value = savedOffsetY.value + e.translationY;
    })
    .onEnd(() => {
      savedOffsetX.value = offsetX.value;
      savedOffsetY.value = offsetY.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composedGesture = Gesture.Simultaneous(
    Gesture.Race(doubleTapGesture),
    Gesture.Simultaneous(panGesture, pinchGesture)
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { scale: scale.value },
    ],
  }));

  const handleExportToPDF = async () => {
    try {
      const imageBase64 = await captureRef(patternRef, {
        format: "png",
        quality: 1,
        result: "base64", // Use base64 result
      });

      const html = `
        <html>
          <body style="margin:0;padding:0;">
            <img src="data:image/png;base64,${imageBase64}" style="width:100%;" />
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
      <Text className="text-2xl font-bold mt-6 mb-4 capitalize text-center">
        {isSupported
          ? `${id.replace("-", " ")} blouse pattern`
          : "Invalid Design"}
      </Text>

      <View className="overflow-hidden border border-black mx-2">
        {isSupported && (
          <GestureDetector gesture={composedGesture}>
            <Animated.View
              ref={patternRef}
              collapsable={false}
              style={[
                animatedStyle,
                {
                  width,
                  height: height * 0.75,
                  backgroundColor: "#fff",
                  overflow: "hidden",
                },
              ]}
            >
              <PatternView measurements={measurements} blouseStyle={id} />
            </Animated.View>
          </GestureDetector>
        )}
      </View>
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
};

export default PatternScreen;
