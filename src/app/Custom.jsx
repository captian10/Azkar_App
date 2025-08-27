import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CounterCard from "./CounterCard";
import { ThemeContext } from "./ThemeContext";

export default function Custom() {
  const { darkMode } = useContext(ThemeContext);
  const [customZikrs, setCustomZikrs] = useState([]);
  const [text, setText] = useState("");
  const [target, setTarget] = useState("");

  // Load zikrs
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem("customZikrs");
        if (saved) setCustomZikrs(JSON.parse(saved));
      } catch (e) {
        console.log("Error loading data", e);
      }
    };
    loadData();
  }, []);

  // Save zikrs
  useEffect(() => {
    AsyncStorage.setItem("customZikrs", JSON.stringify(customZikrs));
  }, [customZikrs]);

  const addZikr = () => {
    if (!text.trim()) {
      Alert.alert("خطأ", "يرجى إدخال نص الذكر");
      return;
    }

    const targetNumber = parseInt(target, 10) || 100; // default 100 if not set

    setCustomZikrs([
      ...customZikrs,
      { id: Date.now(), text, count: 0, target: targetNumber },
    ]);

    setText("");
    setTarget("");
  };

  const increment = (id) => {
    setCustomZikrs((prev) =>
      prev.map((z) =>
        z.id === id && z.count < z.target
          ? { ...z, count: z.count + 1 }
          : z
      )
    );
  };

  const reset = (id) => {
    setCustomZikrs((prev) =>
      prev.map((z) => (z.id === id ? { ...z, count: 0 } : z))
    );
  };

  const remove = (id) => {
    Alert.alert("حذف", "هل تريد حذف هذا الذكر؟", [
      { text: "إلغاء", style: "cancel" },
      {
        text: "حذف",
        onPress: () => setCustomZikrs((prev) => prev.filter((z) => z.id !== id)),
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: darkMode ? "#121212" : "#f9f9f9" },
      ]}
    >
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: 60 }]}>
        <View style={{ marginBottom: 15 }}>
          <TextInput
            placeholder="أدخل نص الذكر هنا..."
            value={text}
            onChangeText={setText}
            placeholderTextColor={darkMode ? "#aaa" : "#888"}
            multiline
            style={[
              styles.textArea,
              {
                borderColor: darkMode ? "#ffd700" : "#d4af37",
                color: darkMode ? "#fff" : "#000",
              },
            ]}
          />
          <TextInput
            placeholder="عدد التكرار المطلوب"
            value={target}
            onChangeText={setTarget}
            keyboardType="numeric"
            placeholderTextColor={darkMode ? "#aaa" : "#888"}
            style={[
              styles.input,
              {
                borderColor: darkMode ? "#ffd700" : "#d4af37",
                color: darkMode ? "#fff" : "#000",
              },
            ]}
          />
          <TouchableOpacity
            onPress={addZikr}
            style={[
              styles.addButton,
              { backgroundColor: darkMode ? "#ffd700" : "#d4af37" },
            ]}
          >
            <Text style={[styles.addButtonText, { color: darkMode ? "#000" : "#121212" }]}>
              إضافة الذكر
            </Text>
          </TouchableOpacity>
        </View>

        {customZikrs.map((z) => (
          <CounterCard
            key={z.id}
            text={`${z.text}`}
            count={z.count}
            target={z.target}
            onIncrement={() => increment(z.id)}
            onReset={() => reset(z.id)}
            onDelete={() => remove(z.id)}
            darkMode={darkMode}
            buttonLabel="تسبيح"
            maxCount={z.target}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 10, marginBottom: 10 },
  textArea: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    height: 100,
  },
  addButton: { padding: 15, borderRadius: 50, alignItems: "center" },
  addButtonText: { fontWeight: "700" },
});
