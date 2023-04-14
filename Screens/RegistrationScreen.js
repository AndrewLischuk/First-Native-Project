import { useState } from "react";
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

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

export const RegistrationScreen = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const keyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };
  const sendData = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
    console.log(state);
    setState(INITIAL_STATE);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={st.container}>
        <ImageBackground
          source={require("../assets/imageBg.png")}
          style={st.imgBg}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...st.form,
                marginTop: isKeyboardShown ? 120 : 260,
              }}
            >
              <View style={st.formTitle}>
                <Text style={st.formTitleText}>Регистрация</Text>
              </View>

              <View style={st.inpWrapper}>
                <TextInput
                  value={state.name}
                  onFocus={() => setIsKeyboardShown(true)}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, name: value }))
                  }
                  onSubmitEditing={sendData}
                  style={st.input}
                  placeholder="Логин"
                />
              </View>
              <View style={st.inpWrapper}>
                <TextInput
                  value={state.email}
                  onFocus={() => setIsKeyboardShown(true)}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, email: value }))
                  }
                  onSubmitEditing={sendData}
                  style={st.input}
                  placeholder="Адрес электронной почты"
                />
              </View>
              <View style={st.inpWrapper}>
                <TextInput
                  value={state.password}
                  onFocus={() => setIsKeyboardShown(true)}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, password: value }))
                  }
                  onSubmitEditing={sendData}
                  style={st.input}
                  placeholder="Пароль"
                  secureTextEntry={true}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={sendData}
                style={st.btn}
              >
                <Text style={st.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => keyboardHide()}
                style={st.ref}
              >
                <Text style={st.refTitle}>Уже есть аккаунт? Войти</Text>
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
    // alignItems: "center",
  },
  form: {
    // flex: 1,
    marginTop: 260,
    justifyContent: "flex-start",
    // height: 550,
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formTitle: {
    marginTop: 92,
    marginBottom: 16,
    alignItems: "center",
  },
  formTitleText: {
    fontSize: 30,
    fontWeight: 500,
    color: "#212121",
  },
  inpWrapper: { marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    padding: 16,
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
    fontWeight: 400,
    color: "#fff",
  },
  ref: {
    paddingBottom: 80,
    marginTop: 16,
    alignItems: "center",
  },
  refTitle: { fontSize: 16, fontWeight: 400, color: "#1B4371" },
});
