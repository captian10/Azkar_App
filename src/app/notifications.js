import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for notifications!");
      return;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }
}

export async function scheduleDailyNotifications() {
  // Check if notifications are already scheduled
  const scheduled = await AsyncStorage.getItem("notificationsScheduled");
  if (scheduled === "true") {
    console.log("✅ Notifications already scheduled");
    return;
  }

  // Clear old scheduled notifications (only once)
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Messages for fixed times
  const messages = [
    {
      time: { hour: 7, minute: 0 },
      body: "وَالذَّاكِرِينَ اللَّهَ كَثِيرًا وَالذَّاكِرَاتِ أَعَدَّ اللَّهُ لَهُمْ مَغْفِرَةً وَأَجْرًا عَظِيمًا",
    },
    {
      time: { hour: 15, minute: 0 },
      body: "يا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا وَسَبِّحُوهُ بُكْرَةً وَأَصِيلًا",
    },
    {
      time: { hour: 21, minute: 0 },
      body: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    },
    {
      time: { hour: 4, minute: 0 },
      body: "الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ",
    },
  ];

  // Schedule each notification
  for (let i = 0; i < messages.length; i++) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "ذَكِّرْ",
        body: messages[i].body,
      },
      trigger: {
        hour: messages[i].time.hour,
        minute: messages[i].time.minute,
        repeats: true, // repeat every day
      },
    });
  }

  // Save flag so we don’t schedule again
  await AsyncStorage.setItem("notificationsScheduled", "true");
  console.log("✅ Notifications scheduled successfully");
}
