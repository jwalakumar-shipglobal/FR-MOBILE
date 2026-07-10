import { cn } from "@/lib/utils";
import { Platform, TextInput } from "react-native";

function Input({
  className,
  ...props
}: React.ComponentProps<typeof TextInput> &
  React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        "h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-base text-black",
        "shadow-sm shadow-black/5 focus:border-blue-900",
        "placeholder:text-gray-400",
        props.editable === false &&
          cn(
            "opacity-60 bg-gray-100",
            Platform.select({
              web: "disabled:pointer-events-none disabled:cursor-not-allowed",
            })
          ),
        Platform.select({
          web: cn(
            "outline-none transition-all duration-200",
            "focus:border-blue-900 focus:ring-2 focus:ring-blue-200",
            "selection:bg-blue-900 selection:text-white",
            "aria-invalid:border-red-500 aria-invalid:ring-red-200"
          ),
          native: "",
        }),

        className
      )}
      {...props}
    />
  );
}

export { Input };