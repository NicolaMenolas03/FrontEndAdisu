import { router } from "expo-router";

export const navigateToMensa = () => {
    router.push(`/Mensa/(mensa)/mensa`);
};

export const navigateToAddMensa = () => {
    router.push(`/Mensa/addMensa`);
};

export const navigateToHome = () => {
    router.push(`/(tabs)/landingPage`);
};

export const navigateToPasti = (canteen_id: string) => {
    router.push(`/Mensa/Pasti?id=${canteen_id}`);
}

export const navigateToCart = () => {
    router.push(`/Mensa/(pasti)/cart`);
};

export const navigateToOrders = () => {
    router.push(`/Mensa/(pasti)/orders`);
};

