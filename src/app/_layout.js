import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "./ThemeContext";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  scheduleDailyNotifications,
} from "../../src/app/notifications"; // ✅ your renamed file

// Prevent splash from auto-hiding immediately
SplashScreen.preventAutoHideAsync();

// Configure how notifications behave when received
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Layout() {
  useEffect(() => {
    let isMounted = true;

    const prepare = async () => {
      try {
        // ✅ Cancel old notifications first (prevents duplicates)
        await Notifications.cancelAllScheduledNotificationsAsync();

        // Register for push permissions
        await registerForPushNotificationsAsync();

        // ✅ Schedule fresh daily notifications (only once)
        await scheduleDailyNotifications();

        console.log("✅ Notifications scheduled successfully");
      } catch (error) {
        console.warn("⚠️ Notification setup failed:", error);
      } finally {
        if (isMounted) {
          // Wait for 2 seconds before hiding splash
          await new Promise((resolve) => setTimeout(resolve, 2000));
          await SplashScreen.hideAsync();
        }
      }
    };

    prepare();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ThemeProvider>
      {/* All screens now have access to ThemeContext */}
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
