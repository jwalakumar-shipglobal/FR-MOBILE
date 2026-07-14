import SubPageLayout from "@/app/layout/subPageLayout";
import BreadCumb from "@/components/Element/BreadCumb";
import CardUI from "@/components/Element/CardUi";
import { Button } from "@/components/ui/button";
import { ShipperRatesProps } from "@/interface/order";
import postPrivate from "@/Service/apiService";
import { OrdersData } from "@/Zustand/useStore";
import { Check } from "lucide-react-native";
import React, { ReactNode, useState } from "react";
import { Text, View } from "react-native";
import ConsigneeDetails from "./form/ConsigneeDetails";
import ConsignorDetails from "./form/ConsignorDetails";
import ShipmentDetails from "./form/ShipmentDetails";
import ShippingPartner from "./form/ShippingPartner";

export default function SingleOrder() {
  const [loading, setLoading] = useState(false);
  const [activeState, setActiveState] = useState<number>(1);
  const [shiperRates, setShiperRates] = useState<ShipperRatesProps | null>(
    null,
  );
  const activestep = OrdersData((state: any) => state.activeStep);
  const orderdetail = OrdersData((state: any) => state.ordersDeatils);
  console.log(activestep);
  console.log(orderdetail);

  async function getShiperRates(data: any) {
    if (!data?.ShipmentData) return;
    try {
      setLoading(true);
      const singleVendorItems = data?.ShipmentData?.products?.map(
        (item: any, index: number) => ({
          vendor_order_item_id: `id-${Date.now()}-${index}`,
          vendor_order_item_name: item.item_name,
          vendor_order_item_sku: item.item_sku,
          vendor_order_item_quantity: item.item_qty,
          vendor_order_item_unit_price: item.item_unit_price,
          vendor_order_item_hsn: String(item.item_hsn),
          vendor_order_item_tax_rate: String(item.item_igst).replace("%", ""),
        }),
      );

      const singleOrderPayLoad = {
        csbv: 0,
        customer_shipping_postcode: data?.consigneeDetails?.pinCode,
        customer_shipping_country_code: data?.consigneeDetails?.country,
        package_weight: data?.ShipmentData?.dead_weight,
        package_length: data?.ShipmentData?.pro_length,
        package_breadth: data?.ShipmentData?.pro_breadth,
        package_height: data?.ShipmentData?.pro_height,
        vendor_order_item: singleVendorItems,
        currency_code: data?.ShipmentData?.invoice_currency,
        state_id: data?.consigneeDetails?.state,
      };

      let res = await postPrivate(
        "/orders/get-shipper-rates",
        singleOrderPayLoad,
      );
      setShiperRates(res?.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SubPageLayout className="py-3 px-2">
      <View className="w-full">
        <BreadCumb
          className="w-full"
          pageTitle="Create CSB-IV Order"
          firstStep="Orders"
          secondStep="Create CSB-IV Order"
        />
      </View>
      <View className="flex-col gap-y-3">
        <OrderStepForm
          title="Consignor Details"
          content={<ConsignorDetails setActiveState={setActiveState} />}
          step={1}
          activeState={activeState}
          setActiveState={setActiveState}
        />
        <OrderStepForm
          title="Consignee Details"
          content={<ConsigneeDetails setActiveState={setActiveState} />}
          step={2}
          activeState={activeState}
          setActiveState={setActiveState}
        />
        <OrderStepForm
          title="Shipment Information"
          step={3}
          activeState={activeState}
          setActiveState={setActiveState}
          content={
            <ShipmentDetails
              getShiperRates={getShiperRates}
              loading={loading}
              setLoading={setLoading}
              setActiveState={setActiveState}
            />
          }
        />
        <OrderStepForm
          title="Select Shipping Partner"
          step={4}
          activeState={activeState}
          setActiveState={setActiveState}
          content={
            <ShippingPartner
              shiperRates={shiperRates}
              setActiveState={setActiveState}
            />
          }
        />
      </View>
      {/* <OrderSummary /> */}
    </SubPageLayout>
  );
}

interface OrderStepFormProps {
  title: string;
  content: ReactNode;
  step: number;
  activeState: number;
  setActiveState: (data: number) => void;
}

function OrderStepForm({
  title,
  content,
  step,
  activeState,
  setActiveState,
}: OrderStepFormProps) {
  const changeBtnClick = () => {
    setActiveState(step);
  };
  const isActive = activeState === step;
  const isCompleted = activeState > step;

  return (
    <CardUI
      className={`rounded-lg border transition-all duration-200 px-2 ${
        isActive ? "border-blue-200 shadow-sm" : "border-gray-200"
      }`}
      content={
        <>
          <View className="flex-row items-center justify-between py-1">
            <View className="flex-row items-center gap-x-2">
              <View
                className={`h-9 w-9 items-center justify-center rounded-full ${
                  isCompleted
                    ? "bg-green-600"
                    : isActive
                      ? "bg-blue-900"
                      : "bg-gray-200"
                }`}
              >
                {isCompleted ? (
                  <Check size={18} color="white" />
                ) : (
                  <Text
                    className={`font-semibold ${
                      isActive ? "text-white" : "text-black"
                    }`}
                  >
                    {step}
                  </Text>
                )}
              </View>
              <View>
                <Text className="text-base font-semibold text-black">
                  {title}
                </Text>
                <Text className="text-xs text-gray-500">Step {step}</Text>
              </View>
            </View>
            {isCompleted && (
              <Button
                variant="ghost"
                className="h-8 px-2 bg-transparent"
                onPress={changeBtnClick}
              >
                <Text className="font-medium text-blue-600">Change</Text>
              </Button>
            )}
          </View>
          {isActive && (
            <View className="mt-2 border-t border-gray-100 pt-">
              {content}
            </View>
          )}
        </>
      }
    />
  );
}

// function OrderSummary() {
//   const activestep = OrdersData((state: any) => state.activeStep);
//   // const orderdetail = OrdersData((state: any) => state.ordersDeatils ?? {});

//   return (
//     <View className="px-2 my-5">
//       <View>{activestep == 1 && <QuickTips />}</View>
//       <View>
//         {activestep >= 2 && (
//           <CommonAccordion
//             accordionItemValue="ConsigneeDetails"
//             accordionTrigger={
//               <Text className="text-base font-semibold">Consignor Details</Text>
//             }
//             defaultValue="ConsigneeDetails"
//             accordionContent={
//               <View className="flex gap-y-1">
//                 <Text className="text-sm font-semibold text-gray-500">
//                   Name
//                 </Text>
//                 {/* <Text className="font-semibold">
//                   {orderdetail?.userId?.first_name}{" "}
//                   {orderdetail?.userId?.last_name}
//                   {Math.floor(Math.random() * (9999 - 1000 + 1))}
//                   {orderdetail?.userId?.first_name}@gmail.com |
//                   {orderdetail?.userId?.phone}
//                 </Text> */}
//                 <Text className="text-sm font-semibold text-gray-500">
//                   Address
//                 </Text>
//                 {/* <Text className="font-semibold">
//                   {orderdetail?.userId?.address}
//                 </Text> */}
//               </View>
//             }
//           />
//         )}
//         <CommonAccordion
//           accordionItemValue="ConsigneeDetails"
//           accordionTrigger={
//             <Text className="text-base font-semibold">Consignee Details</Text>
//           }
//           accordionContent={
//             <View className="flex gap-y-1">
//               <Text className="text-sm font-semibold text-gray-500">Name</Text>
//               {/* <Text>
//                 {orderdetail?.consigneeDetails?.fname}
//                 {orderdetail?.consigneeDetails?.lname} |
//                 {orderdetail?.consigneeDetails?.mobile}
//               </Text> */}
//               <Text className="text-sm font-semibold text-gray-500">
//                 Billing Address
//               </Text>
//               <Text>Same as shipping address</Text>
//               <Text className="text-sm font-semibold text-gray-500">
//                 Shipping Address
//               </Text>
//               {/* <Text>Adminstreet, 53, Admincity, Béjaïa, Algeria, {orderdetail.consigneeDetails.}</Text> */}
//             </View>
//           }
//         />
//       </View>
//     </View>
//   );
// }
