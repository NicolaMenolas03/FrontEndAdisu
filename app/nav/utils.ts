import { router } from "expo-router";

export const navigateToMensa = () => {
    router.push(`/Mensa/(mensa)/mensa`);
};

export const navigateToAddMensa = () => {
    router.push(`/Mensa/addMensa`);
};

export const navigateToChangeMensa = (id: string) => {
    router.push(`/Mensa/changeMensa?id=${id}`);
};

export const navigateToHome = () => {
    router.push(`/(tabs)/landingPage`);
};

export const navigateToPasti = (id: string) => {
    router.push(`/Mensa/pasti?id=${id}`);
}

export const navigateToCart = () => {
    router.push(`/Mensa/(pasti)/cart`);
};

export const navigateToOrders = () => {
    router.push(`/Mensa/(pasti)/orders`);
};

