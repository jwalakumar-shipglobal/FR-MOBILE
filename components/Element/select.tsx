import customerProps from "@/interface/order";
import { cn } from "@/lib/utils";
import type { TriggerRef } from "@rn-primitives/select";
import React from "react";
import { Controller } from "react-hook-form";
import { FlatList, Platform, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface geetingsBasicProps {
  label: string;
  list: any;
  fOption?: string;
  name: string;
  valueKey: string;
  labelKey: string;
  form: any;
  placeholder?: string;
  required?: boolean;
}

export function BasicComboBox({
  label,
  list,
  fOption,
  name,
  valueKey,
  labelKey,
  form,
  required,
  placeholder,
}: geetingsBasicProps) {
  const { control } = form;
  const ref = React.useRef<TriggerRef>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24,
    }),
    left: 12,
    right: 12,
  };
  return (
    <>
      <Text className="mb-2 text-base font-medium">
        {label}
        {required && <Text className="text-red-500">*</Text>}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select
              value={
                value
                  ? {
                      label:
                        list.find((item: any) => item[valueKey] === value)?.[
                          labelKey
                        ] || "",
                      value,
                    }
                  : undefined
              }
              onValueChange={(option) => {
                if (!option) return;
                onChange(option.value);
              }}
            >
              <SelectTrigger ref={ref} className="w-full">
                <SelectValue placeholder={placeholder || "Select Item"} />
              </SelectTrigger>
              <SelectContent insets={contentInsets} className="w-[90%]">
                <NativeSelectScrollView>
                  <SelectGroup>
                    <SelectLabel>{fOption}</SelectLabel>
                    <FlatList
                      data={list}
                      keyExtractor={(item, index) =>
                        item[valueKey]?.toString() || index.toString()
                      }
                      style={{ maxHeight: 400 }}
                      showsVerticalScrollIndicator={false}
                      initialNumToRender={200}
                      windowSize={5}
                      scrollEnabled={false}
                      removeClippedSubviews
                      renderItem={({ item }) => (
                        <SelectItem
                          label={item[labelKey]}
                          value={item[valueKey]}
                        >
                          {item[labelKey]}
                        </SelectItem>
                      )}
                    />
                  </SelectGroup>
                </NativeSelectScrollView>
              </SelectContent>
            </Select>

            {error && (
              <Text className="text-red-500 mt-1">{error.message}</Text>
            )}
          </>
        )}
      />
    </>
  );
}

interface SelectDropDownProps {
  data: customerProps[];
  placeHolder: string;
  label?: string;
  form?: any;
  name: string;
}

export default function SelectDropDown({
  data,
  label,
  placeHolder,
  form,
  name,
}: SelectDropDownProps) {
  const { control } = form;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          value={value}
          onValueChange={(option) => {
            const value = typeof option === "string" ? option : option?.value;
            if (value) {
              const parsedValue = JSON.parse(value);
              onChange(parsedValue);
            }
          }}
        >
          <Text>
            Select User<Text className="text-red-500">*</Text>
          </Text>
          <SelectTrigger className="w-full bg-transparent">
            <SelectValue placeholder={placeHolder} className="bg-transparent" />
          </SelectTrigger>
          <SelectContent className="w-4/5 text-black">
            <SelectGroup className="text-black">
              <SelectLabel>{label}</SelectLabel>
              <FlatList
                data={data}
                renderItem={({ item, index }) => (
                  <View key={index}>
                    <SelectItem
                      label={`${item.first_name}/${item.last_name}/${item.phone}/${item.document}`}
                      value={JSON.stringify(item)}
                      className="text-black"
                    >
                      {item.first_name}/{item.last_name}/{item.phone}/
                      {item.address}/{item.document}
                    </SelectItem>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </SelectGroup>
          </SelectContent>
          {error && <Text className="text-red-500 mt-1">{error.message}</Text>}
        </Select>
      )}
    />
  );
}

/**
 * Native Scrollable Select
 */
function NativeSelectScrollView({
  className,
  ...props
}: React.ComponentProps<typeof ScrollView>) {
  if (Platform.OS === "web") {
    return <>{props.children}</>;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className={cn("max-h-64", className)}
      {...props}
    />
  );
}
