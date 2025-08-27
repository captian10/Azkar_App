import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Switch,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemeContext } from "../app/ThemeContext";

export default function Index() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const router = useRouter();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#121212" : "#e6e7d2ff" },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      </View>

      {/* Dark Mode Switch */}
      <View style={styles.switchRow}>
        <Text style={{ color: darkMode ? "#ffd700" : "#121212", marginRight: 8 }}>
          🌙 Dark Mode
        </Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          thumbColor={darkMode ? "#f4d03f" : "#f4f4f4"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={() => router.push("/Morning")}>
          <Image source={require("../../assets/morning.png")} style={styles.buttonImage} resizeMode="cover" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageButton} onPress={() => router.push("/Evening")}>
          <Image source={require("../../assets/evening.png")} style={styles.buttonImage} resizeMode="cover" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageButton} onPress={() => router.push("/General")}>
          <Image source={require("../../assets/general.png")} style={styles.buttonImage} resizeMode="cover" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageButton} onPress={() => router.push("/Custom")}>
          <Image source={require("../../assets/custom.png")} style={styles.buttonImage} resizeMode="cover" />
        </TouchableOpacity>
      </View>

      {/* Footer About Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.aboutButton} onPress={() => router.push("/About")}>
          <Text style={styles.aboutText}> اضغط هنا لمعرفة فضل الأذكار</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    marginTop: 30,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  headerImage: { width: "100%", height: 140, borderRadius: 15 },
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonContainer: { flexGrow: 1, justifyContent: "flex-start", marginTop: 0 },
  imageButton: {
    width: "100%",
    height: "18.5%",
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: { width: "100%", height: "100%" },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 15,
    alignItems: "flex-start",
  },
  aboutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#dfcdaf",
    borderRadius: 20,
  },
  aboutText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
});
