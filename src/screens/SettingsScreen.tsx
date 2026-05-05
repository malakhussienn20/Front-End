import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { common } from "../config/theme";
import BottomTabBar from "../components/layout/BottomTabBar";

type SettingRow = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  type: "navigate" | "toggle" | "danger";
  value?: boolean;
  onPress?: () => void;
  onToggle?: (val: boolean) => void;
};

type Props = {
  navigation: any;
};

export default function SettingsScreen({ navigation }: Props) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // Clear token and navigate to Auth
          navigation.replace("Auth");
        },
      },
    ]);
  };

  const sections: { title: string; rows: SettingRow[] }[] = [
    {
      title: "Account",
      rows: [
        {
          icon: "person-circle-outline",
          label: "My Profile",
          type: "navigate",
          onPress: () => navigation.navigate("Profile"),
        },
        {
          icon: "lock-closed-outline",
          label: "Change Password",
          type: "navigate",
          onPress: () => Alert.alert("Coming Soon", "This feature is coming soon."),
        },
      ],
    },
    {
      title: "Preferences",
      rows: [
        {
          icon: "notifications-outline",
          label: "Push Notifications",
          type: "toggle",
          value: notifications,
          onToggle: setNotifications,
        },
        {
          icon: "mail-outline",
          label: "Email Alerts",
          type: "toggle",
          value: emailAlerts,
          onToggle: setEmailAlerts,
        },
        {
          icon: "moon-outline",
          label: "Dark Mode",
          type: "toggle",
          value: darkMode,
          onToggle: setDarkMode,
        },
      ],
    },
    {
      title: "Support",
      rows: [
        {
          icon: "help-circle-outline",
          label: "Help & FAQ",
          type: "navigate",
          onPress: () => Alert.alert("Coming Soon", "This feature is coming soon."),
        },
        {
          icon: "document-text-outline",
          label: "Terms & Privacy Policy",
          type: "navigate",
          onPress: () => Alert.alert("Coming Soon", "This feature is coming soon."),
        },
        {
          icon: "information-circle-outline",
          label: "App Version 1.0.0",
          type: "navigate",
          onPress: () => {},
        },
      ],
    },
    {
      title: "",
      rows: [
        {
          icon: "log-out-outline",
          label: "Logout",
          type: "danger",
          onPress: handleLogout,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={[common.rowBetween, styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={26} color={colors.black} />
        </TouchableOpacity>
        <Text style={common.title}>Settings</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {sections.map((section, sIdx) => (
          <View key={sIdx} style={styles.section}>
            {section.title ? (
              <Text style={styles.sectionTitle}>{section.title}</Text>
            ) : null}
            <View style={styles.card}>
              {section.rows.map((row, rIdx) => (
                <TouchableOpacity
                  key={rIdx}
                  style={[
                    styles.row,
                    rIdx < section.rows.length - 1 && styles.rowBorder,
                  ]}
                  onPress={row.type !== "toggle" ? row.onPress : undefined}
                  activeOpacity={row.type === "toggle" ? 1 : 0.7}
                >
                  <View style={styles.rowLeft}>
                    <View
                      style={[
                        styles.iconWrap,
                        row.type === "danger" && styles.iconWrapDanger,
                      ]}
                    >
                      <Ionicons
                        name={row.icon}
                        size={20}
                        color={row.type === "danger" ? "#EF4444" : colors.main}
                      />
                    </View>
                    <Text
                      style={[
                        styles.rowLabel,
                        row.type === "danger" && styles.rowLabelDanger,
                      ]}
                    >
                      {row.label}
                    </Text>
                  </View>
                  {row.type === "toggle" ? (
                    <Switch
                      value={row.value}
                      onValueChange={row.onToggle}
                      trackColor={{ false: "#D1D5DB", true: colors.main }}
                      thumbColor={colors.white}
                    />
                  ) : row.type === "navigate" ? (
                    <Ionicons name="chevron-forward" size={18} color={colors.darkGray} />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>

      <BottomTabBar activeTab="Settings" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  content: { padding: 16 },
  section: { marginBottom: 8 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.darkGray,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapDanger: { backgroundColor: "#FEE2E2" },
  rowLabel: { fontSize: 15, color: colors.black, fontWeight: "500" },
  rowLabelDanger: { color: "#EF4444" },
});