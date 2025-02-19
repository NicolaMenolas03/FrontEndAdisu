import React, { createContext, useContext, useEffect, useState } from 'react';
import { TypeCanteen } from '@/app/lib/definitions';
import { useCRUD } from '@/hooks/useCRUD';
import { getGroupsUser } from '@/services/api';

type TypeCanteenContex = {
    data: TypeCanteen[],
    loading: boolean,
    error: string | null,
    groups: string[],
    createItem: (item: TypeCanteen) => void,
    updateItem: (id: number, updatedItem: Partial<TypeCanteen>) => void,
    deleteItem: (id: number) => void,
    getSingleItem: (id: number) => void,

}

const CanteenContex = createContext<TypeCanteenContex>({
    data: [],
    loading: false,
    error: null,
    groups: [],
    createItem: () => { },
    updateItem: () => { },
    deleteItem: () => { },
    getSingleItem: () => { },
})

export function CanteenProvider({ children }: { children: React.ReactNode }) {
    const { data, loading, error, createItem, updateItem, deleteItem, getSingleItem } = useCRUD<TypeCanteen>("/canteen/")
    const [groups, setGroups] = useState<string[]>([]);
    useEffect(() => {
        async function fetchGroups() {
            const userGroups = await getGroupsUser();
            setGroups(userGroups ? userGroups : []);
        }
        fetchGroups();
    }, [])


    return (
        <CanteenContex.Provider value={{
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
        </CanteenContex.Provider>
    )
}

export const useCanteen = () => useContext(CanteenContex);