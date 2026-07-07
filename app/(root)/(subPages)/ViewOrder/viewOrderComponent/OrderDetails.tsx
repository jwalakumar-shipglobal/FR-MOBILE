import CardUI from "@/components/Blocks/CardUi";
import { Button } from "@/components/ui/button";
import {
  Box,
  ChevronUp,
  ClipboardCheck,
  Truck,
  Weight,
} from "lucide-react-native";
import { Text, View } from "react-native";

export default function OrderDetails() {
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
