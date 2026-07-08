import React, { ReactNode } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
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
        source={require("../assets/images/SG-Public-BackGround.jpg")}
        resizeMode="cover"
        className="flex-1 items-center gap-y-10 px-4"
      >
        <View className="w-full flex items-center justify-center">
          <Image
            source={require("../assets/images/SG-PUBLIC-LOGO.png")}
            className="w-2/3 h-20 mt-10"
            resizeMode="contain"
          />
        </View>
        <View className={`${className}`}>{children}</View>
      </ImageBackground>
    </SafeAreaView>
  );
}
