import { TypePasti, CartContextType } from '@/app/lib/definitions';
import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext<CartContextType>({
    cartItems: 0,
    selectedMeals: [],
    addToCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState(0);
    const [selectedMeals, setSelectedMeals] = useState<TypePasti[]>([]);

    const addToCart = (meal: TypePasti) => {
        setCartItems(prev => prev + 1);
        setSelectedMeals(prev => [...prev, meal]);
    };

    return (
        <CartContext.Provider value={{ cartItems, selectedMeals, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);