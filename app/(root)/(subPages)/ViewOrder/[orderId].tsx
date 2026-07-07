import SubPageLayout from "@/app/layout/subPageLayout";
import BreadCumb from "@/components/Element/BreadCumb";
import { Button } from "@/components/ui/button";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ViewOrder() {
  const { orderId } = useLocalSearchParams();

  console.log(orderId)

  return (
    <SubPageLayout>
      <View className="w-full flex flex-row px-3 justify-between items-center *:w-[50%] ">
        <BreadCumb
          pageTitle="View Order"
          firstStep="All Orders"
          secondStep="View Order"
        />
        <Button className="">
          <Text>Back</Text>
        </Button>
      </View>
    </SubPageLayout>
  );
}
