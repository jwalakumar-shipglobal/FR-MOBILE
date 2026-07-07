import React, { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";

interface PrivateLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PrivateLayout({
  children,
  className,
}: PrivateLayoutProps) {
  return (
    <SafeAreaView className="bg-gray-100">
      <View>
        <Header />
      </View>
      <ScrollView>
        <View className={`${className} mb-10`}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
