
import HomeButton from '@/components/homeButton';
import React, { useState } from 'react';
import { View, Text, StyleSheet,  Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

    
export default function landingPage() {
    
    const currentYear = new Date().getFullYear(); // Get the current year
    const [startYear, setStartYear] = useState(currentYear); // Stato per l'anno corrente

    const incrementYear = () => {
        setStartYear(startYear + 1);
    };

    const decrementYear = () => {
        setStartYear(startYear - 1);
    };

    return (    
    <View style={styles.container}>


      {/* header */}
      <View style={styles.header}>
      <Image
            source={require('@/assets/images/LogoRegionePuglia.png')}
            style={styles.PugliaLogo}
        />
        <Image
            source={require('@/assets/images/LogoAdisu.png')}
            style={styles.headerImage}
        />
        </View>


        {/* Scroll dell'anno*/}
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
        <View style={styles.servizi}>
        
        <Text style={styles.serviziTitle}>Servizi</Text>
        

      </View>


      {/* Icone */}
      <View style={styles.icone}>
      
                    <HomeButton text="Borsa di studio" iconName="school" />
                    <HomeButton text="Mensa" iconName="food" />
                    <HomeButton text="Biblioteca" iconName="library" />
               
      </View>

      {/* News */}
      <View style={styles.news}>
        
          <Text>news  </Text>
        
      </View>

      {/* navbar */}
      <View style={styles.navbar}>
      <Text>navbar</Text>
      </View>
    </View>

    );      
}

const styles = StyleSheet.create({

    container: { //* Tutta la pagina */
        flex: 1,
        gap: 4,
        backgroundColor: '#FFFFFF',
    },

    PugliaLogo: {
        width: wp('20%'), // Adjust the width as needed
        height: hp('5%'), // Adjust the height as needed
        resizeMode: 'contain',
        
    },
    headerImage: {
        width: wp('20%'), // Adjust the width as needed
        height: hp('9%'), // Adjust the height as needed
        resizeMode: 'contain',
       
    },

    header: {
        flex: 0.5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10, /**Distanza tra logo e bordo esterno */
        
    },

    ScrollAnno: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5,
        position: 'relative',
        marginVertical: 20,
        width: wp('80%'), // Adjust the width as needed
        height: hp('5%'), // Adjust the height as needed
        alignSelf: 'center',
    },
    arrowLeft: {
        position: 'absolute',
        left: 10,
    },
    arrowRight: {
        position: 'absolute',
        right: 10,
    },
    arrow: {
        fontSize: 24,
        marginHorizontal: 20,
    },
    yearSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
    },

    
   
    servizi: { /**Barra orrizontale servizi + guardaTutto */
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        flex: 0.2,
        backgroundColor: 'orange',
    },

    yearTitle: {
        fontSize: 15,    
    },

    serviziTitle: {
        fontSize: 15,
    },
    
    icone: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    news: {
        flex: 4,
        gap: 4,
        display: 'flex',
        backgroundColor: 'lightyellow',
    },

    
    section3: {
        padding: 10,
        flex: 3,
        backgroundColor: 'white',
    },
    navbar: {
        flex: 1,
        backgroundColor: 'lightgreen',
    },
    
});