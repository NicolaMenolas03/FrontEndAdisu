// Pasti
export type TypeAllergeni = {
    id: number;
    name: string;
};

export type TypePasti = {
    id: number;
    name: string;
    description: string;
    price: number;
    type: string;
    allergens: TypeAllergeni[];
    canteens: number;
};

// Mensa
export type TypeMensa = {
    id: number;
    name: string;
    address: string;
    city: string;
    province: string;
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


// Cart Context
export type MealQuantities = {
    [key: number]: {
        meal: TypePasti;
        quantity: number;
    };
}

export type CartContextType = {
    selectedMeals: MealQuantities;
    addToCart: (meal: TypePasti) => void;
    removeFromCart: (mealId: number) => void;
    getTotalItems: () => number;
};
