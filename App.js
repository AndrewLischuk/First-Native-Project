import { useCallback } from "react";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
import { Text } from "react-native";
import { Main } from "./Component/Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/Fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>Loaded</Text>;
  }
  onLayoutRootView();

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
