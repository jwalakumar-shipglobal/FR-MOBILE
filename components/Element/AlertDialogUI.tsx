import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";

import { cn } from "@/lib/utils";
import { Text } from "react-native";
import ReusableButton from "./AllButton";

interface AppAlertDialogProps {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  body?: React.ReactNode;
  actionText?: string;
  cancelText?: string;
  onAction?: () => void;
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  footerClassName?: string;
  actionClassName?: string;
  cancelClassName?: string;
  cancelTextClassName?: string;
}

const AppAlertDialog = ({
  body,
  children,
  title,
  description,
  actionText = "Continue",
  cancelText = "Cancel",
  onAction,
  onCancel,
  open,
  onOpenChange,
  contentClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  footerClassName,
  actionClassName,
  cancelClassName,
  cancelTextClassName,
}: AppAlertDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className={cn("sm:max-w-md", contentClassName)}>
        <AlertDialogHeader className={headerClassName}>
          <AlertDialogTitle className={titleClassName}>
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription className={descriptionClassName}>
              {description}
            </AlertDialogDescription>
          )}
          {body}
        </AlertDialogHeader>
        <AlertDialogFooter className={cn("flex-col gap-3", footerClassName)}>
          <AlertDialogAction
            className={cn("w-full rounded-xl bg-blue-900", actionClassName)}
          >
            <ReusableButton
              title={actionText}
              onPress={onAction}
              className={actionClassName}
            />
          </AlertDialogAction>
          <AlertDialogCancel
            className={cn(
              "w-full rounded-xl border border-blue-900 bg-white",
              cancelClassName,
            )}
            onPress={onCancel}
          >
            <Text className={cn("text-blue-900", cancelTextClassName)}>
              {cancelText}
            </Text>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppAlertDialog;
