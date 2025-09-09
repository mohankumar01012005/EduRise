import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { UserDetailContext } from "./../context/UserDetailContext";
import { useState } from "react";

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
        {/* Your screens go here */}
      </Stack>
    </UserDetailContext.Provider>
  );
}
