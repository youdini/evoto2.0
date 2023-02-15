import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";

import RoomListsScreen from "../screens/RoomListsScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfieScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title={"Rooms"} />
    <BottomNavigationTab title={"Home"} />
    <BottomNavigationTab title={"Profile"} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    backBehavior="initialRoute"
    tabBar={(props) => <BottomBar {...props} />}
    initialRouteName={"Home"}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Rooms" component={RoomListsScreen} />
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Profile" component={ProfileScreen} />
  </Navigator>
);

export default TabNavigator;
