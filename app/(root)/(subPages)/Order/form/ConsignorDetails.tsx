import ReusableButton from "@/components/Element/AllButton";
import CardUI from "@/components/Element/CardUi";
import SelectDropDown from "@/components/Element/select";
import { Badge } from "@/components/ui/badge";
import customerProps from "@/interface/order";
import { SearchCustomerSchema } from "@/Schema/CSBIVSchema";
import { OrdersData } from "@/Zustand/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

export default function ConsignorDetails({
  setActiveState,
}: {
  setActiveState: (data: number) => void;
}) {
  const [loading, setLoading] = useState(false);
  const setorderDetails = OrdersData((state: any) => state.addOrderDetails);
  const OrderDetails = OrdersData((state: any) => state.ordersDeatils);

  const consignorForm = useForm({
    resolver: zodResolver(SearchCustomerSchema),
    defaultValues: {
      userId: null,
    },
  });

  const watchValue = consignorForm.watch("userId");

  const onSubmitHandler = (data: any) => {
    console.log("clicked");
    setLoading(true);
    try {
      setorderDetails(data);
      setActiveState(2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    consignorForm.reset({
      userId: OrderDetails?.userId ?? null,
    });
  }, [OrderDetails?.userId]);

  return (
    <View className="space-y-4">
      <SelectDropDown
        data={customers}
        label="Select User"
        placeHolder="Select Customer"
        form={consignorForm}
        name="userId"
      />
      {watchValue && (
        <CardUI
          className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4"
          content={
            <>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-lg font-semibold text-black">
                    {watchValue.first_name} {watchValue.last_name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Customer Details
                  </Text>
                </View>
                <Badge className="bg-blue-900">
                  <Text className="text-xs font-semibold text-white">
                    Active
                  </Text>
                </Badge>
              </View>
              <View className="my-4 h-px bg-blue-100" />
              <View className="space-y-4">
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Email</Text>
                  <Text className="font-medium text-black">
                    {`${Math.floor(Math.random() * 9000 + 1000)}${
                      watchValue.first_name
                    }@gmail.com`}
                  </Text>
                </View>
                <View className="mt-3 flex-row justify-between">
                  <Text className="text-gray-500">Phone</Text>
                  <Text className="font-medium text-black">
                    {watchValue.phone}
                  </Text>
                </View>
                <View className="mt-3">
                  <Text className="text-gray-500">Address</Text>
                  <Text className="mt-1 text-black">{watchValue.address}</Text>
                </View>
                <View className="mt-3 flex-row justify-between">
                  <Text className="text-gray-500">Document</Text>
                  <View className="rounded-lg bg-white border border-blue-200 px-3 py-1">
                    <Text className="font-semibold text-blue-700">
                      {watchValue.document}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          }
        />
      )}
      <View className="mt-6">
        <ReusableButton
          title="Continue"
          loading={loading}
          onPress={consignorForm.handleSubmit(onSubmitHandler)}
        />
      </View>
    </View>
  );
}

const customers: customerProps[] = [
  {
    first_name: "Amit",
    last_name: "Sharma",
    phone: "+91-9876543210",
    address: "12, Karol Bagh, New Delhi, India",
    document: "DOC1001",
  },
  {
    first_name: "Priya",
    last_name: "Verma",
    phone: "+91-9123456780",
    address: "45, Rohini Sector 8, Delhi, India",
    document: "DOC1002",
  },
  {
    first_name: "Rahul",
    last_name: "Mehta",
    phone: "+91-9988776655",
    address: "78, Lajpat Nagar, New Delhi, India",
    document: "DOC1003",
  },
  {
    first_name: "Sneha",
    last_name: "Kapoor",
    phone: "+91-9012345678",
    address: "22, Dwarka Sector 10, Delhi, India",
    document: "DOC1004",
  },
  {
    first_name: "Vikas",
    last_name: "Gupta",
    phone: "+91-9090909090",
    address: "9, Pitampura, Delhi, India",
    document: "DOC1005",
  },
  {
    first_name: "Neha",
    last_name: "Singh",
    phone: "+91-9345678901",
    address: "67, Saket, New Delhi, India",
    document: "DOC1006",
  },
  {
    first_name: "Arjun",
    last_name: "Reddy",
    phone: "+91-9765432109",
    address: "15, Vasant Kunj, New Delhi, India",
    document: "DOC1007",
  },
  {
    first_name: "Pooja",
    last_name: "Nair",
    phone: "+91-9871234560",
    address: "33, Mayur Vihar, Delhi, India",
    document: "DOC1008",
  },
  {
    first_name: "Karan",
    last_name: "Malhotra",
    phone: "+91-9111222233",
    address: "88, Janakpuri, New Delhi, India",
    document: "DOC1009",
  },
  {
    first_name: "Anjali",
    last_name: "Das",
    phone: "+91-9223344556",
    address: "54, Preet Vihar, Delhi, India",
    document: "DOC1010",
  },
];
