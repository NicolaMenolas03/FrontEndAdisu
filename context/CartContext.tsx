import React, { createContext, useState, useContext, useEffect } from 'react';
import { CartContextType, MealQuantities, TypeMeal } from '@/app/lib/definitions';

const CartContext = createContext<CartContextType>({
    selectedMeals: {},
    canteen_id: undefined,
    totalPrice: 0,
    addToCart: () => {},
    removeFromCart: () => {},
    getTotalItems: () => 0,
    setCanteenId: () => {},
    clearCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [selectedMeals, setSelectedMeals] = useState<MealQuantities>({});
    const [canteen_id, setCanteenId] = useState<number | undefined>(undefined);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const calculateTotalPrice = () => {
        return Object.values(selectedMeals).reduce((total, item) => {
            return total + (item.meal.price * item.quantity);
        }, 0);
    };

    const clearCart = () => {
        setSelectedMeals({});
    }

    const addToCart = (meal: TypeMeal) => {
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

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [selectedMeals]);


    return (
        <CartContext.Provider value={{ 
            selectedMeals,
            totalPrice,
            canteen_id, 
            addToCart, 
            removeFromCart,
            getTotalItems,
            setCanteenId,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);