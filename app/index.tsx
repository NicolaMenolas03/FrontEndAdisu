import { Image, Text, View } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/Colors";

export default function Index() {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
     
      {/* Immagine */}
      <Image
        source={require("@/assets/images/LogoAdisu.jpg")}
        style={{
          flex: 1,
          resizeMode: "contain", // Facoltativo, a seconda di come vuoi visualizzare l'immagine
          alignSelf: "center",
        }}
      />
          {/* Cerchio in alto a sinistra */}

      <View 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#007FFF",
          width: "14rem",
          height: "14rem",
          borderBottomRightRadius: "14rem", // metà del width/height per fare un cerchio
        }}
      ></View>

      {/* Cerchio in basso a destra */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          backgroundColor: "#007FFF",
          width: "14rem",
          height: "14rem",
          borderTopLeftRadius: "14rem", // metà del width/height per fare un cerchio
        }}
      ></View>
    </View>
  );
}