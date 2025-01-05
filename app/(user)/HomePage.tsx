import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
const { width, height } = Dimensions.get('window');
import { useRouter } from "expo-router";

export default function App() {
  const topCircleAnim = useRef(new Animated.Value(0)).current;
  const bottomCircleAnim = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const router = useRouter();
 
  const handlePress = () => {
    // Animazione di uscita
    Animated.parallel([
      Animated.timing(topCircleAnim, {
        toValue: -1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(bottomCircleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Naviga alla schermata di login quando l'animazione finisce
      router.push("/login");
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.TouchableOpacity}>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Animated.Image
          source={require("@/assets/images/LogoAdisu.png")}
          style={[styles.headerImage, { opacity: logoOpacity }]}
        />
        {/* Cerchio in alto a sinistra */}
        <Animated.View
          style={[
            Circle.Top,
            {
              transform: [
                {
                  translateX: topCircleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width],
                  }),
                },
                {
                  translateY: topCircleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, height],
                  }),
                },
              ],
            },
          ]}
        />
        {/* Cerchio in basso a destra */}
        <Animated.View
          style={[
            Circle.Bottom,
            {
              transform: [
                {
                  translateX: bottomCircleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width],
                  }),
                },
                {
                  translateY: bottomCircleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, height],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  TouchableOpacity: {
    width: width,
    height: height,
  },
  headerImage: {
    alignSelf: "center",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 260,
    resizeMode: "contain",
    width: 300, // 50% of screen width
    height: 300, // 20% of screen height
  },
});

const Circle = StyleSheet.create({
  Top: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#007FFF",
    width: width * 0.50, // 50% of screen width
    height: height * 0.25, // 25% of screen height
    borderBottomRightRadius: 1000, // half of the width to make a circle
  },
  Bottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007FFF",
    width: width * 0.50, // 50% of screen width
    height: height * 0.25, // 25% of screen height
    borderTopLeftRadius: 1000, // half of the width to make a circle
  },
});