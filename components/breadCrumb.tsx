import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';

type RootStackParamList = {
  [key: string]: undefined;
};

const BreadCrumb = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  // Funzione per formattare il testo del percorso
  const formatPathName = (path: string) => {
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Crea l'array dei percorsi dalla route name
  const getBreadcrumbPaths = () => {
    const paths = route.name.split('/').filter(path => path);
    return paths.map((path, index) => ({
      name: formatPathName(path),
      path: `/(tabs)/${paths.slice(0, index + 1).join('/')}` as const,
    }));
  };

  const paths = getBreadcrumbPaths();

  return (
    <View style={styles.container}>
      {paths.length > 1 && (
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
      )}
      
      <View style={styles.breadcrumbContainer}>
        {paths.map((item, index) => (
          <View key={item.path} style={styles.breadcrumbItem}>
            <TouchableOpacity
              onPress={() => {
                if (index !== paths.length - 1) {
                  router.push(item.path);
                }
              }}
            >
              <Text
                style={[
                  styles.breadcrumbText,
                  index === paths.length - 1 && styles.activeBreadcrumb,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
            
            {index < paths.length - 1 && (
              <Text style={styles.separator}> / </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#666',
  },
  activeBreadcrumb: {
    color: '#333',
    fontWeight: 'bold',
  },
  separator: {
    marginHorizontal: 5,
    color: '#666',
  },
});

export default BreadCrumb;
