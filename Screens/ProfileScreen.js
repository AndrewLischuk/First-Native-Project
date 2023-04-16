import { StyleSheet, Text, View } from "react-native";

export const ProfileScreen = () => {
  return (
    <View style={st.main}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

const st = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
