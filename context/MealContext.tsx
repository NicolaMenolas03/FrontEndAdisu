import React, { createContext, useContext, useEffect, useState } from 'react';
import { TypeMeal } from '@/app/lib/definitions';
import { useCRUD } from '@/hooks/useCRUD';
import { getGroupsUser } from '@/services/api';

type TypeMealContext = {
    data: TypeMeal[],
    loading: boolean,
    error: string | null,
    groups: string[],
    createItem: (item: TypeMeal) => void,
    updateItem: (id: number, updatedItem: Partial<TypeMeal>) => void,
    deleteItem: (id: number) => void,
    getSingleItem: (id: number) => void,

}

const MealContex = createContext<TypeMealContext>({
    data: [],
    loading: false,
    error: null,
    groups: [],
    createItem: () => { },
    updateItem: () => { },
    deleteItem: () => { },
    getSingleItem: () => { },
})

export function MealProvider({ children }: { children: React.ReactNode }) {
    const { data, loading, error, createItem, updateItem, deleteItem, getSingleItem } = useCRUD<TypeMeal>("/meal/")
    const [groups, setGroups] = useState<string[]>([]);
    useEffect(() => {
        async function fetchGroups() {
            const userGroups = await getGroupsUser();
            setGroups(userGroups ? userGroups : []);
        }
        fetchGroups();
    }, [])


    return (
        <MealContex.Provider value={{
            data,
            loading,
            error,
            groups,
            createItem,
            updateItem,
            deleteItem,
            getSingleItem,
        }}>
            {children}
        </MealContex.Provider>
    )
}

export const useMeal = () => useContext(MealContex);