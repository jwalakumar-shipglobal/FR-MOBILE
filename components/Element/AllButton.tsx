import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface BtnWithLoadingProps {
  title: string;
  loading?: boolean;
  BtnclassName?: string;
  txtClassName?: string;
  onPress?: any;
}

export default function BtnWithLoading({
  title,
  loading,
  BtnclassName,
  txtClassName,
  ...props
}: BtnWithLoadingProps) {
  return (
    <View>
      <TouchableOpacity
        className={`${BtnclassName} cursor-pointer flex items-center justify-center`}
        {...props}
      >
        <Text className={`${txtClassName} `}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

