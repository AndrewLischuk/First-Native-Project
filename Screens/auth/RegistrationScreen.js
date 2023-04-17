import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { authSignUpUser } from "../../redux/auth/authOptions";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [image, setImage] = useState(null);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const { name, email, password } = state;

  const dispatch = useDispatch();

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

  const onCloseKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    if (!email || password.length < 8 || !name) {
      return Alert.alert("Помилка", "Заповніть всі поля", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    dispatch(authSignUpUser({ name, password, email, image }));

    setIsKeyboardShown(false);
    Keyboard.dismiss();
    setState(INITIAL_STATE);
  };

  const addImages = async () => {
    try {
      const picked = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
      if (!picked.uri) {
        return;
      }
      setImage(picked.uri);
      console.log(picked.uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onCloseKeyboard}>
      <View style={st.container}>
        <ImageBackground
          source={require("../../assets/imageBg.png")}
          style={st.imgBg}
        >
          <SafeAreaView
            style={{ ...st.form, marginTop: isKeyboardShown ? 150 : 260 }}
          >
            <View style={st.userImgBox}>
              <Image source={{ uri: image }} style={st.userImg} />
              <TouchableOpacity
                style={
                  image
                    ? st.inputLodoBtn
                    : { ...st.inputLodoBtn, borderColor: "#FF6C00" }
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

            <View style={st.formTitle}>
              <Text style={st.formTitleText}>Реєстрація</Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={st.inpWrapper}>
                <TextInput
                  value={name}
                  onFocus={() => setIsKeyboardShown(true)}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, name: value }))
                  }
                  onSubmitEditing={onCloseKeyboard}
                  style={st.input}
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                />
              </View>
              <View style={st.inpWrapper}>
                <TextInput
                  value={email}
                  onFocus={() => setIsKeyboardShown(true)}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, email: value }))
                  }
                  onSubmitEditing={onCloseKeyboard}
                  style={st.input}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                />
              </View>
              <View style={st.inpWrapper}>
                <TextInput
                  value={password}
                  onFocus={() => setIsKeyboardShown(true)}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, password: value }))
                  }
                  onSubmitEditing={onCloseKeyboard}
                  style={st.input}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  placeholderTextColor="#BDBDBD"
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onSubmit}
                style={st.btn}
              >
                <Text style={st.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Логін")}
                style={st.ref}
              >
                <Text style={st.refTitle}>Вже є аккаунт? Увійти</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  imgBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
  },
  form: {
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  formTitle: {
    marginTop: 92,
    marginBottom: 16,
    alignItems: "center",
  },
  formTitleText: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Bold",
  },
  inpWrapper: { marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    padding: 10,
    fontFamily: "Roboto-Regular",
  },
  btn: {
    marginTop: 32,
    backgroundColor: "#FF6C00",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: "center",
  },
  btnTitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Roboto-Regular",
  },
  ref: {
    paddingBottom: 150,
    marginTop: 16,
    alignItems: "center",
  },
  refTitle: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
});
