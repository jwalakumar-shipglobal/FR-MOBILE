import CardUI from "@/components/Blocks/CardUi";
import BreadCumb from "@/components/Element/BreadCumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SubPageLayout from "@/layout/subPageLayout";
import postPrivate from "@/Service/apiService";
import { useLocalSearchParams } from "expo-router";
import {
  Box,
  ChevronUp,
  CircleCheck,
  ClipboardCheck,
  MapPin,
  Receipt,
  Truck,
  Weight,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function ViewOrder() {
  const [orderdetail, setOrderdetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { orderId } = useLocalSearchParams();

  const getOrderDetails = async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res = await postPrivate("/orders/get-order-details", {
        order_id: orderId,
      });
      setOrderdetails(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ConsignorDetails =
    [orderdetail?.billing_firstname, orderdetail?.billing_lastname]
      .filter(Boolean)
      .join(" ") + ` | ${orderdetail?.billing_mobile ?? ""}`;

  const ConsignorAddress = [
    orderdetail?.billing_address,
    orderdetail?.billing_city,
    orderdetail?.billing_state,
    orderdetail?.billing_postcode,
  ]
    .filter(Boolean)
    .join(" ");

  const ConsigneeDetails =
    [
      orderdetail?.customer_shipping_firstname,
      orderdetail?.customer_shipping_lastname,
    ]
      .filter(Boolean)
      .join(" ") + ` | ${orderdetail?.customer_shipping_mobile ?? ""}`;

  const ConsigneeAddress = [
    orderdetail?.customer_shipping_address,
    orderdetail?.customer_shipping_address_2,
    orderdetail?.customer_shipping_city,
    orderdetail?.customer_shipping_state,
    orderdetail?.customer_shipping_country,
    orderdetail?.customer_shipping_postcode,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    getOrderDetails();
  }, [orderId]);

  return (
    <SubPageLayout className="px-3 flex gap-y-3 pb-5">
      {loading ? (
        <View className="py-4 flex-col gap-y-5">
          <View className="flex-row justify-between items-center">
            <Skeleton className="h-14 w-1/3 rounded-lg bg-gray-300" />
            <Skeleton className="h-14 w-1/3 rounded-lg bg-gray-300" />
          </View>
          <Skeleton className="h-48 w-full rounded-lg bg-gray-300" />
          <Skeleton className="h-60 w-full rounded-lg bg-gray-300" />
          <Skeleton className="h-72 w-full rounded-lg bg-gray-300" />
        </View>
      ) : (
        <>
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
                    <Text className="text-xs">{ConsignorDetails}</Text>
                    <Text className="text-gray-500 text-xs">
                      {ConsignorAddress}
                    </Text>
                  </View>
                </View>
                <View className="flex-row gap-x-3">
                  <MapPin color="red" />
                  <View className="flex-1">
                    <Text className="font-bold text-sm">Consignee Address</Text>
                    <Text className="text-xs">{ConsigneeDetails}</Text>
                    <Text className="text-gray-500 text-xs">
                      {ConsigneeAddress.toLocaleLowerCase()}
                    </Text>
                  </View>
                </View>
              </View>
            }
          />
          <OrderDetails orderdetail={orderdetail} />
          <BilledDetails orderdetail={orderdetail} />
          <OrderSummary orderdetail={orderdetail.order_total || []} />
          <OrderActivity orderdetail={orderdetail} />
        </>
      )}
    </SubPageLayout>
  );
}

function OrderDetails({ orderdetail }: any) {
  const [showAllDetails, setShowAllDetails] = useState(true);

  const formatWeight = (weight: string | number | undefined | null) => {
    return `${(Number(weight ?? 0) / 1000).toFixed(2)} kg`;
  };

  const orderDetails = [
    {
      id: 1,
      title: "Billed Weight",
      value: formatWeight(orderdetail?.package_weight),
      icon: Weight,
      iconColor: "#047857",
      bgColor: "#DCFCE7",
    },
    {
      id: 2,
      title: "Volumetric Wt",
      value: formatWeight(orderdetail?.package_volume_weight),
      icon: Weight,
      iconColor: "#D97706",
      bgColor: "#FEF3C7",
    },
    {
      id: 3,
      title: "Dimensions (L x B x H)",
      value: `${orderdetail?.package_length ?? 0} × ${
        orderdetail?.package_breadth ?? 0
      } × ${orderdetail?.package_height ?? 0} cm`,
      icon: Box,
      iconColor: "#EF4444",
      bgColor: "#FEE2E2",
    },
    {
      id: 4,
      title: "Dead Weight",
      value: formatWeight(orderdetail?.package_weight),
      icon: Weight,
      iconColor: "#3B82F6",
      bgColor: "#DBEAFE",
    },
    {
      id: 5,
      title: "Shipping Partner",
      value: orderdetail?.shipper_title ?? "-",
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
              <Button
                className="bg-transparent"
                onPress={() => {
                  setShowAllDetails(!showAllDetails);
                }}
              >
                <View className={showAllDetails ? "rotate-180" : "rotate-0"}>
                  <ChevronUp size={20} />
                </View>
              </Button>
            </View>
            <View className="flex-col gap-y-3">
              {orderDetails
                .slice(0, showAllDetails ? 3 : orderDetails.length)
                .map((item) => {
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

function OrderSummary({ orderdetail }: any) {
  const getAmount = (value: string | number | undefined | null): number => {
    if (value === undefined || value === null) return 0;

    return Number(String(value).replace("Rs.", "").replace(/,/g, "").trim());
  };

  const subTotal = orderdetail.reduce(
    (total: number, item: any) => total + getAmount(item.value),
    0,
  );

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
              {orderdetail?.map((item: any, index: number) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between px-2"
                >
                  <Text className="text-gray-700">{item.title}</Text>
                  <Text className="font-medium">
                    Rs. {getAmount(item.value).toFixed(2)}
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

function BilledDetails({ orderdetail }: any) {
  return (
    <>
      {orderdetail.items && (
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
                    {(orderdetail.items || []).map((item: any, idx: number) => (
                      <View key={idx}>
                        <View className="flex-row items-center p-3 border border-gray-200 rounded">
                          <Text className="w-16">{idx + 1}</Text>
                          <Text className="w-40">
                            {item.vendor_order_item_name}
                          </Text>
                          <Text className="w-24">
                            {item?.vendor_order_item_sku}
                          </Text>
                          <Text className="w-24">
                            {item.vendor_order_item_hsn}
                          </Text>
                          <Text className="w-16">
                            {item.vendor_order_item_quantity}
                          </Text>
                          <Text className="w-28">
                            {item.vendor_order_item_unit_price +
                              " " +
                              orderdetail.currency_code}
                          </Text>
                          <Text className="w-24">
                            {Number(item.vendor_order_item_quantity) *
                              Number(item.vendor_order_item_unit_price) +
                              " " +
                              orderdetail.currency_code}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>
            </>
          }
        />
      )}
    </>
  );
}

function OrderActivity(orderdetail: any) {
  const orderSteps = [
    { label: "Order Created", completed: true },
    { label: "Pickup Scheduled", completed: true },
    { label: "Received at Hub", completed: false },
    { label: "Flight Channel", completed: false },
    { label: "Shipment in Transit", completed: false },
    { label: "Last Mile", completed: false },
    { label: "Closed", completed: false },
  ];

  return (
    <CardUI
      content={
        <>
          <Text className="text-base font-semibold text-gray-900 mb-4">
            Activity
          </Text>
          {orderSteps.map((step, index) => (
            <View key={index} className="flex-row">
              <View className="items-center mr-4">
                <View
                  className={`w-7 h-7 rounded-full border items-center justify-center ${
                    step.completed
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <CircleCheck
                    size={16}
                    color={step.completed ? "#22C55E" : "#9CA3AF"}
                  />
                </View>
                {index !== orderSteps.length - 1 && (
                  <View
                    className={`w-0 border-l border-dashed flex-1 mt-1 ${
                      step.completed ? "border-green-500" : "border-gray-300"
                    }`}
                    style={{ minHeight: 40 }}
                  />
                )}
              </View>
              <View className="flex-1 pb-8">
                <Text
                  className={`text-[15px] ${
                    step.completed
                      ? "text-gray-900 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </Text>
              </View>
            </View>
          ))}
        </>
      }
    />
  );
}
