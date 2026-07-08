import {
  personalDataDefaultValue,
  personalDataschema,
} from "@/(Schema)/CSBIVSchema";
import ADDRESS_FIELDS, {
  BILLING_FIELDS,
  PERSONAL_DETAILS,
} from "@/lib/Mock/CSBIVData";
import postPrivate, { getPublic } from "@/Service/apiService";
import { OrdersData } from "@/Zustand/useStore";
// import { OrdersDeatils } from "@/app/Zustand/useStore";
import { BasicInput } from "@/components/Element/AllInput";
import { BasicComboBox } from "@/components/Element/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Text,
  View,
} from "react-native";

export default function ConsigneeDetails() {
  const [country, setCountry] = useState<any>([]);
  const [state, setState] = useState<any>([]);
  const [billingstate, setBillingState] = useState<any>([]);
  const [billingCheck, setBillingCheck] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const setActiveStep = OrdersData((state: any) => state.setActiveState);
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
      setActiveStep(3);
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

  // useEffect(() => {
  //   if (orderdetail?.consigneeDetails) {
  //     personalDataForm.reset({
  //       ...personalDataDefaultValue,
  //       ...orderdetail.consigneeDetails,
  //     });
  //   }
  // }, [orderdetail]);

  return (
    <View className="py-3 px-2">
      <Text className="text-lg font-semibold">Personal Details</Text>
      <View>
        <View className="px-2">
          <FlatList
            data={PERSONAL_DETAILS}
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
            scrollEnabled={false}
            keyExtractor={(items, index) => index.toString()}
          />
        </View>
        <Text className="text-lg font-semibold my-3">Shipping Address</Text>
        <View className="px-2 flex-col gap-y-2">
          <BasicComboBox
            label="Country"
            list={country}
            fOption="Select Country"
            name="country"
            valueKey="country_iso2"
            labelKey="country_name"
            form={personalDataForm}
            required={true}
          />
          <BasicComboBox
            label="State"
            list={state}
            fOption="Select State"
            name="state"
            valueKey="state_id"
            labelKey="state_name"
            form={personalDataForm}
            required={true}
          />
          <FlatList
            data={ADDRESS_FIELDS}
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
            scrollEnabled={false}
            keyExtractor={(Item, index) => index.toString()}
          />
        </View>
        <View className="flex-row gap-x-2 px-2 my-2">
          <Checkbox
            id="check"
            checked={billingCheck}
            onCheckedChange={() => {
              const updatedValue = !billingCheck;
              setBillingCheck(updatedValue);
              personalDataForm.setValue("billingCheck", updatedValue);
            }}
          />
          <Label
            htmlFor="check"
            className="text-black"
            onPress={Platform.select({
              native: () => {
                const updatedValue = !billingCheck;
                setBillingCheck(updatedValue);
                personalDataForm.setValue("billingCheck", updatedValue);
              },
            })}
          >
            Billing address is same as shipping address
          </Label>
        </View>
        {!billingCheck && (
          <View>
            <Text className="text-lg font-semibold my-3">Billing Address</Text>
            <View>
              <BasicComboBox
                label="Country"
                list={country}
                fOption="Select Country"
                name="billing_Country"
                valueKey="country_iso2"
                labelKey="country_name"
                form={personalDataForm}
              />
              <BasicComboBox
                label="State"
                list={billingstate}
                fOption="Select State"
                name="billing_State"
                valueKey="state_id"
                labelKey="state_name"
                form={personalDataForm}
              />
              <FlatList
                data={BILLING_FIELDS}
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
                scrollEnabled={false}
                keyExtractor={(Item, index) => index.toString()}
              />
            </View>
          </View>
        )}
        <View className="flex items-end my-3">
          <Button
            className="bg-blue-900"
            onPress={personalDataForm.handleSubmit(OnSubmitHandler)}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold">Continue</Text>
            )}
          </Button>
        </View>
      </View>
    </View>
  );
}
