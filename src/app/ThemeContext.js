// app/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Create the context with default values
export const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
});

// 2. Create the provider component
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme when app starts
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("darkMode");
        if (savedTheme !== null) {
          setDarkMode(JSON.parse(savedTheme));
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };

    loadTheme();
  }, []);

  // Save theme whenever it changes
  const toggleDarkMode = async () => {
    try {
      const newValue = !darkMode;
      setDarkMode(newValue);
      await AsyncStorage.setItem("darkMode", JSON.stringify(newValue));
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
