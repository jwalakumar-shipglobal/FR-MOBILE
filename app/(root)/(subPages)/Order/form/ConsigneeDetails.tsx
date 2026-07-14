import ReusableButton from "@/components/Element/AllButton";
import { BasicInput } from "@/components/Element/AllInput";
import CardUI from "@/components/Element/CardUi";
import { BasicComboBox } from "@/components/Element/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ADDRESS_FIELDS, {
  BILLING_FIELDS,
  PERSONAL_DETAILS,
} from "@/lib/Mock/CSBIVData";
import {
  personalDataDefaultValue,
  personalDataschema,
} from "@/Schema/CSBIVSchema";
import postPrivate, { getPublic } from "@/Service/apiService";
import { OrdersData } from "@/Zustand/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReceiptText, Truck, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList, Text, View } from "react-native";

export default function ConsigneeDetails({
  setActiveState,
}: {
  setActiveState: (data: number) => void;
}) {
  const [country, setCountry] = useState<any>([]);
  const [state, setState] = useState<any>([]);
  const [billingstate, setBillingState] = useState<any>([]);
  const [billingCheck, setBillingCheck] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const orderdetail = OrdersData((state: any) => state.ordersDeatils);
  const setOrderdetails = OrdersData((state: any) => state.addOrderDetails);

  const personalDataForm = useForm({
    resolver: zodResolver(personalDataschema),
    defaultValues: personalDataDefaultValue,
  });
  const watchvalue = personalDataForm.watch();

  async function CountryApiCall() {
    try {
      const res = await getPublic("/location/countries");
      setCountry(res?.data?.countries);
    } catch (error) {
      console.log("CountryApi call", error);
    }
  }

  async function getStates(
    countryCode: string,
    setData: React.Dispatch<React.SetStateAction<any[]>>,
  ) {
    try {
      const res = await postPrivate("/location/statesv2", {
        state_country_code: countryCode,
      });

      setData(res?.data?.states || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function OnSubmitHandler(data: any) {
    setLoading(true);
    try {
      setOrderdetails({ consigneeDetails: data });
      setActiveState(3);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    CountryApiCall();
  }, []);

  useEffect(() => {
    if (watchvalue.country) {
      getStates(watchvalue.country, setState);
    }
  }, [watchvalue.country]);

  useEffect(() => {
    if (watchvalue.billing_Country) {
      getStates(watchvalue.billing_Country, setBillingState);
    }
  }, [watchvalue.billing_Country]);

  useEffect(() => {
    if (orderdetail?.consigneeDetails) {
      personalDataForm.reset({
        ...personalDataDefaultValue,
        ...orderdetail.consigneeDetails,
      });
    }
  }, [orderdetail]);

  return (
    <View className="px-1 py-2 gap-y-5">
      <CardUI
        heading={
          <View className="flex-row gap-x-1 items-center">
            <User size={17} />
            <Text className="text-base font-semibold">Personal Details</Text>
          </View>
        }
        className="border border-blue-100 shadow-sm"
        content={
          <View className="gap-y-3 mt-2">
            <FlatList
              data={PERSONAL_DETAILS}
              scrollEnabled={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <BasicInput
                  placeholder={item.placeholder}
                  required={item.isRequired}
                  label={item.label}
                  name={item.name}
                  form={personalDataForm}
                  keyBoardType={item.keyBoardType}
                />
              )}
            />
          </View>
        }
      />
      <CardUI
        heading={
          <View className="flex-row gap-x-1 items-center">
            <Truck size={17} />
            <Text className="text-base font-semibold">Shipping Address</Text>
          </View>
        }
        className="border border-blue-100 shadow-sm"
        content={
          <View className="gap-y-3 mt-2">
            <BasicComboBox
              label="Country"
              list={country}
              fOption="Select Country"
              name="country"
              valueKey="country_iso2"
              labelKey="country_name"
              form={personalDataForm}
              required
            />

            <BasicComboBox
              label="State"
              list={state}
              fOption="Select State"
              name="state"
              valueKey="state_id"
              labelKey="state_name"
              form={personalDataForm}
              required
            />

            <FlatList
              data={ADDRESS_FIELDS}
              scrollEnabled={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <BasicInput
                  placeholder={item.placeholder}
                  required={item.isRequired}
                  label={item.label}
                  name={item.name}
                  form={personalDataForm}
                  keyBoardType={item.keyBoardType}
                />
              )}
            />
          </View>
        }
      />
      <View className="flex-row items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <Checkbox
          id="check"
          checked={billingCheck}
          onCheckedChange={() => {
            const updated = !billingCheck;
            setBillingCheck(updated);
            personalDataForm.setValue("billingCheck", updated);
          }}
        />
        <Label htmlFor="check" className="flex-1 text-black font-medium">
          Billing address is same as shipping address
        </Label>
      </View>
      {!billingCheck && (
        <CardUI
          heading={
            <View className="flex-row gap-x-1 items-center">
              <ReceiptText size={17} />
              <Text className="text-base font-semibold">Billing Address</Text>
            </View>
          }
          className="border border-blue-100 shadow-sm"
          content={
            <View className="gap-y-3 mt-2">
              <BasicComboBox
                label="Country"
                list={country}
                name="billing_Country"
                valueKey="country_iso2"
                labelKey="country_name"
                required
                fOption="Select Country"
                form={personalDataForm}
              />
              <BasicComboBox
                label="State"
                fOption="Select State"
                list={billingstate}
                name="billing_State"
                valueKey="state_id"
                labelKey="state_name"
                form={personalDataForm}
              />
              <FlatList
                data={BILLING_FIELDS}
                scrollEnabled={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <BasicInput
                    placeholder={item.placeholder}
                    required
                    label={item.label}
                    name={item.name}
                    form={personalDataForm}
                    keyBoardType={item.keyBoardType}
                  />
                )}
              />
            </View>
          }
        />
      )}
      <View className="mt-2 items-end">
        <ReusableButton
          title="Continue"
          loading={loading}
          onPress={personalDataForm.handleSubmit(OnSubmitHandler)}
        />
      </View>
    </View>
  );
}
