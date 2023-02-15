import React, { useContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { AppNavigator } from "./AppNavigator";
import SignInScreen from "../screens/SignInScreen";
import { AuthContext, AuthProvider } from "../auth/AuthProvider";
import { ActivityIndicator } from "react-native";

GoogleSignin.configure({
  webClientId:
    "135093860534-qo4q8o9qqio2e8mcfq9hshn2ffm2gdvq.apps.googleusercontent.com",
});

export const Routes = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <AuthProvider>{user ? <AppNavigator /> : <SignInScreen />}</AuthProvider>
  );
};
