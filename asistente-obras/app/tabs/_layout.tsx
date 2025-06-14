// app/_layout.tsx
import { Tabs } from 'expo-router';
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import theme from '@/constants/themeLayout';
export default function Layout() {
   
  return (
  <>
    <PaperProvider theme={theme}>
  <Tabs screenOptions={{animation:'fade',headerShown:false}}>
    <Tabs.Screen name="home"/>
    <Tabs.Screen name="obras"/>
  </Tabs>
  </PaperProvider>
  </>
  );
}