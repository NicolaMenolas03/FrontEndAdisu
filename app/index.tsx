import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: "#FFFFFF",
      }}>
      <Image
        source={require("@/assets/images/LogoAdisu.jpg")}
        style={LogoAdisu.headerImage}
      />
      {/* Cerchio in alto a sinistra */}
      <View style={Circle.Top}></View>
      {/* Cerchio in basso a destra */}
      <View style={Circle.Bottom}></View>
    </View>
  );
}

const LogoAdisu = StyleSheet.create({
  headerImage: {
    alignSelf: 'center',
    flex: 1,
    resizeMode: "contain",
    width: width * 0.5, // 50% of screen width
    height: height * 0.2, // 20% of screen height
  },
});

const Circle = StyleSheet.create({
  Top: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#007FFF",
    width: width * 0.50, // 40% of screen width
    height: height * 0.25, // 40% of screen width to make it a circle
    borderBottomRightRadius: 1000 // half of the width to make a circle
  },
  Bottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007FFF",
    width: width * 0.50, // 40% of screen width
    height: height * 0.25, // 40% of screen width to make it a circle
    borderTopLeftRadius: 1000, // half of the width to make a circle
  },
});


