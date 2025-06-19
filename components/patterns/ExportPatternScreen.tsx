import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useRef } from "react";
import { Button, ScrollView, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import PatternSheet from "./PatternSheet";

export default function ExportPatternScreen() {
  const patternRef = useRef<View>(null);

  const handleExportToPDF = async () => {
    try {
      const uri = await captureRef(patternRef, {
        format: "png",
        quality: 1,
      });

      const html = `
        <html>
          <body style="margin:0;padding:0;">
            <img src="${uri}" style="width:100%; height:auto;" />
          </body>
        </html>
      `;

      const { uri: pdfUri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      console.log("PDF saved to:", pdfUri);

      await Sharing.shareAsync(pdfUri, {
        mimeType: "application/pdf",
        dialogTitle: "Share Pattern PDF",
      });
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View
        ref={patternRef}
        collapsable={false}
        style={{
          backgroundColor: "#ffffff",
          padding: 16,
        }}
      >
        <PatternSheet design="boatneck" />
      </View>

      <View style={{ marginTop: 24 }}>
        <Button title="Export Pattern as PDF" onPress={handleExportToPDF} />
      </View>
    </ScrollView>
  );
}
