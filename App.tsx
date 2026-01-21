import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Paperclip } from "lucide-react-native";
import { UploadBottomSheet } from "./src/components/upload/UploadBottomSheet";
import { useMediaSelection } from "./src/hooks/useMediaSelection";
import { COLORS } from "./src/constants/theme";

export default function App() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { selectedIds, toggleSelection, count } = useMediaSelection();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.chatArea}>
          <Text style={styles.placeholderText}>Chat Conversation Area</Text>
          <Text style={styles.subText}>(Tap the upload button below)</Text>
        </View>
        <View style={styles.inputBar}>
          <Pressable
            onPress={() => setIsSheetOpen(true)}
            style={({ pressed }) => [
              styles.addButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Paperclip size={24} color="#FFF" />
          </Pressable>

          <View style={styles.DefaultTextInput}>
            <Text style={styles.inputText}>Type a message...</Text>
          </View>
        </View>

        <UploadBottomSheet
          isVisible={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          selectedCount={count}
          selectedIds={selectedIds}
          onTogglePhoto={toggleSelection}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  chatArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  subText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    marginBottom: 20,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  DefaultTextInput: {
    flex: 1,
    height: 44,
    backgroundColor: "#F3F4F6",
    borderRadius: 22,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  inputText: {
    color: "#9CA3AF",
  },
});
