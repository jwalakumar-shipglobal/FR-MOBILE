import useProfileDetails from "@/Zustand/useStore";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { CircleQuestionMark, Lock, LogOut, User } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
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
import { Separator } from "./ui/separator";

export default function Header() {
  // const [profileDeatils, setProfileDetails] = useState<any>(null);
  const [logoutPopup, setLogoutPopup] = useState<boolean>(false);
  const balance = useProfileDetails((state: any) => state.balance ?? 0);
  const profileData = useProfileDetails((state: any) => state.profiledata);

  const profile = (profileData ?? {}) as {
    firstname?: string;
    lastname?: string;
    email?: string;
  };
  const firstInitial = profile.firstname?.charAt(0) ?? "";
  const lastInitial = profile.lastname?.charAt(0) ?? "";
  const displayName =
    [profile.firstname, profile.lastname].filter(Boolean).join(" ") || "User";
  const displayEmail = profile.email ?? "";

  return (
    <View className="w-full h-14 flex-row items-center justify-between px-3 border-b bg-white border-gray-300">
      <View>
        <Image
          source={require("../assets/images/SG-PUBLIC-LOGO.png")}
          resizeMode="contain"
          className="h-14 w-28"
        />
        <Logout logoutPopup={logoutPopup} setLogoutPopup={setLogoutPopup} />
      </View>

      <View className="flex-row gap-x-2 justify-center items-center">
        <View className="">
          <Text className="font-semibold">₹{balance}</Text>
        </View>
        <Separator orientation="vertical" className="bg-gray-700" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="border rounded-full bg-rose-700 border-transparent"
            >
              <Text className="text-white">
                {firstInitial}
                {lastInitial}
              </Text>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={2}
            className="w-56 bg-white border-transparent"
            align="start"
          >
            <DropdownMenuLabel>
              <View className="flex-row items-center gap-x-3">
                <View className="bg-rose-700 rounded-full h-10 w-9 flex items-center justify-center">
                  <Text className="text-white">
                    {firstInitial}
                    {lastInitial}
                  </Text>
                </View>
                <Separator orientation="vertical" className="" />
                <View>
                  <Text className="w-32">{displayName}</Text>
                  <Text className="font-semibold text-xs text-gray-500">
                    {displayEmail}
                  </Text>
                </View>
              </View>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-500" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className=""
                onPress={() => {
                  router.push("/profile");
                }}
              >
                <User size={16} color={"gray"} />
                <Text className="text-gray-500 font-semibold">Profile</Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Lock size={16} color="gray" />
                <Text className="text-gray-500 font-semibold">
                  Change Password
                </Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut size={16} color="gray" />
                <Text className="text-gray-500 font-semibold">
                  Logout all other devices
                </Text>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-500" />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleQuestionMark size={16} color={"gray"} />
                <Text className="font-semibold text-gray-500">
                  Resource Center
                </Text>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-500" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                closeOnPress={false}
                onPress={() => {
                  setLogoutPopup(true);
                }}
              >
                <LogOut size={16} color={"gray"} />
                <Text className="font-semibold text-gray-500">Sign Out</Text>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
    SecureStore.deleteItemAsync("token");
    router.replace("/login");
    Toast.show({
      type: "success",
      text1: "Logout Successful",
    });
  }

  return (
    <View className="flex-1 items-center justify-center">
      <AlertDialog open={logoutPopup} onOpenChange={setLogoutPopup}>
        <AlertDialogContent className="bg-white border-transparent shadow-xl shadow-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-black">
              Are You Sure You Want to Log Out..?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-800">
              You will need to sign in again to access your account and continue
              using the app.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row items-center justify-end">
            <AlertDialogCancel
              className="bg-white border-white px-5"
              onPress={() => {
                setLogoutPopup(false);
                router.replace("/dashboard");
              }}
            >
              <Text className="text-black">Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction onPress={Logouthandel} className="bg-black px-5">
              <Text className="text-white">Logout</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}
