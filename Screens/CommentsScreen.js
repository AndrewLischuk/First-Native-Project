import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
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
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getPhotoURL } from "../firebase/options";
import { snepshitComment } from "../redux/posts/postsOptions";

export const CommentsScreen = ({ navigation, route }) => {
  const [coment, setComent] = useState("");
  const [data, setData] = useState([]);
  const { uid, userName, photoURL } = useSelector((state) => state.auth);
  const flatList = useRef(null);
  const item = route.params.item;

  const dispatch = useDispatch();

  useEffect(() => {
    getComments();
  }, [getComments]);

  const getComments = async () => {
    try {
      const db = getFirestore();
      onSnapshot(collection(db, "posts", item.id, "comand"), (snapshot) => {
        snapshot.docChanges().map(async (change) => {
          console.log(change.type);
          const photo =
            uid == change.doc.data().uid
              ? photoURL
              : await getPhotoURL(change.doc.data().uid);
          const comment = {
            id: change.doc.id,
            postId: item.id,
            photoURL: photo,
            ...change.doc.data(),
          };
          if (change.type === "added" && indexOfId(comment.id) < 0) {
            setData((data) => [...data, comment]);
            dispatch(snepshitComment({ comment }));
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
    }
  };

  const indexOfId = (id) => {
    for (let index = 0; index < data.length; index++) {
      if (data[index].id == id) {
        return index;
      }
    }
    return -1;
  };

  const addComent = async () => {
    try {
      const db = getFirestore();
      const date = Date.now().toString();
      const docRef = await addDoc(collection(db, "posts", item.id, "comand"), {
        coment,
        uid,
        userName,
        date,
      });
      console.log("Document written with ID: ", docRef);
      setComent("");
      onCloseKeyboard();
    } catch (error) {
      console.log(error);
    }
  };

  const dataD = data.sort((a, b) => a.date - b.date);

  const onCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={onCloseKeyboard}>
      <View style={styles.container}>
        <View>
          <Image
            source={{
              uri: item.photo,
              cache: "only-if-cached",
            }}
            style={styles.photo}
          />
        </View>
        <View style={styles.comentList}>
          <FlatList
            ref={flatList}
            onContentSizeChange={() => {
              flatList.current.scrollToEnd();
            }}
            data={dataD}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={
                  uid == item.uid
                    ? { flexDirection: "row-reverse" }
                    : { flexDirection: "row" }
                }
              >
                <Image
                  source={
                    item.photoURL
                      ? {
                          uri: item.photoURL,
                          cache: "only-if-cached",
                        }
                      : {}
                  }
                  style={
                    uid == item.uid
                      ? { ...styles.userImg, marginLeft: 16 }
                      : { ...styles.userImg, marginRight: 16 }
                  }
                />
                <View
                  style={
                    uid == item.uid
                      ? {
                          ...styles.coment,
                          borderTopLeftRadius: 6,
                          borderTopRightRadius: 0,
                        }
                      : {
                          ...styles.coment,
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 6,
                        }
                  }
                >
                  <Text style={styles.comentText}>{item.coment}</Text>
                  <Text
                    style={
                      uid == item.uid
                        ? styles.comentDataUser
                        : styles.comentData
                    }
                  >
                    {new Date(Number(item.date)).toLocaleString()}
                  </Text>
                </View>
              </View>
            )}
          />
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
                onPress={addComent}
                onBlur={onCloseKeyboard}
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
