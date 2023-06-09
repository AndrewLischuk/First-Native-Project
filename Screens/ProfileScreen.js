import { EvilIcons, AntDesign } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import image from "../assets/imageBg.png";
import { authAddPhotoURL, authStateSignOut } from "../redux/auth/authOptions";

export const ProfileScreen = ({ navigation }) => {
  const { uid, email, photoURL, userName } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);
  const data = posts.filter((item) => item.uid === uid);

  const addImages = async () => {
    try {
      const picked = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
      console.log(picked);
      if (!picked.uri) {
        return;
      }
      dispatch(authAddPhotoURL({ image: picked.uri, uid }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.profile}>
          <View style={styles.userImgBox}>
            <Image
              source={{
                uri: photoURL,
              }}
              style={styles.userImg}
            />
            <TouchableOpacity
              style={
                photoURL
                  ? styles.inputLodoBtn
                  : { ...styles.inputLodoBtn, borderColor: "#FF6C00" }
              }
              onPress={addImages}
              activeOpacity="0.8"
            >
              {image ? (
                <EvilIcons name="close" size={24} color="#E8E8E8" />
              ) : (
                <AntDesign name="plus" size={13} color="#FF6C00" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.profileTitle}>
            <Text style={styles.profileTitleText}>{userName}</Text>
          </View>
          <TouchableOpacity
            style={styles.logOut}
            onPress={() => dispatch(authStateSignOut())}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <FlatList
            style={styles.list}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              let active = false;
              item.comments.forEach((comment) => {
                if (comment.uid === uid) {
                  active = true;
                }
              });
              return (
                <View style={styles.post}>
                  <Image
                    source={{
                      uri: item.photo,
                      cache: "only-if-cached",
                    }}
                    style={styles.photo}
                  />

                  <Text style={styles.nameText}>{item.name}</Text>

                  <View style={styles.interaction}>
                    <TouchableOpacity
                      style={styles.interactionBtn}
                      onPress={() =>
                        navigation.navigate("Коментарии", { item })
                      }
                      activeOpacity="0.8"
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color={active ? "#FF6C00" : "#BDBDBD"}
                        style={
                          {
                            // // backgroundColor: "red",
                            // visibility: "hidden",
                            // fill: "#8F9BB3",
                            // borderWidth: 3,
                          }
                        }
                      />
                      <Text style={styles.coments}>{item.comments.length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.interactionBtn}
                      onPress={() =>
                        navigation.navigate("Карта", {
                          location: item.location,
                        })
                      }
                      activeOpacity="0.8"
                    >
                      <Feather name="map-pin" size={24} color="#BDBDBD" />
                      <Text style={styles.location}>{item.locationUser}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userImgBox: {
    position: "absolute",
    right: "22.5%",
    transform: [{ translateX: -60 }, { translateY: -60 }],
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  userImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  inputLodoBtn: {
    position: "absolute",
    transform: [{ translateX: 12.5 }, { translateY: -12.5 }],
    top: 93,
    right: 0,

    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingTop: 147,
  },
  profileTitle: {
    marginBottom: 33,
  },
  profileTitleText: {
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  profile: {
    position: "relative",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#ffffff",
  },
  logOut: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  list: {
    maxHeight: 421,
  },
  post: {
    marginBottom: 34,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  nameText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },

  interaction: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 24,
  },
  interactionBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  coments: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 6,
  },
  location: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginLeft: 3,
    textAlign: "right",
    textDecorationLine: "underline",
  },
});
