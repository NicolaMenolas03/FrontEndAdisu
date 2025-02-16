import { CanteenProvider } from '@/context/CanteenContext';
import { Stack } from 'expo-router';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <CanteenProvider>
            <Stack
                screenOptions={{ headerShown: false }}
            >
            </Stack>
            {children}
        </CanteenProvider>
    );
}