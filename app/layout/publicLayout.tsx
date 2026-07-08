import React, { ReactNode } from "react";
import { Image, ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface publicLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PublicLayout({
  children,
  className,
}: publicLayoutProps) {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/SG-Public-BackGround.jpg")}
        resizeMode="cover"
        className="h-full flex items-center gap-y-10 px-4 pt-24"
      >
        <View className="w-full flex items-center justify-center">
          <Image
            source={require("../../assets/images/SG-PUBLIC-LOGO.png")}
            className="w-64 h-14"
            resizeMode="contain"
          />
        </View>
        <View className={`${className}`}>{children}</View>
      </ImageBackground>
    </SafeAreaView>
  );
}
