import { drawerMenus, settingsMenus } from "@/lib/Mock/SidebarMenu";
import useProfileDetails from "@/Zustand/useStore";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { EllipsisVertical } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { Button } from "../ui/button";

export default function CustomDrawer(props: any) {
  const pathname = usePathname();

  const profileData = useProfileDetails((state: any) => state.profiledata);

  const profile = (profileData ?? {}) as {
    firstname?: string;
    lastname?: string;
    email?: string;
  };
  const firstInitial = profile.firstname?.toLocaleUpperCase().charAt(0) ?? "";
  const lastInitial = profile.lastname?.toLocaleUpperCase().charAt(0) ?? "";
  const displayName =
    [profile.firstname, profile.lastname].filter(Boolean).join(" ") || "User";
  const displayEmail = profile.email ?? "";

  return (
    <View className="flex-1">
      <View className="px-5 pt-8 pb-3 border-b border-gray-200">
        <Image
          source={require("../../assets/images/SG-PUBLIC-LOGO.png")}
          resizeMode="contain"
          className="h-12 w-36"
        />
      </View>
      <DrawerContentScrollView
        {...props}
        safeAreaInsets={{
          top: 0,
          bottom: 0,
        }}
        contentContainerStyle={{ paddingTop: 13 }}
      >
        <View className="flex-col gap-y-2">
          {drawerMenus.map((item, idx) => {
            const isActive = pathname === item.path;
            return (
              <Pressable
                onPress={() => {
                  router.replace(item.href as any);
                  props.navigation.closeDrawer();
                }}
                key={idx}
                className={`flex-row items-center gap-x-2 p-2 mx-2 rounded-lg ${isActive ? "border bg-orange-500/10" : ""} border-orange-400`}
              >
                <item.icon size={20} color={isActive ? "#F97316" : "#9CA3AF"} />
                <Text
                  className={`${isActive ? "text-orange-400 font-bold" : "text-gray-400 font-semibold"}`}
                >
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View>
          {settingsMenus.map((item, idx) => {
            const isActive = pathname === item.path;
            return (
              <Pressable
                key={idx}
                onPress={() => {
                  router.replace(item.href as any);
                  props.navigation.closeDrawer();
                }}
                className={`flex-row items-center gap-x-2 p-2 mx-2 rounded-lg ${isActive ? "border bg-orange-500/10" : ""} border-orange-400`}
              >
                <item.icon size={20} color={isActive ? "#F97316" : "#9CA3AF"} />
                <Text
                  className={`${isActive ? "text-orange-400 font-bold" : "text-gray-400 font-semibold"}`}
                >
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </DrawerContentScrollView>
      <View className="border-t border-blue-800 bg-blue-900 p-4 flex-row items-center">
        <View className="flex-1 flex-row items-center gap-x-3">
          <View className="h-11 w-11 items-center justify-center rounded-lg bg-rose-500">
            <Text className="text-white font-bold">
              {firstInitial + lastInitial}
            </Text>
          </View>
          <View className="max-w-40">
            <Text className="text-white font-semibold text-sm">
              {displayName}
            </Text>
            <Text className="text-blue-100 text-xs">{displayEmail}</Text>
          </View>
        </View>
        <Button size="icon" className="bg-transparent">
          <EllipsisVertical size={20} color="white" />
        </Button>
      </View>
    </View>
  );
}
