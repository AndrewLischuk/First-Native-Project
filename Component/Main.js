import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { Home } from "../Screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { onAuthStateChanged } from "firebase/auth";

import { Feather, AntDesign, Octicons } from "@expo/vector-icons";

import * as SplashScreen from "expo-splash-screen";
import { LoginScreen } from "../Screens/auth/LoginScreen";
import { RegistrationScreen } from "../Screens/auth/RegistrationScreen";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { authStateChangeUser } from "../redux/auth/authOptions";
import { auth } from "../firebase/config";
import { added, snepshitComment } from "../redux/posts/postsOptions";
import { getPhotoURL } from "../firebase/options";

SplashScreen.preventAutoHideAsync();

const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

export const Main = () => {
  const { uid, isLoggedIn, photoURL } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    isLoggedIn && getPostsData();

    !isLoggedIn &&
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(
            authStateChangeUser({
              email: user.email,
              name: user.displayName,
              uid: user.uid,
              photoURL: user.photoURL,
            })
          );
        }
      });
  }, [isLoggedIn, getPostsData]);

  const getPostsData = async () => {
    try {
      const db = getFirestore();
      onSnapshot(collection(db, "posts"), async (snapshot) => {
        snapshot.docChanges().map(async (change) => {
          getComents(change.doc.id);

          const post = {
            id: change.doc.id,
            ...change.doc.data(),
            length: 0,
            comments: [],
            active: false,
          };
          if (change.type === "added") {
            dispatch(added({ post }));
          }
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
      });
    } catch (error) {
      console.log(error);
      dispatch(added(error));
    }
  };

  const getComents = async (id) => {
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(
        collection(db, "posts", id, "comand")
      );
      querySnapshot.forEach(async (doc) => {
        const photo =
          uid == doc.data().uid ? photoURL : await getPhotoURL(doc.data().uid);
        const comment = {
          id: doc.id,
          postId: id,
          photoURL: photo,
          ...doc.data(),
        };
        dispatch(snepshitComment({ comment }));
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                fontWeight: "Roboto-Bold",
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
