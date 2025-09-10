import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { UserDetailContext } from "./../context/UserDetailContext";
import { useState } from "react";
import moduleDetail from "./moduleDetail/index"
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  const [userDetail, setUserDetail] = useState();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="addCourse" />
        <Stack.Screen name="moduleDetail" />
      </Stack>
    </UserDetailContext.Provider>
  );
}
