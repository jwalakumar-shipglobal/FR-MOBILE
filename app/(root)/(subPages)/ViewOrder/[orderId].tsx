import SubPageLayout from "@/app/layout/subPageLayout";
import CardUI from "@/components/Blocks/CardUi";
import BreadCumb from "@/components/Element/BreadCumb";
import { Button } from "@/components/ui/button";
import { useLocalSearchParams } from "expo-router";
import { MapPin } from "lucide-react-native";
import { Text, View } from "react-native";
import OrderDetails from "./viewOrderComponent/OrderDetails";
import BilledDetails from "./viewOrderComponent/BilledDeatails";
import OrderSummary from "./viewOrderComponent/OrderSummary";

export default function ViewOrder() {
  const { orderId } = useLocalSearchParams();

  console.log(orderId);

  return (
    <SubPageLayout className="px-3 flex gap-y-2">
      <View className="w-full flex-row justify-between items-center *:w-[50%] ">
        <BreadCumb
          pageTitle="View Order"
          firstStep="All Orders"
          secondStep="View Order"
        />
        <Button className="border border-blue-700">
          <Text className="text-blue-700 px-3">Back</Text>
        </Button>
      </View>
      <CardUI
        content={
          <View className="flex-col gap-2">
            <View className="flex-row gap-x-3">
              <MapPin color="green" />
              <View className="flex-1">
                <Text className="font-bold">Consignor Address</Text>
                <Text className="text-xs">Firstname_54470 Lastname_54470 | +91 9999954470</Text>
                <Text className="text-gray-500 text-xs">
                  Address 123, Kaushambi, Uttar pradesh, 212507
                </Text>
              </View>
            </View>
            <View className="flex-row gap-x-3">
              <MapPin color="red" />
              <View className="flex-1">
                <Text className="font-bold text-sm">Consignee Address</Text>
                <Text className="text-xs">Firstname_6218050 Lastname_6218050 | 9999999999</Text>
                <Text className="text-gray-500 text-xs">
                  Nylanders service ab,, Nygatan 24, Ornskoldsvik, Not
                  applicable, Sweden, 89134
                </Text>
              </View>
            </View>
          </View>
        }
      />
      <OrderDetails />
      <BilledDetails />
      <OrderSummary />
    </SubPageLayout>
  );
}
