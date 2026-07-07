import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Image, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import z from "zod";
import { BasicInput } from "../../components/Element/AllInput";
import { postPublic } from "../Service/apiService";
import PublicLayout from "../layout/publicLayout";

export default function Forgotpassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [emailSubmit, setEmailSubmit] = useState<boolean>(false);

  const forgotpasswordSchema = z.object({
    email: z
      .string()
      .nonempty("Enter Email Address")
      .email("Invalid Email Address"),
  });

  const forgotpasswordForm = useForm({
    resolver: zodResolver(forgotpasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmitHandler(data: any) {
    try {
      setLoading(true);
      setError(false);
      setEmailSubmit(false);
      const res = await postPublic("/auth/forgot-password", data);
      if (res) {
        setEmailSubmit(true);
        Toast.show({
          type: "success",
          text1: "Link sent Successfully",
        });
      } else {
        setEmailSubmit(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setEmailSubmit(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicLayout className="w-full">
      {emailSubmit ? (
        <Card className="w-full border-transparent bg-white flex-col gap-y-4 shadow-lg">
          <CardContent className="flex items-center">
            <Image
              source={require("../../assets/images/CheckGreenSuccess.png")}
              resizeMode="contain"
            />
          </CardContent>
          <CardHeader>
            <CardTitle className="text-blue-900 text-2xl font-semibold text-center">
              Link sent Successfully
            </CardTitle>
            <CardDescription className="text-center text-sm">
              Check your email for a link to reset your password. If it doesn't
              appear within a few minutes, check your spam folder.
            </CardDescription>
          </CardHeader>
          <CardFooter className="w-full my-5">
            <Button
              className="bg-blue-900 w-full"
              onPress={() => {
                router.dismissAll();
                router.replace("/login");
              }}
            >
              <Text className="text-center text-white">Return To Login</Text>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full flex-col gap-y-4 bg-white px-3 border-transparent shadow-lg">
          <CardHeader className="text-blue-900 text-2xl font-semibold text-center">
            <CardTitle className="text-center text-black text-2xl font-semibold">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-center text-sm">
              Enter email address associated with your account and you will
              receive an email to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="-px-2">
            <View>
              <BasicInput
                placeholder="Enter Email Id..."
                name="email"
                label="Email"
                required
                form={forgotpasswordForm}
              />
            </View>
            {error && (
              <Text className="text-sm text-red-500 font-semibold -mt-2">
                Email not found
              </Text>
            )}
          </CardContent>
          <CardFooter className="w-full flex-col items-center mt-5 -px-2">
            <Button
              onPress={forgotpasswordForm.handleSubmit(onSubmitHandler)}
              disabled={loading}
              className="disabled:opacity-70 bg-blue-900 w-full"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold">Submit</Text>
              )}
            </Button>
            <Button
              className="my-4"
              onPress={() => {
                router.push("/login");
                setEmailSubmit(false);
              }}
            >
              <Text className="text-center font-semibold text-blue-900 bg-transparent">
                Return to Login
              </Text>
            </Button>
          </CardFooter>
        </Card>
      )}
    </PublicLayout>
  );
}
