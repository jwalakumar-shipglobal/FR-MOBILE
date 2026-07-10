import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { KeyboardTypeOptions, Pressable, Text, View } from "react-native";
import { Input } from "../ui/input";

interface BasicInputProps {
  placeholder: string;
  label: string;
  required: any;
  name: string;
  className?: string;
  form?: any;
  Stxt?: string;
  keyBoardType?: KeyboardTypeOptions | string | undefined;
}

export function BasicInput({
  placeholder,
  label,
  required,
  name,
  className,
  form,
  keyBoardType,
}: BasicInputProps) {
  const { control } = form;

  return (
    <View>
      <Text className="py-2">
        {label}
        {required && <Text className="text-red-600">*</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Input
              placeholder={placeholder}
              value={value?.toString() || ""}
              onChangeText={onChange}
              keyboardType={keyBoardType as KeyboardTypeOptions | undefined}
              className={`border rounded-lg px-4 py-3 h-12 ${
                error ? "border-red-500" : "border-gray-300"
              } ${className}`}
            />
            {error && (
              <Text className="text-xs text-red-600 mt-1">{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
}

interface PassInputProps {
  placeholder: string;
  label: string;
  required: boolean;
  name: string;
  className?: string;
  form: any;
}

export default function PassInput({
  label,
  placeholder,
  required,
  name,
  className,
  form,
}: PassInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { control } = form;
  return (
    <View>
      <Text>
        {label}
        {required && <Text className="text-red-500">*</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className="relative">
            <Input
              contextMenuHidden
              autoComplete="off"
              placeholder={placeholder}
              value={value?.toString() || ""}
              onChangeText={onChange}
              className={`border rounded-lg px-4 py-3 ${
                error ? "border-red-500" : "border-gray-300"
              } ${className}`}
              textContentType="password"
              secureTextEntry={!showPassword}
            />
            <Pressable
              className="absolute right-4 top-3"
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <Eye size={20} color={"gray"} />
              ) : (
                <EyeOff size={20} color={"gray"} />
              )}
            </Pressable>
            {error && (
              <Text className="text-xs text-red-600 mt-1">{error.message}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

export function BasicInputWithSideKey({
  placeholder,
  label,
  required,
  name,
  className,
  form,
  Stxt,
  keyBoardType,
}: BasicInputProps) {
  const { control } = form;

  return (
    <View>
      <Text className="py-2">
        {label} {!required && <Text className="text-red-600">*</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <View className="flex-row w-full items-center h-12">
              <Input
                keyboardType={keyBoardType as KeyboardTypeOptions | undefined}
                placeholder={placeholder}
                value={value?.toString() || ""}
                onChangeText={(text) => {
                  onChange(text.replace(/[^0-9.]/g, ""));
                }}
                className={`border rounded-l-lg px-4 py-3 h-full w-[85%] ${
                  error ? "border-red-500" : "border-gray-300"
                } ${className}`}
              />
              <View className="rounded-r-lg border-gray-300 bg-gray-300 flex items-center justify-center border w-[15%] h-full">
                <Text>{Stxt}</Text>
              </View>
            </View>
            {error && (
              <Text className="text-xs text-red-600 mt-1">{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
}
