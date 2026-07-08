import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { ActivityIndicator, Text } from "react-native";

interface ReusableButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  "variant"
> {
  title: string | React.ReactNode;
  loading?: boolean;
  textClassName?: string;
  buttonVariant?:
    | "primary"
    | "secondary"
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
}

const ReusableButton = ({
  title,
  loading = false,
  buttonVariant = "primary",
  className,
  textClassName,
  disabled,
  onPress,
  ...rest
}: ReusableButtonProps) => {
  const isPrimary = buttonVariant === "primary";

  return (
    <Button
      {...rest}
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        "w-full disabled:opacity-70",
        isPrimary ? "bg-blue-900" : "bg-transparent shadow-none",
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#fff" : "#1e3a8a"} />
      ) : (
        <Text
          className={cn(
            "font-semibold",
            isPrimary ? "text-white" : "text-blue-900",
          )}
        >
          {title}
        </Text>
      )}
    </Button>
  );
};

export default ReusableButton;
