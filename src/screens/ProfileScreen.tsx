import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { common } from "../config/theme";

type Props = {
  navigation: any;
};

export default function ProfileScreen({ navigation }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Dr. Ahmed Hassan");
  const [email, setEmail] = useState("ahmed.hassan@dermclinic.com");
  const [phone, setPhone] = useState("+20 100 123 4567");
  const [specialty, setSpecialty] = useState("Dermatology");
  const [clinic, setClinic] = useState("Cairo Skin & Laser Center");
  const [bio, setBio] = useState("Board-certified dermatologist with 10+ years of experience in skin disease diagnosis and treatment.");

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSave = () => {
    setEditing(false);
    Alert.alert("Saved", "Your profile has been updated successfully.");
  };

  const fields: { label: string; value: string; setter: (v: string) => void; icon: keyof typeof Ionicons.glyphMap; multiline?: boolean }[] = [
    { label: "Full Name", value: name, setter: setName, icon: "person-outline" },
    { label: "Email", value: email, setter: setEmail, icon: "mail-outline" },
    { label: "Phone", value: phone, setter: setPhone, icon: "call-outline" },
    { label: "Specialty", value: specialty, setter: setSpecialty, icon: "medical-outline" },
    { label: "Clinic / Hospital", value: clinic, setter: setClinic, icon: "business-outline" },
    { label: "Bio", value: bio, setter: setBio, icon: "document-text-outline", multiline: true },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={[common.rowBetween, styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={26} color={colors.black} />
        </TouchableOpacity>
        <Text style={common.title}>My Profile</Text>
        <TouchableOpacity
          onPress={editing ? handleSave : () => setEditing(true)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.editBtn}>{editing ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          {editing && (
            <TouchableOpacity style={styles.changePhotoBtn} activeOpacity={0.7}>
              <Ionicons name="camera-outline" size={16} color={colors.main} />
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          )}
          {!editing && (
            <>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileSpecialty}>{specialty}</Text>
              <View style={styles.clinicBadge}>
                <Ionicons name="business-outline" size={13} color={colors.main} />
                <Text style={styles.clinicText}>{clinic}</Text>
              </View>
            </>
          )}
        </View>

        {/* Stats Row */}
        {!editing && (
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>128</Text>
              <Text style={styles.statLabel}>Patients</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>94%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>10+</Text>
              <Text style={styles.statLabel}>Years Exp.</Text>
            </View>
          </View>
        )}

        {/* Fields */}
        <View style={styles.fieldsCard}>
          {fields.map((field, idx) => (
            <View
              key={idx}
              style={[
                styles.fieldRow,
                idx < fields.length - 1 && styles.fieldBorder,
              ]}
            >
              <View style={styles.fieldIcon}>
                <Ionicons name={field.icon} size={18} color={colors.main} />
              </View>
              <View style={styles.fieldContent}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                {editing ? (
                  <TextInput
                    style={[styles.fieldInput, field.multiline && styles.fieldInputMulti]}
                    value={field.value}
                    onChangeText={field.setter}
                    multiline={field.multiline}
                    textAlignVertical={field.multiline ? "top" : "auto"}
                  />
                ) : (
                  <Text style={styles.fieldValue}>{field.value}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {editing && (
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
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
  editBtn: { fontSize: 15, fontWeight: "600", color: colors.main },

  content: { padding: 16 },

  avatarSection: { alignItems: "center", paddingVertical: 24 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.main,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: colors.main,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  avatarText: { fontSize: 30, fontWeight: "700", color: colors.white },
  changePhotoBtn: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  changePhotoText: { fontSize: 14, color: colors.main, fontWeight: "500" },

  profileName: { fontSize: 20, fontWeight: "700", color: colors.black, marginBottom: 4 },
  profileSpecialty: { fontSize: 14, color: colors.darkGray, marginBottom: 8 },
  clinicBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 50,
  },
  clinicText: { fontSize: 13, color: colors.main, fontWeight: "500" },

  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 22, fontWeight: "700", color: colors.main },
  statLabel: { fontSize: 12, color: colors.darkGray, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: "#E5E7EB" },

  fieldsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  fieldRow: { flexDirection: "row", alignItems: "flex-start", padding: 14, gap: 12 },
  fieldBorder: { borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  fieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  fieldContent: { flex: 1 },
  fieldLabel: { fontSize: 11, color: colors.darkGray, fontWeight: "500", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5 },
  fieldValue: { fontSize: 14, color: colors.black, lineHeight: 20 },
  fieldInput: {
    fontSize: 14,
    color: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.main,
    paddingBottom: 4,
    paddingTop: 0,
  },
  fieldInputMulti: { minHeight: 70, lineHeight: 20 },

  saveBtn: {
    backgroundColor: colors.main,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveBtnText: { fontSize: 16, fontWeight: "700", color: colors.white },
});