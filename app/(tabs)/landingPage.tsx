import HomeButton from "@/components/homeButton";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Navbar from "@/components/Navbar";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const newsData = [
  {
    id: "1",
    title: "Procedura di selezione interna per le progressioni ...",
    content: "Si comunica che la Commissione di valutazione ...",
    imageUrl: require("@/assets/images/news1.jpg"),
    date: "2023-10-01",
  },
  {
    id: "2",
    title: "News 2",
    content: "Content of News 2",
    imageUrl: require("@/assets/images/news2.jpg"),
    date: "2023-10-02",
  },
  {
    id: "3",
    title: "News 3",
    content: "Content of News 3",
    imageUrl: require("@/assets/images/news3.jpg"),
    date: "2023-10-03",
  },
  // Aggiungi altre news qui
];

export default function landingPage() {
  const currentYear = new Date().getFullYear(); // Get the current year
  const [startYear, setStartYear] = useState(currentYear); // Stato per l'anno corrente
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const incrementYear = () => {
    setStartYear(startYear + 1);
  };

  const decrementYear = () => {
    setStartYear(startYear - 1);
  };

  const nextSlide = () => {
    if (currentIndex < newsData.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToOffset({
        offset: prevIndex * width,
        animated: true,
      });
      setCurrentIndex(prevIndex);
    }
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  return (
    <View style={styles.container}>
      {/* header */}
    

      {/* Scroll dell'anno */}
      <View style={styles.ScrollAnno}>
        <TouchableOpacity onPress={decrementYear} style={styles.arrowLeft}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.yearTitle}>{`${startYear}/${startYear + 1}`}</Text>
        <TouchableOpacity onPress={incrementYear} style={styles.arrowRight}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Servizi */}
      <Text style={styles.title}>Servizi</Text>

      {/* Icone */}
      <View style={styles.icone}>
        <HomeButton
          text="Borsa di studio"
          iconName="school"
          onPress={() => router.push("/BorsaDiStudio/BorsaDiStudioPage")}
        />
        <HomeButton
          text="Mensa"
          iconName="fast-food"
          onPress={() => router.push("/Mensa/mensa")}
        />
        <HomeButton
          text="Biblioteca"
          iconName="library"
          onPress={() => router.push("/Mensa/mensa")}
        />
      </View>

      {/* News */}
      <Text style={styles.titleNews}>News</Text>
      <View style={styles.news}>
        <View style={styles.slideshowContainer}>
          <FlatList
            style={styles.list}
            ref={flatListRef}
            data={newsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <View style={styles.newsCard}>
                  <Image source={item.imageUrl} style={styles.newsImage} />
                  <View style={styles.navigationContainer}>
                    <TouchableOpacity
                      style={styles.navButton}
                      onPress={prevSlide}
                    >
                      <Text style={styles.arrowCarosello}>❮</Text>
                    </TouchableOpacity>
                    <Text style={styles.newsDate}>{item.date}</Text>
                    <TouchableOpacity
                      style={styles.navButton}
                      onPress={nextSlide}
                    >
                      <Text style={styles.arrowCarosello}>❯</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsContent}>{item.content}</Text>
                </View>
                <View style={styles.indicatorContainer}>
                  {newsData.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.indicator,
                        currentIndex === index
                          ? styles.activeIndicator
                          : styles.inactiveIndicator,
                      ]}
                    />
                  ))}
                </View>
              </View>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            decelerationRate="fast"
          />
        </View>
      </View>

      {/* navbar */}
      <View>
        <Navbar namePage="landingPage" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginLeft: 20,
    color: "#333",
    fontWeight: "bold",
  },
  titleNews: {
    fontSize: 24,
    marginLeft: 20,
    marginBottom: 32,
    color: "#333",
    fontWeight: "bold",
  },
  container: {
    //* Tutta la pagina */
    flex: 1,
    gap: 4,
    backgroundColor: "#FFFFFF",
  },
  list: {
    width: "100%",
    marginBottom: 100,
  },
  PugliaLogo: {
    width: wp("20%"), // Adjust the width as needed
    height: hp("5%"), // Adjust the height as needed
    resizeMode: "contain",
  },
  headerImage: {
    width: wp("20%"), // Adjust the width as needed
    height: hp("9%"), // Adjust the height as needed
    resizeMode: "contain",
  },
  header: {
    flex: 0.5,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10 /**Distanza tra logo e bordo esterno */,
  },
  ScrollAnno: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    position: "relative",
    marginVertical: 20,
    width: wp("80%"), // Adjust the width as needed
    height: hp("5%"), // Adjust the height as needed
    alignSelf: "center",
  },
  arrowLeft: {
    position: "absolute",
    left: 10,
  },
  arrowRight: {
    position: "absolute",
    right: 10,
  },
  arrow: {
    fontSize: 24,
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  navButton: {
    padding: 10,
  },
  arrowCarosello: {
    fontSize: 24,
    color: "white",
  },
  newsDate: {
    marginTop: -50,
    fontSize: 14,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  yearSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
    fontWeight: "bold",
  },
  servizi: {
    /**Barra orrizontale servizi + guardaTutto */ flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flex: 0.2,
    backgroundColor: "orange",
  },
  yearTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  serviziTitle: {
    fontSize: 15,
  },
  icone: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  news: {
    flex: 4,
    gap: 3,
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  slideshowContainer: {
    maxWidth: width,
    position: "relative",
    margin: "auto",
  },
  newsCard: {
    width: width - 20, // Imposta la larghezza della card alla larghezza dello schermo
    backgroundColor: "#007fff",
    margin: 10,
    marginRight: 10,
    borderRadius: 20,
    padding: 0,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  newsImage: {
    width: "100%",
    height: 150,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  newsTitle: {
    marginTop: -30,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 60,
    textAlign: "center",
    color: "white",
    width: "70%",
  },
  newsContent: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: "white",
  },
  prev: {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    left: 0,
    padding: 16,
    marginTop: -22,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
  },
  next: {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    right: 0,
    padding: 16,
    marginTop: -22,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: "3px 0 0 3px",
    userSelect: "none",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#007FFF",
  },
  inactiveIndicator: {
    backgroundColor: "#cccccc",
  },
  section3: {
    padding: 10,
    flex: 3,
    backgroundColor: "white",
  },
});
