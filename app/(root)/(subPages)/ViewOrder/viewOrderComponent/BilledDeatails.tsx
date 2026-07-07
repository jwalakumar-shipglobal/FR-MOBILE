import CardUI from "@/components/Blocks/CardUi";
import { Receipt } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function BilledDetails() {
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
