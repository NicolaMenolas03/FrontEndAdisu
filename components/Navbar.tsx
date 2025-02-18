import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

interface NavbarProps {
  namePage: string;
}

const Navbar = ({ namePage }: NavbarProps) => {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push("../(tabs)/LandingPage")}
      >
        <Icon name="home" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push("../(tabs)/LandingPage")}
      >
        <Icon name="newspaper" size={30} color="#6fa3ff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push("../(tabs)/LandingPage")}
      >
        <Icon name="help-circle" size={30} color="#6fa3ff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push("../(user)/InitialRedirect")}
      >
        <Icon name="logout" size={30} color="#6fa3ff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    paddingVertical: 10,
    backgroundColor: "#005dff",
    position: "absolute",
    bottom: 0,
    borderRadius: 40,
  },
  navButton: {
    backgroundColor: "",
    borderRadius: 50,
    alignItems: "center",
    padding: 10,
  },
  navText: {
    color: "white",
    marginTop: 5,
  },
});

export default Navbar;
