import { router } from "expo-router";

export const navigateToMensa = () => {
    router.push(`/Mensa/mensa`);
};

export const navigateToHome = () => {
    router.push(`/(tabs)/landingPage`);
};

export const navigateToPasti = (canteen_id: string) => {
    router.push(`/Mensa/pasti?mensaId=${canteen_id}`);
}

export const navigateToCart = () => {
    router.push(`/Mensa/(pasti)/cart`);
};

export const navigateToOrders = () => {
    router.push(`/Mensa/(pasti)/orders`);
};

