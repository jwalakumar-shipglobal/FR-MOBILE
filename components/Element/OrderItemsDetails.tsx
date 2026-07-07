import { SHIPMENT_PRODUCT } from "@/app/Mock/CSBIVData";
import { Link } from "expo-router";
import { Plus, Trash } from "lucide-react-native";
import { useFieldArray } from "react-hook-form";
import { FlatList, Text, View } from "react-native";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { BasicInput } from "./AllInput";
import { BasicComboBox } from "./select";

export default function OrderItemsDetails({ form }: { form: any }) {
  const IGST = ["0%", "0.25%", "3%", "5%", "12%", "18%", "28%"].map(
    (percentage: string) => ({ percentage }),
  );

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  return (
    <>
      <View className="flex-row w-full my-2">
        <Text className="text-lg font-semibold">Item(s) Details</Text>
        <Link href={"https://qa2.franchise.shipgl.in/add-order"}>
          <Badge className="bg-yellow-300">
            <Text className="text-orange-500">Items That Can Export</Text>
          </Badge>
        </Link>
      </View>
      {fields.map((fields, index) => (
        <View key={fields.id}>
          <FlatList
            data={SHIPMENT_PRODUCT}
            renderItem={({ item }) => (
              <BasicInput
                placeholder={item.placeholder}
                required={item.isRequired}
                label={item.label}
                name={`products.${index}.${item.name}`}
                form={form}
                keyBoardType={item.keyBoardType}
              />
            )}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
          />
          <BasicComboBox
            valueKey="percentage"
            labelKey="percentage"
            label="Select IGST"
            fOption="Select IGST"
            list={IGST}
            placeholder="Select IGST"
            name={`products.${index}.item_igst`}
            form={form}
          />
          {index > 0 && (
            <View className="flex items-center justify-center">
              <Button onPress={() => remove(index)} className="bg-transparent">
                <Trash color={"red"} />
              </Button>
            </View>
          )}
        </View>
      ))}
      <View className="flex-row items-center">
        <Button
          className="bg-transparent"
          onPress={() =>
            append({
              item_name: "",
              item_sku: "",
              item_hsn: "",
              item_qty: "",
              item_unit_price: "",
              item_igst: "",
            })
          }
        >
          <Text className="text-blue-900 font-semibold">
            <Plus color={"blue"} /> Add Another Product
          </Text>
        </Button>
      </View>
    </>
  );
}
