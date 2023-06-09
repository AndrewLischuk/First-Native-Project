import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getFirestore } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export const PostsScreen = ({ navigation }) => {
  const { email, userName, photoURL, uid } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const data = posts;

  const db = getFirestore();

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View>
          <Image
            source={{
              uri: photoURL,
              cache: "only-if-cached",
            }}
            style={styles.userImg}
          />
        </View>
        <View style={styles.userInformation}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
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
                  onPress={() => navigation.navigate("Коментарі", { item })}
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
                    navigation.navigate("Мапа", { location: item.location })
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  user: {
    flexDirection: "row",
    marginBottom: 32,
  },
  userInformation: {
    marginLeft: 8,
    justifyContent: "center",
  },
  userImg: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
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
