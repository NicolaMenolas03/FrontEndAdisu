import { MealProvider } from '@/context/MealContext';
import { Stack } from 'expo-router';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <MealProvider>
            <Stack
                screenOptions={{ headerShown: false }}
            >
            </Stack>
            {children}
        </MealProvider>
    );
}