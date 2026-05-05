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

const DISEASES = [
  "Skin Cancer",
  "Actinic Keratosis",
  "Monkeypox",
  "Chickenpox",
  "Eczema",
  "Vitiligo",
  "Nail Fungus",
  "Acne & Rosacea",
  "Normal",
];

type Props = {
  navigation: any;
  route: any;
};

export default function FinalDiagnosisScreen({ navigation, route }: Props) {
  const { patient } = route.params ?? {};

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<string>(
    patient?.condition ?? "Eczema"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredDiseases = DISEASES.filter((d) =>
    d.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const quickTags = ["Eczema", "Psoriasis", "Melanoma", "Acne & Rosacea"];

  const handleSubmit = () => {
    if (isCorrect === null) {
      Alert.alert("Required", "Please confirm if the model prediction is correct or not.");
      return;
    }
    Alert.alert(
      "Submitted",
      `Diagnosis for ${patient?.name ?? "patient"} submitted successfully.`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={[common.rowBetween, styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={26} color={colors.black} />
        </TouchableOpacity>
        <Text style={common.title}>Final Diagnosis</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Model Prediction Accuracy */}
        <Text style={styles.sectionTitle}>Model Prediction Accuracy</Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleBtn, isCorrect === true && styles.toggleBtnActive]}
            onPress={() => setIsCorrect(true)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isCorrect === true ? "checkmark-circle" : "checkmark-circle-outline"}
              size={20}
              color={isCorrect === true ? colors.white : colors.darkGray}
            />
            <Text style={[styles.toggleText, isCorrect === true && styles.toggleTextActive]}>
              Correct
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, isCorrect === false && styles.toggleBtnInactive]}
            onPress={() => setIsCorrect(false)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isCorrect === false ? "close-circle" : "close-circle-outline"}
              size={20}
              color={isCorrect === false ? colors.white : colors.darkGray}
            />
            <Text style={[styles.toggleText, isCorrect === false && styles.toggleTextInactive]}>
              Incorrect
            </Text>
          </TouchableOpacity>
        </View>

        {/* Final Diagnosis */}
        <Text style={styles.sectionTitle}>Final Diagnosis</Text>

        {/* Search / Dropdown */}
        <TouchableOpacity
          style={styles.searchBox}
          onPress={() => setShowDropdown(!showDropdown)}
          activeOpacity={0.8}
        >
          <Ionicons name="search-outline" size={18} color={colors.darkGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search or select disease"
            placeholderTextColor={colors.darkGray}
            value={searchQuery}
            onChangeText={(t) => {
              setSearchQuery(t);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
          />
          <Ionicons
            name={showDropdown ? "chevron-up" : "chevron-down"}
            size={18}
            color={colors.darkGray}
          />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdown}>
            {filteredDiseases.map((disease) => (
              <TouchableOpacity
                key={disease}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedDisease(disease);
                  setSearchQuery(disease);
                  setShowDropdown(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    selectedDisease === disease && styles.dropdownTextActive,
                  ]}
                >
                  {disease}
                </Text>
                {selectedDisease === disease && (
                  <Ionicons name="checkmark" size={16} color={colors.main} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Quick Tags */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tagsScroll}
          contentContainerStyle={styles.tagsContent}
        >
          {quickTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[styles.tag, selectedDisease === tag && styles.tagActive]}
              onPress={() => {
                setSelectedDisease(tag);
                setSearchQuery(tag);
                setShowDropdown(false);
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.tagText, selectedDisease === tag && styles.tagTextActive]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Doctor's Notes */}
        <Text style={styles.sectionTitle}>Doctor's Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Write your notes here... (these will be sent to the patient)"
          placeholderTextColor={colors.darkGray}
          multiline
          textAlignVertical="top"
          value={notes}
          onChangeText={setNotes}
        />
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { paddingHorizontal: 16, paddingVertical: 12 },
  content: { paddingHorizontal: 16, paddingBottom: 24 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.black,
    marginTop: 24,
    marginBottom: 14,
  },

  // Toggle
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F2F4F8",
    borderRadius: 50,
    padding: 4,
    gap: 4,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
  toggleBtnActive: {
    backgroundColor: colors.main,
  },
  toggleBtnInactive: {
    backgroundColor: "#6B7280",
  },
  toggleText: { fontSize: 15, fontWeight: "600", color: colors.darkGray },
  toggleTextActive: { color: colors.white },
  toggleTextInactive: { color: colors.white },

  // Search
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F8",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.black },

  // Dropdown
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  dropdownText: { fontSize: 14, color: colors.black },
  dropdownTextActive: { color: colors.main, fontWeight: "600" },

  // Tags
  tagsScroll: { marginTop: 12 },
  tagsContent: { gap: 8, paddingRight: 8 },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: "#F2F4F8",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tagActive: { backgroundColor: colors.main, borderColor: colors.main },
  tagText: { fontSize: 13, color: colors.darkGray, fontWeight: "500" },
  tagTextActive: { color: colors.white, fontWeight: "600" },

  // Notes
  notesInput: {
    backgroundColor: "#F2F4F8",
    borderRadius: 14,
    padding: 14,
    fontSize: 14,
    color: colors.black,
    minHeight: 160,
    lineHeight: 22,
  },

  // Footer
  footer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  submitBtn: {
    backgroundColor: colors.main,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
  },
  submitText: { fontSize: 16, fontWeight: "700", color: colors.white },
});