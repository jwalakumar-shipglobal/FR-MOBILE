import PrivateLayout from "@/app/layout/privateLayout";
import postPrivate from "@/app/Service/apiService";
import KYC, {
  AllOrders,
  CSBP,
  Dispatched,
  Dispute,
  Drafted,
  LabelPending,
  OnHold,
  Packed,
} from "@/assets/svg/DashboardSVG";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<any>({});
  const [walletActivity, setWalletActivity] = useState<any>([]);
  const dashCardDetails = DashCard(dashboardData);
  const actionCardDeatils = ActionCard(dashboardData);
  const today = new Date();
  const priorDate = new Date();
  priorDate.setDate(today.getDate() - 7);

  const walletActivityColors = [
    "bg-orange-400",
    "bg-violet-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-pink-400",
    "bg-yellow-400",
  ];

  const walletCard = walletActivity.map((items: any, index: number) => {
    return {
      details: items?.Description,
      time_date: items?.["Transaction Date"],
      className: walletActivityColors[index % walletActivityColors.length],
    };
  });

  async function walletApiCall() {
    try {
      const res = await postPrivate("/wallet");
      setWalletActivity(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function dashBoardApiCall() {
    const payLoad = {
      from_date: today.toISOString().split("T")[0],
      to_date: priorDate.toISOString().split("T")[0],
    };
    try {
      const res = await postPrivate("/dashboard", payLoad);
      setDashboardData(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dashBoardApiCall();
    walletApiCall();
  }, []);

  return (
    <PrivateLayout className="p-2">
      <View className="flex-row items-center justify-between px-2">
        <Text className="font-semibold text-xl">Dashboard</Text>
        <Text>7 Days</Text>
      </View>
      <Card className="mt-3 bg-white border-transparent p-2 rounded">
        <FlatList
          data={dashCardDetails}
          numColumns={2}
          renderItem={({ item }) => (
            <LinearGradient
              colors={item.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className={`border w-[48%] rounded-lg mb-4 overflow-hidden ${item.colorClass}`}
              style={
                {
                  // marginBottom: 8,
                  // borderRadius: 12,
                }
              }
            >
              <CardContent
                className={`w-full rounded-lg overflow-hidden py-3 flex flex-col gap-y-2 items-center justify-center`}
              >
                <CardHeader>{item.icon}</CardHeader>
                <CardTitle className="text-4xl font-semibold text-gray-700 h-10">
                  {item.orders ? item.orders : 0}
                </CardTitle>
                <CardDescription className="text-center">
                  {item.name}
                </CardDescription>
              </CardContent>
            </LinearGradient>
          )}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </Card>
      <Card className="w-full p-2 rounded-lg bg-white border-transparent mt-3">
        <CardTitle className="text-lg text-gray-800 font-semibold mt-2">
          Action Required
        </CardTitle>
        <FlatList
          data={actionCardDeatils}
          renderItem={({ item }) => (
            <View className="border w-full mb-3 rounded-lg border-gray-300 py-3">
              <CardContent className="flex-row items-center -ms-5">
                <CardHeader>{item.icon}</CardHeader>
                <Text className="font-medium text-3xl text-gray-800">
                  {item.number ? item.number : 0}
                </Text>
              </CardContent>
              <CardFooter className="font-semibold text-gray-800">
                <Text>{item.name}</Text>
              </CardFooter>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </Card>
      <Card className="bg-white border-transparent mt-3 rounded-lg">
        <Text className="text-lg font-semibold px-2">Wallet Activity</Text>
        <View className="px-3">
          <FlatList
            data={walletCard.slice(0, 6)}
            renderItem={({ item }) => (
              <CardContent className="flex-row items-center justify-center mb-2 border border-gray-300 rounded-lg p-3">
                <View
                  className={`w-1 rounded-lg h-full ${item.className}`}
                ></View>
                <View className="ms-3 flex-col gap-y-2">
                  <Text>{item.details}</Text>
                  <Text className="text-xs font-semibold text-gray-500">
                    {item.time_date}
                  </Text>
                </View>
              </CardContent>
            )}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>
      </Card>
    </PrivateLayout>
  );
}

const DashCard = (dashboardData: any) => {
  return [
    {
      name: "All Orders",
      icon: <AllOrders />,
      orders: dashboardData?.total_orders,
      colorClass: "border-blue-400/30",
      gradient: ["#b9d6fa", "#FFFFFF"] as const,
    },
    {
      name: "Drafted Orders",
      icon: <Drafted />,
      orders: dashboardData?.drafted_orders,
      colorClass: "border-orange-400/30",
      gradient: ["#fccca4", "#FFFFFF"] as const,
    },
    {
      name: "Pending For Label",
      icon: <LabelPending />,
      orders: dashboardData?.pending_label_orders,
      colorClass: "border-yellow-400/30",
      gradient: ["#fae9a5", "#FFFFFF"] as const,
    },
    {
      name: "Packed Orders",
      icon: <Packed />,
      orders: dashboardData?.packed_orders,
      colorClass: "border-green-400/30",
      gradient: ["#affaca", "#FFFFFF"] as const,
    },
    {
      name: "Dispatched Orders",
      icon: <Dispatched />,
      orders: dashboardData?.dispatch_orders,
      colorClass: "border-purple-400/30",
      gradient: ["#d3acfa", "#FFFFFF"] as const,
    },
  ];
};

const ActionCard = (dashboardData: any) => {
  return [
    {
      name: "KYC Approval Pending",
      icon: <KYC />,
      number: dashboardData?.kyc_csb4_pending,
      className: "bg-blue-300/30 text-blue-600",
    },
    {
      name: "CSB-V Approval Pending",
      icon: <CSBP />,
      number: dashboardData?.kyc_csb5_pending,
      className: "bg-violet-400/30 text-violet-800",
    },
    {
      name: "Disputed Orders",
      icon: <Dispute />,
      number: dashboardData?.dispute_orders,
      className: "bg-red-300/30 text-red-600",
    },
    {
      name: "On Hold Orders",
      icon: <OnHold />,
      number: dashboardData?.onhold_orders,
      className: "bg-green-300/30 text-green-600",
    },
  ];
};
