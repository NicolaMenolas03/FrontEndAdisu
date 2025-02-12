import { TypeCanteen } from "@/app/lib/definitions";
import { navigateToChangeMensa, navigateToPasti } from "@/app/nav/utils";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from 'react-native-paper';


const CanteenResult = ({ canteen }: { canteen: TypeCanteen }) => {
    return (
        <View style={styles.mensaItem}>
            <Icon
                name="google-maps"
                size={24}
                color="#005dff"
                style={styles.iconMaps}
            />
            <View style={styles.mensaInfo}>
                <View style={styles.headerContainer}>
                    <Button
                        icon="pencil"
                        mode="text"
                        onPress={() => navigateToChangeMensa(canteen.id.toString())}
                        style={styles.editButton}
                        contentStyle={styles.editButtonContent} children={undefined}                    />
                    <Text style={styles.mensaName}>{canteen.name}</Text>
                </View>
                <Text>{canteen.address}</Text>
                <Text>
                    {canteen.city}, {canteen.province}
                </Text>
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                            key={star}
                            name={star <= Math.round(canteen.average_rating) ? "star" : "star-outline"}
                            size={16}
                            color="#FFD700"
                            style={styles.starIcon}
                        />
                    ))}
                    <Text style={styles.ratingText}>({canteen.average_rating.toFixed(1)})</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.goButton}
                onPress={() => navigateToPasti(canteen.id.toString())}
            >
                <Text style={styles.buttonText}><Icon
                    name="arrow-right"
                    size={20}
                    color="wihte"
                /></Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    editButton: {
        margin: 0,
        padding: 0,
        minWidth: 32,
        height: 32
    },
    editButtonContent: {
        margin: 0,
        padding: 0
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    mensaItem: {
        width: "100%",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconMaps: {
        paddingRight: 10,
        top: 0,
    },
    mensaInfo: {
        flex: 1,
    },
    mensaName: {
        fontWeight: "bold",
        flex: 1  // This will allow the text to take remaining space
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    starIcon: {
        marginRight: 2,
    },
    ratingText: {
        marginLeft: 4,
        color: '#666',
        fontSize: 12,
    },
    goButton: {
        backgroundColor: '#005dff',
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
})

export default CanteenResult;