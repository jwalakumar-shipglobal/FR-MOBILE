import PassInput, { BasicInput } from "@/components/Element/AllInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import LoginSchema from "../../(Schema)/authSchema";
import { postPublic } from "../../Service/apiService";
import PublicLayout from "../../layout/publicLayout";

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
      <Card className="w-full bg-white border-transparent shadow-lg">
        <CardHeader className="text-blue-900 text-4xl font-semibold text-center">
          <CardTitle className="text-blue-900 text-center text-4xl">
            Login
          </CardTitle>
        </CardHeader>
        <View className="w-full">
          <CardContent className="w-full flex flex-col gap-y-5">
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
          </CardContent>
          <CardFooter className="w-full mt-5">
            <Button
              className="w-full bg-blue-900 disabled:opacity-70"
              onPress={loginForm.handleSubmit(onSubmitHandler)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold">Submit</Text>
              )}
            </Button>
          </CardFooter>
        </View>
      </Card>
    </PublicLayout>
  );
}
