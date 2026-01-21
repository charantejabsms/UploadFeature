import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { COLORS, METRICS } from "../../constants/theme";

interface SourceCardProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

export const SourceCard = ({ icon, label, onPress }: SourceCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: METRICS.radius.m,
    padding: METRICS.spacing.m,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 102,
  },
  iconWrapper: {
    marginBottom: METRICS.spacing.s,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.secondary,
  },
});
