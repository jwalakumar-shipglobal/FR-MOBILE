import customerProps from "@/interface/order";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Check, ChevronDown, Search } from "lucide-react-native";
import { default as React, useMemo, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

interface SelectDropDownProps {
  data: customerProps[];
  placeHolder: string;
  label?: string;
  form: any;
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
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [search, setSearch] = useState("");
  const snapPoints = useMemo(() => ["75%"], []);
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((item) =>
      `${item.first_name} ${item.last_name} ${item.phone} ${item.address} ${item.document}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search, data]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => bottomSheetRef.current?.present()}
            className="border border-gray-300 bg-white rounded-lg px-4 py-3 flex-row justify-between items-center"
          >
            <Text className={`${value ? "text-black" : "text-gray-400"}`}>
              {value ? `${value.first_name} ${value.last_name}` : placeHolder}
            </Text>
            <ChevronDown size={20} color="black" />
          </TouchableOpacity>
          {error && <Text className="text-red-500 mt-1">{error.message}</Text>}
          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose
            backdropComponent={(props) => (
              <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
              />
            )}
            onDismiss={() => setSearch("")}
          >
            <View className="flex-1 px-4">
              <View className="py-4 border-b border-gray-200">
                <Text className="text-xl font-semibold text-black">
                  {label || "Select User"}
                </Text>
              </View>
              <View className="mt-4 mb-4 border border-gray-300 rounded-xl flex-row items-center px-3">
                <Search size={18} color="#6B7280" />
                <BottomSheetTextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search user..."
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    marginLeft: 8,
                    fontSize: 16,
                  }}
                />
              </View>
              <BottomSheetFlatList
                data={filteredData}
                keyExtractor={(item, index) =>
                  item.document || index.toString()
                }
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 30,
                }}
                renderItem={({ item }) => {
                  const selected = value?.document === item.document;

                  return (
                    <Pressable
                      className="py-4 border-b border-gray-100 flex-row justify-between items-center"
                      onPress={() => {
                        onChange(item);
                        bottomSheetRef.current?.dismiss();
                        setSearch("");
                      }}
                    >
                      <View className="flex-1 pr-2">
                        <Text className="text-black font-medium">
                          {item.first_name} {item.last_name}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          {item.phone}
                        </Text>
                        <Text
                          className="text-gray-500 text-sm"
                          numberOfLines={1}
                        >
                          {item.address}
                        </Text>
                        <Text className="text-blue-600 text-sm">
                          {item.document}
                        </Text>
                      </View>
                      {selected && <Check size={20} color="#2563EB" />}
                    </Pressable>
                  );
                }}
              />
            </View>
          </BottomSheetModal>
        </>
      )}
    />
  );
}

interface BasicComboBoxProps {
  label: string;
  list: any[];
  name: string;
  form: any;
  valueKey: string;
  labelKey: string;
  required?: boolean;
  placeholder?: string;
  fOption?: string;
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
}: BasicComboBoxProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [search, setSearch] = useState("");
  const snapPoints = useMemo(() => ["75%"], []);
  const filteredList = useMemo(() => {
    if (!search.trim()) return list;
    return list.filter((item) =>
      String(item[labelKey]).toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, list, labelKey]);

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
    />
  );

  return (
    <>
      <Text className="text-sm text-black">
        {label}
        {required && <Text className="text-red-500">*</Text>}
      </Text>

      <Controller
        control={form.control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const selected = list.find((item) => item[valueKey] === value);

          return (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => bottomSheetRef.current?.present()}
                className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3"
              >
                <Text
                  className={`text-base ${
                    selected ? "text-black" : "text-gray-400"
                  }`}
                >
                  {selected?.[labelKey] ?? placeholder ?? "Select Item"}
                </Text>
                <ChevronDown size={22} color="black" />
              </TouchableOpacity>
              {error && (
                <Text className="mt-1 text-red-500">{error.message}</Text>
              )}
              <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                onDismiss={() => setSearch("")}
                backgroundStyle={{
                  backgroundColor: "#FFFFFF",
                }}
                handleIndicatorStyle={{
                  backgroundColor: "#2563EB",
                }}
              >
                <View className="border-b border-gray-200 px-5 pb-4">
                  <Text className="text-2xl font-bold text-black">
                    {fOption || label}
                  </Text>
                </View>
                <View className="mx-5 mt-4 mb-3 flex-row items-center rounded-xl border border-gray-300 px-3">
                  <Search size={18} color="black" />
                  <BottomSheetTextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder={`Search ${label}`}
                    style={{
                      flex: 1,
                      marginLeft: 8,
                      paddingVertical: 12,
                      fontSize: 16,
                      color: "#111827",
                    }}
                  />
                </View>
                <BottomSheetFlatList
                  data={filteredList}
                  keyExtractor={(item) => item[valueKey].toString()}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 40,
                  }}
                  renderItem={({ item }) => {
                    const selectedItem = item[valueKey] === value;
                    return (
                      <Pressable
                        onPress={() => {
                          onChange(item[valueKey]);
                          bottomSheetRef.current?.dismiss();
                          setSearch("");
                        }}
                        className={`flex-row items-center justify-between border-b border-slate-100 px-5 py-4 ${
                          selectedItem ? "bg-blue-50" : "bg-white"
                        }`}
                      >
                        <Text className="flex-1 text-base text-black">
                          {item[labelKey]}
                        </Text>
                        {selectedItem && <Check size={20} color="#2563EB" />}
                      </Pressable>
                    );
                  }}
                />
              </BottomSheetModal>
            </>
          );
        }}
      />
    </>
  );
}
