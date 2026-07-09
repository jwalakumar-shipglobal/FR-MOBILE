import SubPageLayout from "@/app/layout/subPageLayout";
import ReusableButton from "@/components/Element/AllButton";
import PassInput from "@/components/Element/AllInput";
import CardUI from "@/components/Element/CardUi";
import { changePassdefault, changePassSchema } from "@/Schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { LockKeyhole } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import z from "zod";

export default function changePassword() {
  const ChangePasswordForm = useForm<z.infer<typeof changePassSchema>>({
    resolver: zodResolver(changePassSchema),
    defaultValues: changePassdefault,
  });

  console.log(router.canGoBack());

  return (
    <SubPageLayout className="flex-1 justify-center bg-gray-100 px-5">
      <CardUI
        className="w-full rounded-2xl bg-white p-6 shadow-md"
        content={
          <View className="gap-y-6">
            <View className="items-center">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <LockKeyhole size={30} color="#1D4ED8" />
              </View>
              <Text className="mt-4 text-2xl font-bold text-blue-900">
                Change Password
              </Text>
              <Text className="mt-2 text-center text-gray-500">
                Create a strong password to keep your account secure.
              </Text>
            </View>
            <View className="gap-y-3">
              <PassInput
                label="Current Password"
                required
                placeholder="Enter current password"
                name="curr_password"
                form={ChangePasswordForm}
              />
              <PassInput
                label="New Password"
                required
                placeholder="Enter new password"
                name="new_password"
                form={ChangePasswordForm}
              />
              <PassInput
                label="Confirm Password"
                required
                placeholder="Confirm new password"
                name="confirm_password"
                form={ChangePasswordForm}
              />
            </View>
            {/* <View className="rounded-xl bg-blue-50 p-4">
              <Text className="font-semibold text-blue-900">
                Password Requirements
              </Text>
              <Text className="mt-2 text-sm text-gray-600">
                • Minimum 8 characters
              </Text>
              <Text className="text-sm text-gray-600">
                • At least one uppercase letter
              </Text>
              <Text className="text-sm text-gray-600">
                • At least one number
              </Text>
              <Text className="text-sm text-gray-600">
                • At least one special character
              </Text>
            </View> */}
            <View className="gap-y-3">
              <ReusableButton title="Change Password" />
              <ReusableButton
                title="Cancel"
                className="border border-blue-700 bg-white"
                textClassName="text-blue-700"
                onPress={() => router.back()}
              />
            </View>
          </View>
        }
      />
    </SubPageLayout>
  );
}
