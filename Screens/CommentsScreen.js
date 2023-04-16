import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const CommentsScreen = ({ navigation }) => {
  const [coment, setComent] = useState("");

  const onCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={onCloseKeyboard}>
      <View style={styles.container}>
        <View>
          <Image
            // source={{
            //   uri: item.photo,
            //   cache: "only-if-cached",
            // }}
            style={styles.photo}
          />
        </View>
        <View style={styles.comentList}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <SafeAreaView style={styles.containerForm}>
              <TextInput
                style={styles.input}
                value={coment}
                onChangeText={setComent}
                placeholder="Коментувати..."
                placeholderTextColor="#BDBDBD"
              />
              <TouchableOpacity
                style={styles.comentSubBtn}
                // onPress={addComent}
                // onBlur={onCloseKeyboard}
                activeOpacity="0.8"
              >
                <AntDesign name="arrowup" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 16,
    overflow: "hidden",
    // minHeight: "100%",
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
    marginBottom: 32,
  },
  comentList: {
    flex: 1,
    // height: "100%",
    // minHeight: "100%",
    // height: 290,
    // overflow: "scroll",
  },

  coments: {
    flexDirection: "row",
  },

  userImg: {
    width: 24,
    height: 24,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
  },

  coment: {
    width: 299,
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#F6F6F6",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  comentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  comentData: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    textAlign: "left",
  },
  comentDataUser: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    textAlign: "right",
  },
  containerForm: {
    position: "relative",

    // fles: 1,
    marginTop: "auto",
  },
  input: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 50,

    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,

    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
  },
  comentSubBtn: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
});
