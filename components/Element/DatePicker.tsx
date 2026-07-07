import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Platform, Pressable, Text, View } from "react-native";

interface DatePickerInputProps {
  form?: any;
  name: string;
  label: string;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export default function DatePickerInput({
  form,
  name,
  label,
  placeholder = "Select Date",
  minimumDate,
  maximumDate,
}: DatePickerInputProps) {
  const [show, setShow] = useState(false);

  const { control } = form;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="mb-4">
          <Text className="mb-2 font-medium">
            {label} <Text className="text-red-600">*</Text>{" "}
          </Text>
          <Pressable
            onPress={() => setShow(true)}
            className="border border-gray-300 rounded-xl px-4 py-3"
          >
            <Text className="text-base">
              {value ? new Date(value).toLocaleDateString() : placeholder}
            </Text>
          </Pressable>
          {show && (
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              onChange={(_, selectedDate) => {
                setShow(false);

                if (selectedDate) {
                  onChange(selectedDate);
                }
              }}
            />
          )}

          {error && <Text className="text-red-500 mt-1">{error.message}</Text>}
        </View>
      )}
    />
  );
}
