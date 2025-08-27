import React, { useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Easing,
} from "react-native";

export default function CounterCard({
  text,
  count,
  onIncrement,
  onReset,
  onRemove,    // optional
  onDelete,    // optional (keeps compatibility with your other files)
  darkMode,
  buttonLabel = "تســبـيـح",
  maxCount,    // optional numeric limit
}) {
  const scaleAnimInc = useRef(new Animated.Value(1)).current;
  const scaleAnimReset = useRef(new Animated.Value(1)).current;

  const animatePress = (anim, callback) => {
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.92,
        duration: 120,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 120,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => callback && callback());
  };

  // ---------- Robust parsing for count / target ----------
  // numericCount: if `count` is number use it, if string like "3 / 100" extract left number.
  const parseCountNumber = (c) => {
    if (typeof c === "number") return c;
    if (typeof c === "string") {
      const m = c.match(/^\s*(\d+)\s*(?:\/\s*\d+)?/);
      if (m) return parseInt(m[1], 10);
    }
    return 0;
  };

  // parsedTarget: prefer maxCount prop; otherwise try to parse right side of "x / y" from `count` string
  const parseTargetNumber = (c, mCount) => {
    if (typeof mCount === "number" && Number.isFinite(mCount)) return mCount;
    if (typeof c === "string") {
      const parts = c.split("/");
      if (parts.length > 1) {
        const right = parts[1].match(/\d+/);
        if (right) return parseInt(right[0], 10);
      }
    }
    return undefined;
  };

  const numericCount = parseCountNumber(count);
  const parsedTarget = parseTargetNumber(count, maxCount);
  const hasLimit = typeof parsedTarget === "number" && Number.isFinite(parsedTarget);
  const isDisabled = hasLimit && numericCount >= parsedTarget;

  // displayCount: if there is a target show "x / y", otherwise show raw count (string or number)
  const displayCount = hasLimit ? `${numericCount} / ${parsedTarget}` : (typeof count === "string" ? count : `${numericCount}`);

  // Remove handler (accept both prop names)
  const removeHandler = onRemove ?? onDelete ?? null;

  return (
    <View
      style={[
        styles.azkarCard,
        {
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
          borderColor: darkMode ? "rgba(255,215,0,0.12)" : "rgba(212,175,55,0.18)",
          shadowColor: darkMode ? "#000" : "#aaa",
        },
      ]}
    >
      {/* small top-right remove button (shows only when handler provided) */}
      {removeHandler && (
        <TouchableOpacity
          onPress={removeHandler}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[
            styles.removeBtn,
            {
              backgroundColor: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              borderColor: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            },
          ]}
        >
          <Text style={[styles.removeText, { color: darkMode ? "#fff" : "#333" }]}>✕</Text>
        </TouchableOpacity>
      )}

      {/* Azkar Text */}
      <Text style={[styles.azkarText, { color: darkMode ? "#f5f5f5" : "#060708" }]}>
        {text}
      </Text>

      <View style={styles.counterSection}>
        {/* Count / Target */}
        <Text
          style={[
            styles.countDisplay,
            {
              color: darkMode ? "#ffd700" : "#d4af37",
              borderColor: darkMode ? "#ffd700" : "#d4af37",
              backgroundColor: darkMode ? "rgba(255,215,0,0.12)" : "rgba(212,175,55,0.08)",
            },
          ]}
        >
          {displayCount}
        </Text>

        {/* Buttons */}
        <View style={styles.counterButtons}>
          {/* Increment */}
          <TouchableWithoutFeedback
            disabled={isDisabled}
            onPress={() => {
              if (!isDisabled) animatePress(scaleAnimInc, onIncrement);
            }}
          >
            <Animated.View
              style={[
                styles.btn,
                {
                  backgroundColor: isDisabled ? "#bdc3c7" : (darkMode ? "#2ecc71" : "#27ae60"),
                  transform: [{ scale: scaleAnimInc }],
                },
              ]}
            >
              <Text style={[styles.btnText, { color: isDisabled ? "#7f8c8d" : "#fff" }]}>
                {buttonLabel}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>

          {/* Reset */}
          <TouchableWithoutFeedback onPress={() => animatePress(scaleAnimReset, onReset)}>
            <Animated.View
              style={[
                styles.btn,
                {
                  backgroundColor: darkMode ? "#e67e22" : "#d35400",
                  transform: [{ scale: scaleAnimReset }],
                },
              ]}
            >
              <Text style={[styles.btnText, { color: "#fff" }]}>إعادة</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  azkarCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    position: "relative",
  },
  removeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  removeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  azkarText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 26,
    fontWeight: "500",
    paddingHorizontal: 10,
  },
  counterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countDisplay: {
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 999,
    minWidth: 80,
    textAlign: "center",
  },
  counterButtons: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  btnText: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
