import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import "expo-dev-client";

import { Routes } from "./src/navigation/Routes";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/auth/AuthProvider";
import Test from "./src/screens/Test";

export default function App() {
  return (
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Routes />
      </ApplicationProvider>
    </NavigationContainer>
  );
}
