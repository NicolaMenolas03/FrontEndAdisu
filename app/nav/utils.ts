import { router } from "expo-router";

export const navigateToRegistration = () => {
    router.push(`/Registration`);
};

export const navigateToLogin = () => {
    router.push(`/login`);
};

export const navigateToCanteen = () => {
    router.push(`/Mensa/Canteen`);
};

export const navigateToAddCanteen = () => {
    router.push(`/Mensa/AddCanteen`);
};

export const navigateToChangeCanteen = (id: string) => {
    router.push(`/Mensa/ChangeCanteen?id=${id}`);
};

export const navigateToHome = () => {
    router.push(`/(tabs)/landingPage`);
};

export const navigateToDailyMeals = (id: string) => {
    router.push(`/Mensa/DailyMeals?id=${id}`);
}

export const navigateToCart = () => {
    router.push(`/Mensa/Cart`);
};

export const navigateToOrders = () => {
    router.push(`/Mensa/Orders`);
};


export const navigateToMeal = () => {
    router.push(`/Mensa/Meal`);
};

export const navigateToAddMeal = () => {
    router.push(`/Mensa/AddMeal`);
};

export const navigateToChangeMeal = (id: string) => {
    router.push(`/Mensa/ChangeMeal?id=${id}`);
};
