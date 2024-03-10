// MODULES
import { Slot } from 'expo-router';
import { ThemeProvider, DarkTheme } from "@react-navigation/native";

// CONTEXT
import { GlobalProvider } from '../context/Global';

export default function Layout() {
    
    return (

        <ThemeProvider value={DarkTheme}>
            <GlobalProvider>
                <Slot />
            </GlobalProvider>
        </ThemeProvider>
    )
}