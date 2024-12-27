import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() 
{
  return (

    
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/LogoAdisu.jpg')}
          style={styles.AdisuLogo}
        />
      }>
      
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  AdisuLogo: {
    
    width: 1080,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  Titolo: {
    fontSize: 50,
  },
});
