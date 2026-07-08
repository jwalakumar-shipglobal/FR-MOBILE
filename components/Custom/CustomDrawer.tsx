import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import {
  Box,
  Calculator,
  FileText,
  Handshake,
  Layers3,
  LayoutDashboard,
  Lock,
  Package,
  User,
  Users,
  Wallet,
} from "lucide-react-native";
import { Text, View } from "react-native";

export default function CustomDrawer(props: any) {
  const pathname = usePathname();

  const drawerMenus = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      route: "/(root)/(drawer)/(tabs)/dashboard",
    },
    {
      title: "Orders",
      icon: Package,
      route: "/(root)/(drawer)/(tabs)/order",
    },
    {
      title: "Multibox",
      icon: Box,
      route: "/(root)/(drawer)/(tabs)/multibox",
    },
    {
      title: "Customers",
      icon: Users,
      route: "/(root)/(drawer)/(tabs)/customers",
    },
    {
      title: "Rate Calculator",
      icon: Calculator,
      route: "/rate-calculator",
    },
    {
      title: "Wallet",
      icon: Wallet,
      route: "/wallet",
    },
    {
      title: "Bulk Report",
      icon: Layers3,
      route: "/bulk-report",
    },
    {
      title: "Documents",
      icon: FileText,
      route: "/documents",
    },
    {
      title: "Agreement Center",
      icon: Handshake,
      route: "/agreement-center",
    },
  ];

  const settingsMenus = [
    {
      title: "Profile",
      icon: User,
      route: "/(root)/(drawer)/profile",
    },
    {
      title: "Password",
      icon: Lock,
      route: "/(root)/(drawer)/settings",
    },
  ];

  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        {drawerMenus.map((item) => {
          const isActive = pathname.startsWith(item.route);
          return (
            <DrawerItem
              key={item.title}
              label={item.title}
              focused={isActive}
              activeTintColor="#F97316"
              inactiveTintColor="#64748B"
              activeBackgroundColor="#FFF7ED"
              icon={({ color, size }) => (
                <item.icon color={color} size={size} />
              )}
              onPress={() => {
                router.replace(item.route as any);
                props.navigation.closeDrawer();
              }}
            />
          );
        })}
        {settingsMenus.map((item) => {
          const isActive = pathname.startsWith(item.route);
          return (
            <DrawerItem
              key={item.title}
              label={item.title}
              focused={isActive}
              activeTintColor="#F97316"
              inactiveTintColor="#64748B"
              activeBackgroundColor="#FFF7ED"
              icon={({ color, size }) => (
                <item.icon color={color} size={size} />
              )}
              onPress={() => {
                router.push(item.route as any);
                props.navigation.closeDrawer();
              }}
            />
          );
        })}
      </DrawerContentScrollView>

      <View className="border-t border-gray-500 flex-row items-center  gap-x-3 p-4 bg-blue-900">
        <Text className="bg-rose-500 text-white font-semibold p-3 rounded-full">
          JK
        </Text>
        <View className="flex-1">
          <Text className="font-semibold text-white">Jwala Kumar</Text>
          <Text className="text-gray-300 text-xs">jwala@gmail.com</Text>
        </View>
      </View>
    </View>
  );
}
