import logOutallDeviceService, {
  LogoutService,
} from "@/Service/AppService/Auth";
import useProfileDetails from "@/Zustand/useStore";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  CircleQuestionMark,
  Lock,
  LogOut,
  User,
  Wallet,
} from "lucide-react-native";
import React, { ReactNode, useState } from "react";
import { Image, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import AppAlertDialog from "./Element/AlertDialogUI";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const balance = useProfileDetails((state: any) => state.balance ?? 0);

  const profileData = useProfileDetails((state: any) => state.profiledata);

  const profile = (profileData ?? {}) as {
    firstname?: string;
    lastname?: string;
    email?: string;
  };

  const firstInitial = profile.firstname?.charAt(0)?.toUpperCase() ?? "";
  const lastInitial = profile.lastname?.charAt(0)?.toUpperCase() ?? "";

  return (
    <View className="h-16 flex-row items-center bg-white px-3 border-b border-slate-200 rounded-b-lg">
      <Image
        source={require("../assets/images/SG-PUBLIC-LOGO.png")}
        resizeMode="contain"
        className="h-12 w-32"
      />
      <View className="flex-1 flex-row justify-end items-center gap-x-2">
        <View className="flex-row items-center rounded-full bg-blue-50 px-4 py-2">
          <Wallet size={18} color="#1d4ed8" />
          <Text className="ml-2 font-bold text-blue-900">₹ {balance}</Text>
        </View>
        <View>
          <ProfileDropdown
            dropTrigger={
              <Button className="h-11 w-11 rounded-full bg-blue-900">
                <Text className="text-xs font-semibold text-white">
                  {firstInitial}
                  {lastInitial}
                </Text>
              </Button>
            }
          />
        </View>
      </View>
    </View>
  );
}

export function Logout({
  logoutPopup,
  setLogoutPopup,
}: {
  setLogoutPopup: (data: boolean) => void;
  logoutPopup: boolean;
}) {
  async function Logouthandel() {
    try {
      await LogoutService();
      await SecureStore.deleteItemAsync("token");
      router.replace("/login");
      Toast.show({
        type: "success",
        text1: "Logout Successful",
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      Toast.show({
        type: "error",
        text1: message,
      });
    }
  }

  return (
    <View className="flex-1 items-center justify-center">
      <AppAlertDialog
        open={logoutPopup}
        onOpenChange={setLogoutPopup}
        title="Logout"
        description="Are you sure you want to log out? You will need to sign in again to continue using the application."
        actionText="Logout"
        cancelText="Cancel"
        onAction={Logouthandel}
        onCancel={() => {
          setLogoutPopup(false);
          router.replace("/dashboard");
        }}
        contentClassName="bg-white rounded-3xl border-0 px-6 py-7"
        titleClassName="text-center text-2xl font-bold text-slate-900"
        descriptionClassName="text-center text-gray-500 mt-2 leading-6"
        footerClassName="mt-6"
        actionClassName="bg-red-600 w-full"
        cancelClassName="bg-blue-900"
        cancelTextClassName="text-white"
        body={
          <View className="items-center mt-2">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <LogOut size={38} color="#dc2626" />
            </View>
          </View>
        }
      >
        <View />
      </AppAlertDialog>
    </View>
  );
}

interface ProfileDropdownProps {
  dropTrigger: ReactNode;
}

export function ProfileDropdown({ dropTrigger }: ProfileDropdownProps) {
  const [logoutPopup, setLogoutPopup] = useState(false);

  const profileData = useProfileDetails((state: any) => state.profiledata);

  const profile = (profileData ?? {}) as {
    firstname?: string;
    lastname?: string;
    email?: string;
  };

  const firstInitial = profile.firstname?.charAt(0)?.toUpperCase() ?? "";
  const lastInitial = profile.lastname?.charAt(0)?.toUpperCase() ?? "";

  const displayName =
    [profile.firstname, profile.lastname].filter(Boolean).join(" ") || "User";

  const displayEmail = profile.email ?? "";

  async function LogoutOtherDevice() {
    try {
      const res = await logOutallDeviceService();
      Toast.show({
        type: "success",
        text1: res.message || "Logged out from all other devices.",
      });
    } catch (error: any) {
      const message = error.message || "SomeThings is Error";
      console.log(message);
      Toast.show({
        type: "error",
        text1: message,
      });
    }
  }

  return (
    <View>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{dropTrigger}</DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={0}
          className="w-72 rounded-2xl border border-slate-300 bg-white p-2"
        >
          <DropdownMenuLabel>
            <View className="flex-row items-center rounded-lg border border-blue-500 bg-blue-100 p-3">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-blue-900">
                <Text className="text-lg font-bold text-white">
                  {firstInitial}
                  {lastInitial}
                </Text>
              </View>
              <View className="ml-3 flex-1">
                <Text
                  numberOfLines={1}
                  className="text-base font-bold text-slate-900"
                >
                  {displayName}
                </Text>
                <Text numberOfLines={1} className="mt-1 text-xs text-slate-500">
                  {displayEmail}
                </Text>
              </View>
            </View>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-200" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="rounded-xl py-3"
              onPress={() => router.push("/(root)/(subPages)/profile")}
            >
              <User size={18} color="#2563eb" />
              <Text className="font-medium text-slate-700">Profile</Text>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-xl py-3"
              onPress={() =>
                router.push("/(root)/(subPages)/(Password)/change-password")
              }
            >
              <Lock size={18} color="#2563eb" />
              <Text className="font-medium text-slate-700">
                Change Password
              </Text>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-xl py-3"
              onPress={LogoutOtherDevice}
            >
              <LogOut size={18} color="#2563eb" />
              <Text className="font-medium text-slate-700">
                Logout Other Devices
              </Text>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-slate-200" />
          <DropdownMenuGroup>
            <DropdownMenuItem className="rounded-xl py-3">
              <CircleQuestionMark size={18} color="#2563eb" />
              <Text className="font-medium text-slate-700">
                Resource Center
              </Text>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-slate-200" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              closeOnPress={false}
              className="rounded-xl py-3"
              onPress={() => setLogoutPopup(true)}
            >
              <LogOut size={18} color="#dc2626" />
              <Text className="font-semibold text-red-600">Sign Out</Text>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Logout logoutPopup={logoutPopup} setLogoutPopup={setLogoutPopup} />
    </View>
  );
}
