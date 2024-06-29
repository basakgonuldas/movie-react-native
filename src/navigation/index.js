import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import SearchScreen from "../screens/SearchScreen";
import SavedScreen from "../screens/SavedScreen";
import HomeScreen from "../screens/HomeScreen";
import PersonScreen from "../screens/PersonScreen";
import SignupScreen from "../screens/Signup";
import { Ionicons } from "@expo/vector-icons";
import MovieScreen from "../screens/MovieScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="Movie" component={MovieScreen} />
            <Stack.Screen name="PersonDetail" component={PersonScreen} />
            <Stack.Screen name="SearchDetail" component={SearchScreen} />
        </Stack.Navigator>
    );
}

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    let iconName;

                    if (route.name === "HomeStack") {
                        iconName = "home";
                    } else if (route.name === "Search") {
                        iconName = "search";
                    } else if (route.name === "Saved") {
                        iconName = "heart";
                    } else if (route.name === "Profile") {
                        iconName = "person";
                    }

                    const customizeSize = 30;

                    return (
                        <Ionicons
                            name={iconName}
                            size={customizeSize}
                            color={focused ? "white" : "gray"}
                        />
                    );
                },
                tabBarActiveTintColor: "white",
                tabBarStyle: {
                    backgroundColor: "#1F1D2B",
                    borderTopWidth: 0,
                    paddingBottom: 10,
                },
            })}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Saved" component={SavedScreen} />
            <Tab.Screen name="Profile" component={PersonScreen} />
        </Tab.Navigator>
    );
}

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Main" component={HomeTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}