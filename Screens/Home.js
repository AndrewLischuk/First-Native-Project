import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";
import { TouchableOpacity } from "react-native";
import { PostsScreen } from "./PostsScreen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const HomeStack = createStackNavigator();

export const Home = () => {
  const dispatch = useDispatch();
  return (
    <HomeStack.Navigator initialRouteName="Публікації">
      <HomeStack.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "Roboto-Bold",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 16 }}
              onPress={() => dispatch(authStateSignOut())}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="Мапа"
        component={MapScreen}
        options={{
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "Roboto-Bold",
          },
          headerTitleAlign: "center",
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
        }}
      />
      <HomeStack.Screen
        name="Коментарі"
        component={CommentsScreen}
        options={{
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "Roboto-Bold",
          },
          headerTitleAlign: "center",
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
        }}
      />
    </HomeStack.Navigator>
  );
};
