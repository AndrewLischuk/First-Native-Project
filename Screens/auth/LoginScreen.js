import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOptions";

const INITIAL_STATE = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const { email, password } = state;

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
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    if (!email || password.length < 8) {
      return Alert.alert("Помилка", "Заповніть всі поля", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    setIsKeyboardShown(false);
    Keyboard.dismiss();
    dispatch(authSignInUser({ password, email }));
    setState(INITIAL_STATE);
  };

  return (
    <TouchableWithoutFeedback onPress={onCloseKeyboard}>
      <View style={st.container}>
        <ImageBackground
          source={require("../../assets/imageBg.png")}
          style={st.imgBg}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{ ...st.form, marginTop: isKeyboardShown ? 280 : 325 }}
            >
              <View style={st.formTitle}>
                <Text style={st.formTitleText}>Увійти</Text>
              </View>
              <View style={st.inpWrapper}>
                <TextInput
                  value={state.email}
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
                  style={st.input}
                  value={state.password}
                  onFocus={() => setIsKeyboardShown(true)}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, password: value }))
                  }
                  onSubmitEditing={onCloseKeyboard}
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
                <Text style={st.btnTitle}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Реєстрація")}
                style={st.ref}
              >
                <Text style={st.refTitle}>Немає аккаунта? Зареєструватися</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
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
    paddingBottom: 200,
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formTitle: {
    marginTop: 32,
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
    fontSize: 16,
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
    marginTop: 16,
    alignItems: "center",
  },
  refTitle: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
});
