import { LoginScreen } from "./Screens/LoginScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Bold": require("./assets/Fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
  });
};
const fonts = {
  robotoBold: "Roboto-Bold",
  robotoRegular: "Roboto-Regular",
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return <RegistrationScreen fonts={fonts} />;
  // return <LoginScreen fonts={fonts} />;
}
