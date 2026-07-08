import CardUI from "@/components/Blocks/CardUi";
import ReusableButton from "@/components/Element/AllButton";
import PassInput, { BasicInput } from "@/components/Element/AllInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import LoginSchema from "../../Schema/authSchema";
import { postPublic } from "../../Service/apiService";
import PublicLayout from "../layout/publicLayout";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const loginForm = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmitHandler(data: any) {
    if (!data.email && !data.password) return;
    try {
      setLoading(true);
      setError(false);
      const LoginPayLoad = {
        email: data.email,
        password: data.password,
      };
      const res = await postPublic("/auth/login", LoginPayLoad);
      const token = res?.data?.token_details?.token;
      if (!token) {
        setError(true);
        return;
      }
      await SecureStore.setItemAsync("token", token);
      router.replace("/");
      Toast.show({
        type: "success",
        text1: "Login Successful",
      });
    } catch (error: any) {
      console.log(error);
      setError(true);
    }
  }

  return (
    <PublicLayout className="w-full">
      <CardUI
        className="pb-10"
        content={
          <>
            <View>
              <Text className="text-blue-900 text-4xl font-semibold text-center">
                Login
              </Text>
            </View>
            <View className="w-full">
              <View className="w-full flex flex-col gap-y-5">
                <BasicInput
                  placeholder="Enter Email ID..."
                  label="Email"
                  required="true"
                  name="email"
                  form={loginForm}
                />
                <PassInput
                  placeholder="Enter Password..."
                  label="Password"
                  required
                  name="password"
                  form={loginForm}
                />
                {error && (
                  <Text className="text-xs font-medium text-destructive">
                    Wrong email or password. Try again
                  </Text>
                )}
                <Link
                  href={{
                    pathname: "/forgot-password",
                  }}
                  className="-mt-3"
                >
                  <Text className="font-semibold text-blue-900">
                    Forgot Password
                  </Text>
                </Link>
              </View>
              <View className="w-full mt-5">
                <ReusableButton
                  title="Submit"
                  loading={loading}
                  onPress={loginForm.handleSubmit(onSubmitHandler)}
                />
              </View>
            </View>
          </>
        }
      />
    </PublicLayout>
  );
}
