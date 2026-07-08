import PrivateLayout from "@/app/layout/privateLayout";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

export default function Order() {
  return (
    <PrivateLayout className="px-2 py-2">
      <View className="flex-row items-center justify-between border-b pb-3 border-gray-400 ">
        <Text className="text-3xl font-semibold">Order</Text>
        <Button
          className="bg-blue-900"
          onPress={() => {
            router.push("/Order/single-order");
          }}
        >
          <Plus color={"white"} size={15} />
          <Text className="text-white">Add Order</Text>
        </Button>
      </View>
      <Button
        className="bg-transparent border border-blue-500"
        onPress={() => {
          router.push({
            pathname: "/ViewOrder/[orderId]",
            params: {
              orderId: "6218050",
            },
          });
        }}
      >
        <Text className="text-blue-500">View Order</Text>
      </Button>
    </PrivateLayout>
  );
}
