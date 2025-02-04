// Pasti
export type TypeAllergeni = {
    id: number;
    name: string;
};

export type TypeMeal = {
    id: number;
    name: string;
    description: string;
    price: number;
    type: string;
    allergens: TypeAllergeni[];
    canteens: number;
};

export type TypeDailyMeal = {
    id: number;
    available: boolean;
    meal: TypeMeal;
    date: string;
    canteen: TypeCanteen;
}

// Mensa
export type TypeCanteen = {
    id: number;
    name: string;
    address: string;
    city: string;
    province: string;
    average_rating: number;
};


// Rating
export type TypeRating = {
    id: number;
    scale: number;
    meal: TypeMeal;
    meal_id?: number;
    canteen: TypeCanteen;
    canteen_id?: number;
};

// Auth
export type AuthResponse = {
    access: string;
    refresh: string;
}

export type LoginData = {
    username: string;
    password: string;
}

export type RegisterData = {
    username: string;
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
}

// Bookings
export type TypeBooking = {
    id: number;
    user: number;
    booking_date: string;
    collection_date: string
    status: string;
    price: number;
    total_price: number;
    canteen: TypeCanteen;
    items?: Array<{
        meal: number;
        quantity: number;
        meal_type?: string;
    }>;
    canteen_id?: number;

}

export type TypeBookingItem = {
    id: number;
    booking: TypeBooking;
    meal: TypeMeal;
    quantity: number;
    price: number;
}


// Cart Context
export type MealQuantities = {
    [key: number]: {
        meal: TypeMeal;
        quantity: number;
    };
}

export type CartContextType = {
    selectedMeals: MealQuantities;
    canteen_id?: number;
    totalPrice: number;
    addToCart: (meal: TypeMeal) => void;
    removeFromCart: (mealId: number) => void;
    getTotalItems: () => number;
    setCanteenId: (id: number) => void;
    clearCart: () => void;
};
