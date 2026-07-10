import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { Check } from "lucide-react-native";
import { Platform } from "react-native";

const DEFAULT_HIT_SLOP = 24;

function Checkbox({
  className,
  checkedClassName,
  indicatorClassName,
  iconClassName,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  checkedClassName?: string;
  indicatorClassName?: string;
  iconClassName?: string;
}) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "h-5 w-5 rounded border-2 border-blue-600 bg-white",
        Platform.select({
          web: "focus-visible:ring-2 focus-visible:ring-blue-400 outline-none transition-all",
          native: "overflow-hidden",
        }),
        props.checked && cn("bg-blue-600 border-blue-600", checkedClassName),
        props.disabled && "opacity-50",
        className,
      )}
      hitSlop={DEFAULT_HIT_SLOP}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "h-full w-full items-center justify-center bg-blue-600",
          indicatorClassName,
        )}
      >
        <Icon
          as={Check}
          size={13}
          strokeWidth={3}
          className={cn("text-white", iconClassName)}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
