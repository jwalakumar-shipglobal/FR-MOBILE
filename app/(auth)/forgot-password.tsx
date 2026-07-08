import CardUI from "@/components/Blocks/CardUi";
import ReusableButton from "@/components/Element/AllButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import z from "zod";
import { BasicInput } from "../../components/Element/AllInput";
import { postPublic } from "../../Service/apiService";
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
        <CardUI
          content={
            <>
              <View className="flex items-center">
                <Image
                  source={require("../../assets/images/CheckGreenSuccess.png")}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text className="text-blue-900 text-2xl font-semibold text-center">
                  Link sent Successfully
                </Text>
                <Text className="text-center text-sm">
                  Check your email for a link to reset your password. If it
                  doesn't appear within a few minutes, check your spam folder.
                </Text>
              </View>
              <View className="w-full my-5">
                <ReusableButton
                  title="Back to Login"
                  className="mt-4"
                  onPress={() => {
                    router.dismissAll();
                    router.replace("/login");
                  }}
                />
              </View>
            </>
          }
        />
      ) : (
        <CardUI
          className="pb-10 pt-7"
          content={
            <>
              <View className="flex gap-y-2">
                <Text className="text-center text-blue-900 text-2xl font-semibold">
                  Forgot Password
                </Text>
                <Text className="text-center text-sm text-gray-500">
                  Enter email address associated with your account and you will
                  receive an email to reset your password.
                </Text>
              </View>
              <View className="-px-2">
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
              </View>
              <View className="w-full flex-col items-center mt-5 -px-2">
                <ReusableButton
                  title="Login"
                  loading={loading}
                  onPress={forgotpasswordForm.handleSubmit(onSubmitHandler)}
                />
                <ReusableButton
                  title="Return to Login"
                  className="mt-4"
                  buttonVariant="outline"
                  onPress={() => {
                    router.push("/login");
                    setEmailSubmit(false);
                  }}
                />
              </View>
            </>
          }
        />
      )}
    </PublicLayout>
  );
}
