import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export const PostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View>
          <Image
            // source={{
            //   uri: photoURL,
            //   cache: "only-if-cached",
            // }}
            // style={{ width: 60, height: 60, backgroundColor: "red" }}
            style={styles.userImg}
          />
        </View>
        <View style={styles.userInformation}>
          <Text style={styles.userName}>Ім'я користувача</Text>
          <Text style={styles.userEmail}>Пошта користувача</Text>
        </View>
      </View>
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
    fontFamily: "Roboto-500",
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
