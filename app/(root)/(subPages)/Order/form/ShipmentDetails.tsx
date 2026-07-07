import { ShipmentDetailsProps } from "@/(interface)/order";
import {
  ShipmentinfoDefaultValues,
  ShipmentinfoSchema,
} from "@/(Schema)/CSBIVSchema";
import { SHIPMENT_DETAILS, SHIPMENT_SIZE } from "@/app/Mock/CSBIVData";
import { getPrivate } from "@/app/Service/apiService";
import {
  BasicInput,
  BasicInputWithSideKey,
} from "@/components/Element/AllInput";
import DatePickerInput from "@/components/Element/DatePicker";
import OrderItemsDetails from "@/components/Element/OrderItemsDetails";
import { BasicComboBox } from "@/components/Element/select";
import { Button } from "@/components/ui/button";
import { OrdersData } from "@/Zustand/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function ShipmentDetails({
  getShiperRates,
  loading,
  setLoading,
}: ShipmentDetailsProps) {
  const [currency, setCurreency] = useState([]);
  const setActiveStep = OrdersData((state: any) => state.setActiveState);
  const orderdetail = OrdersData((state: any) => state.ordersDeatils);
  const setOrderdetails = OrdersData((state: any) => state.addOrderDetails);
  const ShipmentDataForm = useForm({
    resolver: zodResolver(ShipmentinfoSchema),
    defaultValues: ShipmentinfoDefaultValues,
    shouldUnregister: false,
  });

  const onSubmitHandler = (data: any) => {
    setLoading(true);
    try {
      setOrderdetails({ ShipmentData: data });
      getShiperRates({ ...orderdetail, ShipmentData: data });
      setActiveStep(4);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function FetchCurrency() {
    try {
      const res = await getPrivate("/currency/list");
      setCurreency(res?.data);
      console.log;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    FetchCurrency();
  }, []);

  useEffect(() => {
    if (orderdetail?.ShipmentData) {
      ShipmentDataForm.reset({
        ...ShipmentinfoDefaultValues,
        ...orderdetail.ShipmentData,
        products:
          orderdetail?.ShipmentData?.products?.length > 0
            ? orderdetail.ShipmentData.products
            : ShipmentinfoDefaultValues.products,
      });
    }
  }, [orderdetail]);

  return (
    <View className="px-2 py-3">
      <DatePickerInput
        form={ShipmentDataForm}
        name="invoice_date"
        label="Invoice Date"
        minimumDate={new Date(2024, 0, 1)}
        maximumDate={new Date()}
      />
      <BasicComboBox
        valueKey="currency_iso_code"
        labelKey="currency_iso_code"
        label="Select Currency"
        fOption="Select Currency"
        list={currency}
        placeholder="Select Currency"
        name="invoice_currency"
        form={ShipmentDataForm}
      />
      <View>
        <FlatList
          data={SHIPMENT_DETAILS}
          renderItem={({ item }) => (
            <BasicInput
              placeholder={item.placeholder}
              required={item.isRequired}
              label={item.label}
              name={item.name}
              form={ShipmentDataForm}
              keyBoardType={item.keyBoardType}
            />
          )}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Text className="text-lg font-semibold mt-2">Box Measurements</Text>
      <View>
        <FlatList
          data={SHIPMENT_SIZE}
          renderItem={({ item }) => (
            <View>
              <BasicInputWithSideKey
                keyBoardType={item.keyBoardType}
                placeholder={item.placeholder}
                required={item.isRequired}
                label={item.label}
                name={item.name}
                form={ShipmentDataForm}
                Stxt={item.stxt}
              />
            </View>
          )}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View>
        <OrderItemsDetails form={ShipmentDataForm} />
      </View>
      <View className="flex items-end my-2">
        <Button
          className="bg-blue-900"
          onPress={ShipmentDataForm.handleSubmit(onSubmitHandler)}
        >
          {loading ? (
            <>
              <ActivityIndicator color="white" />
              <Text>Continue</Text>
            </>
          ) : (
            <Text className="text-white font-semibold">Continue</Text>
          )}
        </Button>
      </View>
    </View>
  );
}
