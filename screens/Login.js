import { View, Text, Image, Alert, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import Input from "../components/Input";
import Button from "../components/Button";
import { signIn } from "../utils/actions/authActions";
import { useDispatch} from "react-redux"

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? "example@gmail.com" : "",
    password: isTestMode ? "**********" : "",
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const Login = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const dispatch = useDispatch()

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    try {
        setIsLoading(true)
        const action = signIn(
            formState.inputValues.email,
            formState.inputValues.password
        )
        await dispatch(action)
        setError(null)
        Alert.alert("Login successful","Successfully signed")
        setIsLoading(false)
    } catch (error) {
        console.log(error)
        setIsLoading(false)
        setError(error.message)
    }
}

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error);
    }
  }, [error]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
            marginLeft: - 22,
            marginBottom: 6
          }}
        />
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Sign In</Text>
        <Text style={{ ...FONTS.body2, color: COLORS.gray }}>
        Sign in now to acces your excercises and saved music.
        </Text>
        <View style={{ marginVertical: 22 }}>
          <Input
            id="email"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities["email"]}
            placeholder="Email Address"
            placeholderTextColor={COLORS.gray}
            keyboardType="email-address"
          />
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities["password"]}
            autoCapitalize="none"
            id="password"
            placeholder="Password"
            placeholderTextColor={COLORS.gray}
            secureTextEntry={true}
          />
          <Button
            title="LOGIN"
            onPress={authHandler}
            isLoading={isLoading}
            style={{
              width: SIZES.width - 32,
              marginVertical: 8,
            }}
          />
          <View
            style={styles.bottomContainer}>
            <Text style={{ ...FONTS.body3, color: COLORS.white }}>
              Don't have an account ? {" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Image source={images.cover} resizeMode="contain" style={styles.cover} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  cover: {
    width: SIZES.width,
    position: "absolute",
    bottom: 0,
  },
});

export default Login;
