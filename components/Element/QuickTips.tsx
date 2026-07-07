import React from "react";
import { Image, Text, View } from "react-native";

export default function QuickTips() {
  return (
    <View className="bg-white rounded py-3 px-3">
      <View>
        <Text className="text-center text-lg font-semibold my-3">
          QuickTips
        </Text>
      </View>
      <View className="flex items-center justify-center">
        <Image
          className="h-28 w-32"
          resizeMode="contain"
          source={require("../../assets/svg/boxsvg.png")}
        />
      </View>
      <View className="flex gap-y-2">
        <Text className="text-base font-semibold">Dead Weight:</Text>
        <Text>
          Dead weight (or dry weight) refers to the actual weight of the package
          in kilograms.
        </Text>
        <Text className="text-base font-semibold">
          Volumetric Weight:(L x W x H / 5000)
        </Text>
        <Text>
          Volumetric Weight (or DIM weight) is calculated based on the
          dimensions of the package. {"\n"} {"\n"} The formula for calculating
          volumetric weight involves multiplying the length, width, and height
          of the package and then dividing by 5000.
        </Text>
        <Text className="text-base font-semibold">Additionally:</Text>
        <Text>
          The higher value between volumetric weight and dead weight will be
          used for freight rate calculation.{"\n"}
          {"\n"} Prices are subject to change based on fuel surcharges and
          courier company base rates.{"\n"}
          {"\n"} The above prices exclude GST.
        </Text>
      </View>
    </View>
  );
}
