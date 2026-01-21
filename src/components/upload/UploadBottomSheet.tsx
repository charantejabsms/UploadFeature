import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, Image as ImageIcon, FileText, X } from "lucide-react-native";
import { SourceCard } from "./SourceCard";
import { PhotoTile } from "./PhotoTile";
import { COLORS, METRICS } from "../../constants/theme";

const RECENT_PHOTOS = [
  {
    id: "photo_1",
    uri: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&q=80",
  }, // Dark Night
  {
    id: "photo_2",
    uri: "https://images.unsplash.com/photo-1431440869543-efaf3388c585?w=400&q=80",
  }, // Deep Space
  {
    id: "photo_3",
    uri: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80",
  }, // Dark Fluid
  {
    id: "photo_4",
    uri: "https://images.unsplash.com/photo-1431440869543-efaf3388c585?w=400&q=80",
  }, // Deep Space
];

const UPLOAD_OPTIONS = [
  {
    id: "camera",
    label: "Camera",
    Icon: Camera, 
    action: () => console.log("Camera"),
  },
  {
    id: "gallery",
    label: "Gallery",
    Icon: ImageIcon,
    action: () => console.log("Gallery"),
  },
  {
    id: "file",
    label: "File",
    Icon: FileText,
    action: () => console.log("File"),
  },
];

interface UploadBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  selectedCount: number;
  selectedIds: Set<string>;
  onTogglePhoto: (id: string) => void;
}

export const UploadBottomSheet = ({
  isVisible,
  onClose,
  selectedCount,
  selectedIds,
  onTogglePhoto,
}: UploadBottomSheetProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >

      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      
      <View style={styles.sheetContainer}>
        <View style={styles.dragHandleContainer}>
          <View style={styles.dragHandle} />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Upload</Text>

          
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <X size={20} color={COLORS.text.secondary} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.sourceGrid}>
            {UPLOAD_OPTIONS.map((option) => (
              <SourceCard
                key={option.id} 
                label={option.label}
                onPress={option.action}
                icon={<option.Icon size={24} color="#6B7280" />}
              />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Recent photos</Text>
          <View style={styles.photoGrid}>
            {RECENT_PHOTOS.map((photo) => (
              <PhotoTile
                key={photo.id}
                id={photo.id}
                uri={photo.uri}
                isSelected={selectedIds.has(photo.id)}
                onToggle={onTogglePhoto}
              />
            ))}
          </View>
        </ScrollView>

        {selectedCount > 0 && (
          <SafeAreaView style={styles.footer}>
            <Pressable
              style={({ pressed }) => [
                styles.attachButton,
                { opacity: pressed ? 0.9 : 1 },
              ]}
            >
              <Text style={styles.attachButtonText}>
                Attach items ({selectedCount})
              </Text>
            </Pressable>
          </SafeAreaView>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.overlay,
  },
  sheetContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginLeft: METRICS.modalMargin,
    marginRight: METRICS.modalMargin,
    bottom: 10,
    position: "absolute",
    height: "50%",
    borderRadius: 24,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dragHandleContainer: {
    alignItems: "center",
    paddingTop: METRICS.spacing.s,
    paddingBottom: METRICS.spacing.s,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: METRICS.spacing.l,
    paddingBottom: METRICS.spacing.m,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  closeButton: {
    padding: 4,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  scrollContent: {
    paddingHorizontal: METRICS.spacing.l,
    paddingBottom: 100,
  },
  sourceGrid: {
    flexDirection: "row",
    gap: METRICS.spacing.m,
    marginBottom: METRICS.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.secondary,
    marginBottom: METRICS.spacing.m,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: METRICS.spacing.s,
  },
  footer: {
    position: "absolute",
    bottom: METRICS.spacing.l,
    right: METRICS.spacing.l,
    left: undefined,
    backgroundColor: "transparent",
    borderTopWidth: 0,
  },
  attachButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  attachButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
