import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../config/colors";
import { common } from "../config/theme";
import PatientAvatar from "../components/patients/PatientAvatar";

type Message = { id: string; text: string; fromDoctor: boolean; time: string; };

const INITIAL_MESSAGES: Message[] = [
  { id: "1", text: "Hello doctor, I wanted to consult you about the spot that appeared on my arm a week ago.", fromDoctor: false, time: "09:30 AM" },
  { id: "2", text: "I took this photo this morning.", fromDoctor: false, time: "09:31 AM" },
  { id: "3", text: "Hello John, Thanks for sharing the photo. Do you feel any itching or pain in this area?", fromDoctor: true, time: "09:35 AM" },
  { id: "4", text: "Yes, there is slight itching, but no real pain.", fromDoctor: false, time: "09:37 AM" },
];

export default function ChatScreen({ navigation, route }: any) {
  const { patient } = route.params;
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, {
      id: Date.now().toString(),
      text: input.trim(),
      fromDoctor: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    setInput("");
  };

  return (
    <SafeAreaView style={common.screen} edges={["top"]}>
      {/* Header */}
      <View style={[common.rowBetween, styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={26} color={colors.black} />
        </TouchableOpacity>
        <View style={[common.row, { gap: 10 }]}>
          <PatientAvatar initials={patient.initials} size={44} />
          <View>
            <Text style={styles.headerName}>{patient.name}</Text>
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
        <View style={{ width: 26 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.messageWrapper, item.fromDoctor ? styles.wrapperRight : styles.wrapperLeft]}>
              <View style={[styles.bubble, item.fromDoctor ? styles.bubbleDoctor : styles.bubblePatient]}>
                <Text style={[styles.bubbleText, item.fromDoctor && { color: colors.white }]}>{item.text}</Text>
              </View>
              <Text style={[common.subtitle, { marginTop: 4 }, item.fromDoctor ? { textAlign: "right" } : { textAlign: "left" }]}>{item.time}</Text>
            </View>
          )}
        />
        <View style={[common.row, styles.inputRow]}>
          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            placeholderTextColor={colors.darkGray}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Ionicons name="send" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  headerName: { fontSize: 16, fontWeight: "700", color: colors.black },
  onlineText: { fontSize: 12, color: "#22C55E", fontWeight: "600" },
  messagesList: { padding: 16, gap: 12 },
  messageWrapper: { maxWidth: "80%" },
  wrapperLeft: { alignSelf: "flex-start" },
  wrapperRight: { alignSelf: "flex-end" },
  bubble: { borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10 },
  bubblePatient: { backgroundColor: "#F3F4F6", borderBottomLeftRadius: 4 },
  bubbleDoctor: { backgroundColor: colors.main, borderBottomRightRadius: 4 },
  bubbleText: { fontSize: 14, color: colors.black, lineHeight: 20 },
  inputRow: { gap: 10, padding: 12, borderTopWidth: 1, borderTopColor: "#F0F0F0" },
  input: { flex: 1, backgroundColor: "#F3F4F6", borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: colors.black, maxHeight: 100 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.main, justifyContent: "center", alignItems: "center" },
});