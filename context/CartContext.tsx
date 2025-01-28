import React, { createContext, useState, useContext } from 'react';
import { CartContextType, MealQuantities, TypePasti } from '@/app/lib/definitions';


const CartContext = createContext<CartContextType>({
    selectedMeals: {},
    addToCart: () => {},
    removeFromCart: () => {},
    getTotalItems: () => 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [selectedMeals, setSelectedMeals] = useState<MealQuantities>({});

    const addToCart = (meal: TypePasti) => {
        setSelectedMeals(prev => {
            const updatedMeals = { ...prev };
            if (updatedMeals[meal.id]) {
                updatedMeals[meal.id].quantity += 1;
            } else {
                updatedMeals[meal.id] = {
                    meal,
                    quantity: 1
                };
            }
            return updatedMeals;
        });
    };

    const removeFromCart = (mealId: number) => {
        setSelectedMeals(prev => {
            const updatedMeals = { ...prev };
            if (updatedMeals[mealId].quantity > 1) {
                updatedMeals[mealId].quantity -= 1;
            } else {
                delete updatedMeals[mealId];
            }
            return updatedMeals;
        });
    };

    const getTotalItems = () => {
        return Object.values(selectedMeals).reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ 
            selectedMeals, 
            addToCart, 
            removeFromCart,
            getTotalItems 
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);