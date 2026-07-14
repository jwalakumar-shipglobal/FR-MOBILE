import SelectDropDown from "@/components/Element/select";
import { Button } from "@/components/ui/button";
import customerProps from "@/interface/order";
import { SearchCustomerSchema } from "@/Schema/CSBIVSchema";
import { OrdersData } from "@/Zustand/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";

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
    <View className="px-2 py-2">
      <SelectDropDown
        data={customers}
        label="Select User"
        placeHolder="Select Customer"
        form={consignorForm}
        name="userId"
      />
      {watchValue && (
        <View className="flex-col gap-y-2 mt-3">
          <View>
            <Text className="font-semibold">
              {watchValue?.first_name} {watchValue?.last_name}
            </Text>
            <Text>
              {Math.floor(Math.random() * (9999 - 1000 + 1))}
              {watchValue?.first_name}@gmail.com {watchValue?.phone}
            </Text>
          </View>
          <View>
            <Text className="text-gray-400 font-semibold">Address</Text>
            <Text>{watchValue?.address}</Text>
          </View>
          <View>
            <Text className="text-gray-400 font-semibold">Document Type</Text>
            <Text>{watchValue?.document}</Text>
          </View>
        </View>
      )}
      <View className="flex items-end my-3">
        <Button
          onPress={consignorForm.handleSubmit(onSubmitHandler)}
          className="bg-blue-700"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">Continue</Text>
          )}
        </Button>
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
