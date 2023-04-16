import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export const CreatePostsScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [locationUser, setLocationUser] = useState("");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View>
          <View style={styles.cameraContainer}></View>
          <View>
            <View>
              <Text style={styles.photoInformation}>Завантажте фото</Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <SafeAreaView style={{ marginTop: 32 }}>
                <View>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    autoComplete="name"
                    placeholder="Назва..."
                    placeholderTextColor="#BDBDBD"
                  />
                </View>
                <View style={{ position: "relative", marginTop: 16 }}>
                  <View
                    style={{
                      position: "absolute",
                      top: 13,
                      left: 0,
                      width: 24,
                      height: 24,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="map-pin" size={18} color="#BDBDBD" />
                  </View>

                  <TextInput
                    style={{
                      ...styles.input,
                      paddingLeft: 28,
                    }}
                    value={locationUser}
                    onChangeText={setLocationUser}
                    //   autoComplete=""
                    placeholder="Місцевість..."
                    placeholderTextColor="#BDBDBD"
                  />
                </View>
                <TouchableOpacity
                  style={styles.subButton}
                  // onPress={onSubmit}
                  activeOpacity="0.8"
                >
                  <Text style={styles.buttonText}>Опубліковати</Text>
                </TouchableOpacity>
              </SafeAreaView>
            </KeyboardAvoidingView>
          </View>
        </View>
        <TouchableOpacity
          style={!isKeyboardShown ? styles.trashButton : { display: "none" }}
          // onPress={resetForm}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
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
    paddingBottom: 32,
  },
  cameraContainer: {
    borderWidth: 1,
    overflow: "hidden",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 240,
    marginBottom: 8,
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  cameraImageBox: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "all",
  },
  cameraImage: {
    width: "100%",
    height: "100%",
  },

  flipContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    flex: 1,
  },
  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
  },
  photoInformation: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  subButton: {
    // display: 1,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 32,
    // backgroundColor: "#FF6C00",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    // color: "#FFFFFF",
    color: "#BDBDBD",
  },

  trashButton: {
    // fles: 1,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    // backgroundColor: "#FF6C00",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  input: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
  },
});
