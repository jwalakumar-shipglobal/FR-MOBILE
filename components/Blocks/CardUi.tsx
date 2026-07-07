import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

interface CardUIProps {
  heading?: React.ReactNode
  headingBadge?: React.ReactNode
  subheading?: string
  content: React.ReactNode
  footer?: React.ReactNode
  className?: string
  headingClassName?: string
  contentClassName?: string
}


export default function CardUI({
  heading,
  headingBadge,
  subheading,
  content,
  footer,
  className,
  headingClassName,
  contentClassName,
}: CardUIProps) {
  return (
    <Card className={cn("min-w-xs gap-2 m-0 p-4 bg-white border-transparent", className)}>
      {heading && (
        <CardHeader className={cn("p-0 md:px-1 space-y-0.5", headingClassName)}>
          <CardTitle className={cn("text-lg font-semibold flex flex-col md:flex-row md:items-center md:gap-2")}>
            {heading} {headingBadge && headingBadge}
          </CardTitle>
          {subheading && <CardDescription>{subheading}</CardDescription>}
        </CardHeader>
      )}
      {footer && <CardFooter>{footer}</CardFooter>}
      <CardContent className={cn("p-0 md:px-1", contentClassName)}>{content}</CardContent>
    </Card>
  )
}