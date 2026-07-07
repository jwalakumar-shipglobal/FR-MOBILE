import SubPageLayout from "@/app/layout/subPageLayout";
import CardUI from "@/components/Blocks/CardUi";
import BreadCumb from "@/components/Element/BreadCumb";
import { Button } from "@/components/ui/button";
import { useLocalSearchParams } from "expo-router";
import { MapPin, Receipt } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function ViewOrder() {
  const { orderId } = useLocalSearchParams();

  console.log(orderId);

  return (
    <SubPageLayout className="px-3 flex gap-y-3 pb-5">
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
                <Text className="text-xs">
                  Firstname_54470 Lastname_54470 | +91 9999954470
                </Text>
                <Text className="text-gray-500 text-xs">
                  Address 123, Kaushambi, Uttar pradesh, 212507
                </Text>
              </View>
            </View>
            <View className="flex-row gap-x-3">
              <MapPin color="red" />
              <View className="flex-1">
                <Text className="font-bold text-sm">Consignee Address</Text>
                <Text className="text-xs">
                  Firstname_6218050 Lastname_6218050 | 9999999999
                </Text>
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

import {
  Box,
  ChevronUp,
  ClipboardCheck,
  Truck,
  Weight,
} from "lucide-react-native";

function OrderDetails() {
  const orderDetails = [
    {
      id: 1,
      title: "Billed Weight",
      value: "21.801 kg",
      icon: Weight,
      iconColor: "#047857",
      bgColor: "#DCFCE7",
    },
    {
      id: 2,
      title: "Volumetric Wt",
      value: "21.801 kg",
      icon: Weight,
      iconColor: "#D97706",
      bgColor: "#FEF3C7",
    },
    {
      id: 3,
      title: "Dimensions (L x B x H)",
      value: "70 cm x 41 cm x 36 cm",
      icon: Box,
      iconColor: "#EF4444",
      bgColor: "#FEE2E2",
    },
    {
      id: 4,
      title: "Dead Weight",
      value: "16.62 kg",
      icon: Weight,
      iconColor: "#3B82F6",
      bgColor: "#DBEAFE",
    },
    {
      id: 5,
      title: "Shipping Partner",
      value: "ShipGlobal Premium DPD",
      icon: Truck,
      iconColor: "#F97316",
      bgColor: "#FEE2E2",
    },
  ];

  return (
    <View>
      <CardUI
        content={
          <>
            <View className="flex-row justify-between mb-3">
              <View className="flex-row items-center gap-x-2">
                <Text className="bg-blue-500/10 py-1 px-1.5 rounded">
                  <ClipboardCheck color="#3B82F6" />
                </Text>
                <Text className="font-semibold text-base">Order Details</Text>
              </View>
              <Button className="bg-transparent">
                <ChevronUp className="rotate-90" />
              </Button>
            </View>
            <View className="flex-col gap-y-3">
              {orderDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <View
                    key={item.id}
                    className="flex-row items-center rounded-xl border border-slate-200 p-2"
                  >
                    <View
                      style={{ backgroundColor: item.bgColor }}
                      className="h-12 w-12 items-center justify-center rounded-xl"
                    >
                      <Icon size={22} color={item.iconColor} />
                    </View>

                    <View className="ml-4 flex-1">
                      <Text className="text-base font-semibold">
                        {item.title}
                      </Text>
                      <Text className="text-gray-500">{item.value}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        }
      />
    </View>
  );
}

function OrderSummary() {
  const summaryData = [
    {
      title: "Logistic Fee",
      amount: 7832.0,
    },
    {
      title: "Dispute-Weight",
      amount: 314.0,
    },
    {
      title: "Dispute-Other",
      amount: 100.0,
    },
    {
      title: "Global Disruption Adjustment",
      amount: 2100.0,
    },
    {
      title: "GST",
      amount: 1862.28,
    },
  ];

  const subTotal = summaryData.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  return (
    <View>
      <CardUI
        className="bg-orange-300/30 px-0 pb-0"
        content={
          <>
            <View className="px-2 mb-3">
              <Text className="font-semibold text-lg text-orange-400">
                Summary
              </Text>
            </View>
            <View className="flex gap-y-3">
              {summaryData.map((item, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between px-2"
                >
                  <Text className="text-gray-700">{item.title}</Text>
                  <Text className="font-medium">
                    Rs. {item.amount.toFixed(2)}
                  </Text>
                </View>
              ))}
              <View className="flex-row items-center justify-between bg-orange-500/30 py-3 px-2 rounded-lg mt-3">
                <Text className="font-semibold">Sub Total</Text>
                <Text className="font-semibold">Rs. {subTotal.toFixed(2)}</Text>
              </View>
            </View>
          </>
        }
      />
    </View>
  );
}

function BilledDetails() {
  return (
    <>
      <CardUI
        content={
          <>
            <View className="flex-row items-center gap-x-2 mb-3">
              <Text className="bg-blue-500/20 py-1 px-1.5 rounded">
                <Receipt color="#3B82F6" />
              </Text>
              <Text className="font-semibold text-base">Billed Details</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator>
              <View>
                <View className="flex-row items-center bg-gray-100 border border-gray-300 px-3 py-3 rounded-lg mb-3">
                  <Text className="w-16">Sr No.</Text>
                  <Text className="w-40">Product Name</Text>
                  <Text className="w-24">SKU</Text>
                  <Text className="w-24">HSN</Text>
                  <Text className="w-16">Qty</Text>
                  <Text className="w-28">Unit Price</Text>
                  <Text className="w-24">Total</Text>
                </View>
                <View className="flex-col gap-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <View key={item}>
                      <View className="flex-row items-center p-3 border border-gray-200 rounded">
                        <Text className="w-16">1</Text>
                        <Text className="w-40">Product 1</Text>
                        <Text className="w-24">SKU001</Text>
                        <Text className="w-24">HSN001</Text>
                        <Text className="w-16">2</Text>
                        <Text className="w-28">₹100</Text>
                        <Text className="w-24">₹200</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </>
        }
      />
    </>
  );
}
