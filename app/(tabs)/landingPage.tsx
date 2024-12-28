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
                <Text style={styles.year}>{`${startYear}/${startYear + 1}`}</Text>
                <TouchableOpacity onPress={incrementYear} style={styles.arrowRight}>
                    <Text style={styles.arrow}>{">"}</Text>
                </TouchableOpacity>
            </View>

    {/* Servizi */}
        <View style={styles.servizi}>
        
        <Text style={styles.year}>Servizi</Text>
        <Text style={styles.year}>Guarda Tutto {'>'}</Text>

      </View>


      {/* Icone */}
      <View style={styles.icone}>
              {/*Qui dentro per ogni icona posso creare 3 tag diversi all'interno di un solo contenitore 
              e posso gestire la distanza fra le icone con space-between nello stile
              Oppure usare gia questa view come contenitore generale*/}

          <Text>Icone con indirizzamento      </Text>
        
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
    year: {
        fontSize: 19, 
        fontWeight: 'bold', 
        fontFamily: 'Monospace', 
        color: '#333', 
    },

    
   
    servizi: { /**Barra orrizontale servizi + guardaTutto */
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        flex: 0.2,
        backgroundColor: 'orange',
    },

    
    icone: {
        flex: 4,
        gap: 4,
        display: 'flex',
        backgroundColor: 'lightblue',
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