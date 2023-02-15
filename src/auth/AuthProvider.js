import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        onGoogleSignIn: async () => {
          try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({
              showPlayServicesUpdateDialog: true,
            });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
          } catch (error) {
            if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              alert("Google Play Services is not available");
            } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              alert("User cancelled the sign-in");
            } else if (error.code === statusCodes.IN_PROGRESS) {
              alert("Sign-in in progress");
            } else {
              alert(error.message);
            }
          }
        },

        onLogOut: async () => {
          try {
            await auth().signOut();
            await GoogleSignin.revokeAccess();
          } catch (e) {
            alert(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
