import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { ReactNode } from "react";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// export const scrollRef = useRef<ScrollView>(null);

export default function SubPageLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <SafeAreaView className="bg-gray-100">
        <View className="h-12 flex-row items-center justify-between pe-3 border-b border-gray-400 bg-white">
          <Button
            onPress={() => {
              router.back();
            }}
            className="bg-transparent"
          >
            <ChevronLeft size={25} color={"black"} />
          </Button>
          <Image
            source={require("../assets/images/SG-PUBLIC-LOGO.png")}
            resizeMode="contain"
            className="h-13 w-28 -mt-2"
          />
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View className={`${className} mb-10`}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
