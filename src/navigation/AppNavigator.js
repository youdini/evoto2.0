import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigation";
import RoomScreen from "../screens/RoomScreen";
import CreateRoomScreen from "../screens/CreateRoomScreen";
import SettingScreen from "../screens/SettingScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import RoomSettingScreen from "../screens/RoomSettingScreen";
import VotingScreen from "../screens/VotingScreen";
import VotingScreenUser from "../screens/VotingScreenUser";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigator"
      screenOptions={{ presentation: "modal" }}
    >
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateRoomScreen"
        component={CreateRoomScreen}
        options={{ title: "Create a room" }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ title: "Setting" }}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
        options={{
          title: "Update your profile",
        }}
      />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <Stack.Screen
        name="RoomSettingScreen"
        component={RoomSettingScreen}
        options={{
          title: "Room Options",
        }}
      />
      <Stack.Screen
        name="RoomScreen"
        component={RoomScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="VotingScreen"
        component={VotingScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="VotingScreenUser"
        component={VotingScreenUser}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
};
