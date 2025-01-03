import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Keyboard, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../../components/Navbar'; // Update the path to the correct location
import { useCRUD } from '@/hooks/useCRUD';

interface Mensa {
    id: number;
    name: string;
    address: string;
    city: string;
    province: string;
}

const Mensa = () => {
    const { data, loading, error, createItem, updateItem, deleteItem } = useCRUD<Mensa>('/canteen/');
    const [mensaName, setMensaName] = useState('');
    const [searchResults, setSearchResults] = useState<Mensa[]>([]);
    const [filteredMensaList, setFilteredMensaList] = useState<Mensa[]>([]);
    const mensaList: Mensa[] = data;

    const searchMensa = () => {
        if (mensaName.trim()) {
            const results = mensaList.filter(mensa => mensa.name.toLowerCase().includes(mensaName.toLowerCase()));
            setSearchResults(results);
            Keyboard.dismiss();
        }
    };

    const filterMensaList = (query: string) => {
        if (query) {
            const results = mensaList.filter(mensa => mensa.name.toLowerCase().includes(query.toLowerCase()));
            setFilteredMensaList(results);
        } else {
            setFilteredMensaList([]);
        }
        setMensaName(query);
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Header */}
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

                    {/* Input Section */}
                    <View style={styles.inputSection}>
                        <TextInput
                            value={mensaName}
                            onChangeText={filterMensaList}
                            placeholder="Inserisci il nome della mensa"
                            style={styles.input}
                        />
                        {filteredMensaList.length > 0 && (
                            <FlatList
                                data={filteredMensaList}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        setMensaName(item.name);
                                        setFilteredMensaList([]);
                                    }}>
                                        <View style={styles.suggestionItem}>
                                            <Text style={styles.itemText}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                style={styles.suggestionList}
                            />
                        )}
                        <TouchableOpacity onPress={searchMensa} style={styles.searchButton}>
                            <Text style={styles.searchButtonText}>Cerca</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Mensa List */}
                    <View style={styles.mensaList}>
                        {searchResults.map((mensa, index) => (
                            <View key={index} style={styles.mensaItem}>
                                <Text style={styles.mensaName}>{mensa.name}</Text>
                                <Text>{mensa.address}</Text>
                                <Text>{mensa.city}, {mensa.province}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Navbar */}
            <Navbar />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        paddingBottom: 60, // Space for the fixed navbar
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    PugliaLogo: {
        width: wp('20%'),
        height: hp('10%'),
        resizeMode: 'contain',
    },
    headerImage: {
        width: wp('20%'),
        height: hp('10%'),
        resizeMode: 'contain',
    },
    inputSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    searchButton: {
        backgroundColor: '#007FFF',
        padding: 10,
        borderRadius: 5,
    },
    searchButtonText: {
        color: 'white',
    },
    mensaList: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        height: hp('50%'),
    },
    mensaItem: {
        width: '80%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    mensaName: {
        fontWeight: 'bold',
    },
    itemText: {
        padding: 10,
        fontSize: 15,
    },
    suggestionList: {
        maxHeight: hp('60%'), // Increase the height of the suggestion list
        width: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});

export default Mensa;