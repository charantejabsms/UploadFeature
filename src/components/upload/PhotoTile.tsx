import React, { memo } from "react";
import { View, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import { Check } from "lucide-react-native";
import { COLORS, METRICS } from "../../constants/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;

const TILE_SIZE =
  (SCREEN_WIDTH -
    METRICS.modalMargin * 2 -
    METRICS.spacing.l * 2 -
    METRICS.spacing.s * 3) /
  4;

interface PhotoTileProps {
  id: string;
  uri: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const PhotoTile = memo(
  ({ id, uri, isSelected, onToggle }: PhotoTileProps) => {
    return (
      <Pressable
        onPress={() => onToggle(id)}
        style={({ pressed }) => [
          styles.container,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Image source={{ uri }} style={styles.image} />

        {isSelected && <View style={styles.selectedBorder} />}

        <View
          style={[
            styles.checkboxBase,
            isSelected ? styles.checkboxSelected : styles.checkboxUnselected,
          ]}
        >
          {isSelected && <Check color="white" size={12} strokeWidth={3} />}
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: METRICS.radius.s,
    overflow: "hidden",
    marginBottom: METRICS.spacing.s,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  selectedBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: METRICS.radius.s,
  },

  checkboxBase: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  checkboxSelected: {
    backgroundColor: COLORS.primary,
  },
  checkboxUnselected: {
    backgroundColor: "rgb(255, 255, 255)",
  },
});
