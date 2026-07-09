import { cn } from "@/lib/utils";
import { DrawerActions } from "@react-navigation/native";
import { Tabs } from "expo-router";
import {
  LayoutDashboard,
  LayoutGrid,
  Menu,
  Package,
  Users,
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function TabsLayout() {
  const tabs = [
    {
      name: "order",
      title: "Order",
      icon: Package,
    },
    {
      name: "customers",
      title: "Customers",
      icon: Users,
    },
    {
      name: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "multibox",
      title: "Multibox",
      icon: LayoutGrid,
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 55,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 8,
        },
      }}
    >
      {tabs.map(({ name, title, icon: Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => (
              <View
                className={cn(
                  "justify-center items-center rounded-full",
                  focused
                    ? "w-[45px] h-[45px] -mt-5 bg-blue-900 shadow-lg"
                    : "w-7 h-7",
                )}
                style={{
                  shadowColor: "#2563EB",
                  shadowOpacity: focused ? 0.35 : 0,
                  shadowRadius: 10,
                  elevation: focused ? 8 : 0,
                }}
              >
                <Icon
                  size={focused ? 22 : 18}
                  color={focused ? "#fff" : "#6B7280"}
                />
              </View>
            ),
          }}
        />
      ))}

      <Tabs.Screen
        name="menu"
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.dispatch(DrawerActions.openDrawer());
          },
        })}
        options={{
          title: "Menu",
          tabBarIcon: ({ focused }) => (
            <View
              className={cn(
                "justify-center items-center rounded-full",
                focused
                  ? "w-[54px] h-[54px] -mt-5 bg-blue-600"
                  : "w-7 h-7 bg-transparent",
              )}
            >
              <Menu
                size={focused ? 22 : 18}
                color={focused ? "#fff" : "#6B7280"}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
