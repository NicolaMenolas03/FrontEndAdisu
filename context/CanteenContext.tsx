import React, { createContext, useContext } from 'react';
import { TypeCanteen } from '@/app/lib/definitions';
import { useCRUD } from '@/hooks/useCRUD';

type TypeCanteenContex = {
    data: TypeCanteen[],
    loading: boolean,
    error: string | null,
    createItem: (item: TypeCanteen) => void,
    updateItem: (id: number, updatedItem: Partial<TypeCanteen>) => void,
    deleteItem: (id: number) => void,
    getSingleItem: (id: number) => void,

}

const CanteenContex = createContext<TypeCanteenContex>({
    data: [],
    loading: false,
    error: null,
    createItem: () => { },
    updateItem: () => { },
    deleteItem: () => { },
    getSingleItem: () => { },
})

export function CanteenProvider({ children }: { children: React.ReactNode }){
    const { data, loading, error, createItem, updateItem, deleteItem, getSingleItem } = useCRUD<TypeCanteen>("/canteen/")

    return (
        <CanteenContex.Provider value={{
            data,
            loading,
            error,
            createItem,
            updateItem,
            deleteItem,
            getSingleItem,
        }}>
            {children}
        </CanteenContex.Provider>
    )
}

export const useCanteen = () => useContext(CanteenContex);