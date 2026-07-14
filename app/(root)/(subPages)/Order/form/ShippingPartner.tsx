import { ShipperRatesProps } from "@/interface/order";
import { OrdersData } from "@/Zustand/useStore";
// import { OrdersDeatils } from "@/app/Zustand/useStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from "lucide-react-native";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

export default function ShippingPartner({
  shiperRates,
  setActiveState,
}: {
  shiperRates: ShipperRatesProps | null;
  setActiveState: (data: number) => void;
}) {
  const setActiveStep = OrdersData((state: any) => state.setActiveState);
  const orderdetail = OrdersData((state: any) => state.ordersDeatils);
  const setOrderdetails = OrdersData((state: any) => state.addOrderDetails);

  return (
    <View className="py-3 px-2">
      <View className="flex-col gap-y-3 justify-center items-center">
        <View className="bg-gray-100 h-20 w-40 flex items-center justify-center border border-gray-300 rounded-lg">
          <Text className="text-center">
            {shiperRates?.package_weight ?? 0 / 1000} KG
          </Text>
          <Text className="text-center">Dead Weight</Text>
        </View>
        <View className="bg-gray-100 h-20 w-40 flex items-center justify-center border border-gray-300 rounded-lg">
          <Text className="text-center">
            {shiperRates?.volume_weight ?? 0 / 1000} KG
          </Text>
          <Text className="text-center">Volumetric Weight</Text>
        </View>
        <View className="bg-orange-300/50 h-20 w-40 flex items-center justify-center border border-orange-500 rounded-lg">
          <Text className="text-center text-orange-500 font-semibold">
            {shiperRates?.bill_weight ?? 0 / 1000} KG
          </Text>
          <Text className="text-center text-orange-500 font-semibold">
            Billed Weight
          </Text>
        </View>
      </View>
      <Text className="px-2 py-3 font-semibold text-lg">Showing 2 Results</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="w-max px-2">
          <View className="flex-row gap-x-3 items-center border border-gray-300 rounded-lg bg-gray-100 p-2">
            <Text className="max-w-56 font-semibold text-gray-500">
              Courier Partner
            </Text>
            <Text className="max-w-36 font-semibold text-gray-500">
              Delivery Time
            </Text>
            <Text className="max-w-24 font-semibold text-gray-500">
              Shipment Rate
            </Text>
            <Text className="max-w-20 font-semibold text-gray-500">Select</Text>
          </View>
          <View className="my-3">
            <FlatList
              data={shiperRates?.rate}
              renderItem={({ item }) => (
                <Card className="border border-gray-300 rounded bg-white -py-3 mb-3">
                  <CardHeader className="bg-blue-200 rounded-t px-2">
                    <CardTitle className="text-xs text-red-500 font-normal">
                      Duties will be charged, if applicable.
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-row items-center gap-x-3 px-2 justify-between -mt-3 pb-3">
                    <Text className="max-w-56 min-w-24 font-semibold text-gray-500 flex items-center">
                      {item?.display_name}
                    </Text>
                    <Text className="max-w-36 min-w-20 font-semibold text-gray-500 flex items-center">
                      {item?.transit_time}
                    </Text>
                    <Text className="max-w-24 min-w-16 font-semibold text-gray-500 flex items-center">
                      Rs. {item?.rate ?? 0}
                    </Text>
                    <Button className="max-w-20 min-w-10 font-semibold text-gray-500 flex items-center">
                      <CircleCheck color={"gray"} />
                    </Button>
                  </CardContent>
                </Card>
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
