import { TypeAllergeni } from "@/app/lib/definitions";
import { Image, StyleSheet, View } from "react-native";

const allergens: { [key: string]: any } = {
    "Pesce": require('../assets/icons/icons8-gambero-94.png'),
    "Glutine": require('../assets/icons/icons8-grano-94.png'),
}

const Allergen = ({ allergen }: { allergen: TypeAllergeni[] }) => {
    return (<View style={styles.allergenRow}>
        {
            allergen.map((val) => {
                return (<Image
                    source={allergens[val.name]}
                    style={styles.allergenIcon}
                />)
            })
        }
    </View>);
};

const styles = StyleSheet.create({
    allergenRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    allergenIcon: {
        width: 20,
        height: 20,
    },
});

export default Allergen;