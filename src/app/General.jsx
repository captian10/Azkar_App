import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, View, ImageBackground, SafeAreaView, Text } from "react-native";
import CounterCard from "./CounterCard";
import { ThemeContext } from "./ThemeContext";

const generalAzkar = [
  { text: "اللَّهُــمَّ صَلِّ وَسَـــلِّمْ وَبَارِكْ على نَبِيِّنَـــا مُحمَّد ﷺ", maxCount: 100 },
  { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ", maxCount: 100 },
  { text: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، وَأَتُوبُ إِلَيْهِ", maxCount: 100 },
  { text: "لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلُّ شَيْءِ قَدِيرِ", maxCount: 100 },
  { text: "الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ", maxCount: 100 },
  { text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ", maxCount: 100 },
];

export default function General() {
  const { darkMode } = useContext(ThemeContext);
  const [counts, setCounts] = useState(Array(generalAzkar.length).fill(0));

  const increment = (index) => {
    const item = generalAzkar[index];
    const max = item.maxCount ?? 100;
    if (counts[index] >= max) return;
    const newCounts = [...counts];
    newCounts[index]++;
    setCounts(newCounts);
  };

  const reset = (index) => {
    const newCounts = [...counts];
    newCounts[index] = 0;
    setCounts(newCounts);
  };

  const getDisplayCount = (index) => {
    const max = generalAzkar[index].maxCount;
    return max ? `${counts[index]} / ${max}` : counts[index];
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: darkMode ? "#121212" : "#f9f9f9" }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={require("../../assets/general.png")}
          style={styles.headerImage}
          resizeMode="cover"
        />

        {generalAzkar.map((item, index) => (
          <View key={index} style={styles.cardWrapper}>
            <CounterCard
              text={item.text}
              count={counts[index]}
              onIncrement={() => increment(index)}
              onReset={() => reset(index)}
              darkMode={darkMode}
              buttonLabel="تســبـيـح"
              maxCount={item.maxCount}
              target={item.maxCount} // pass target for CounterCard
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { paddingTop: 0 },
  headerImage: { width: "100%", height: 200, marginBottom: 16 },
  cardWrapper: { marginBottom: 15, paddingHorizontal: 16 },
});
