import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { Home } from "../Screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, AntDesign, Octicons } from "@expo/vector-icons";

import * as SplashScreen from "expo-splash-screen";
import { LoginScreen } from "../Screens/auth/LoginScreen";
import { RegistrationScreen } from "../Screens/auth/RegistrationScreen";
import { StyleSheet, TouchableOpacity, View } from "react-native";
SplashScreen.preventAutoHideAsync();

const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();
const isLoggedIn = true;

export const Main = () => {
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabs.Navigator>
          <MainTabs.Screen
            name="Головна"
            component={Home}
            options={({ route }) => {
              return {
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="appstore-o" color={color} size={size} />
                ),
              };
            }}
          />
          <MainTabs.Screen
            name="Створити публікацію"
            component={CreatePostsScreen}
            options={{
              tabBarShowLabel: false,
              tabBarShow: false,

              tabBarIcon: ({ color, size }) => (
                <View style={styles.buttonPlus}>
                  <Octicons name="plus" color={color} size={size} />
                </View>
              ),
              tabBarStyle: { display: "none" },
              headerLeft: () => {
                const navigation = useNavigation();
                return (
                  <TouchableOpacity
                    style={{ paddingLeft: 16 }}
                    onPress={() => navigation.goBack()}
                  >
                    <Feather name="arrow-left" size={24} color="black" />
                  </TouchableOpacity>
                );
              },
              headerTintColor: "#212121",
              headerTitleStyle: {
                fontWeight: "Roboto-500",
              },
              headerTitleAlign: "center",
            }}
          />
          <MainTabs.Screen
            name="Профіль"
            component={ProfileScreen}
            // initialParams={{ data }}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <Feather name="user" color={color} size={size} />
              ),
            }}
          />
        </MainTabs.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="Логін">
          <AuthStack.Screen
            name="Реєстрація"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="Логін"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  buttonPlus: {
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
