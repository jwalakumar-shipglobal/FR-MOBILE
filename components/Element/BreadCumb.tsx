import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

interface BreadcrumbProps {
  className?: string;
  pageTitle: string;
  firstStep?: string;
  secondStep?: string;
  thirdStep?: string;
  forthStep?: string;
}

export default function BreadCumb({
  className,
  pageTitle,
  firstStep,
  secondStep,
  thirdStep,
  forthStep,
}: BreadcrumbProps) {
  return (
    <View className={`bg-transparent flex-col my-2 p-2 rounded ${className}`}>
      <View>
        <Text className="text-lg font-semibold">{pageTitle}</Text>
      </View>
      <View className="flex-row items-center">
        <Text>{firstStep}</Text>
        {secondStep && (
          <View>
            <ChevronRight size={14} />
          </View>
        )}
        <Text>{secondStep}</Text>
        {thirdStep && (
          <View>
            <ChevronRight size={14} />
          </View>
        )}
        <Text>{thirdStep}</Text>
        {forthStep && (
          <View>
            <ChevronRight size={14} />
          </View>
        )}
        <Text>{forthStep}</Text>
      </View>
    </View>
  );
}
