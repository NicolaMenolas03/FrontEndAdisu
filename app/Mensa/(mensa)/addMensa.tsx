import { TypeCanteen } from "@/app/lib/definitions";
import { useCRUD } from "@/hooks/useCRUD";
import { View } from "react-native";

const AddMensa = () => {
    const { createItem } = useCRUD<TypeCanteen>("/canteen/");

    return (
        <View>
            Add Mensa
        </View>
    );
};

export default AddMensa;