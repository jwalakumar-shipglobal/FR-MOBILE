import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

interface CommonAccordionProps {
  defaultValue?: string;
  accordionClassName?: string;
  accordionItemValue: string;
  accordionItemClassName?: string;
  accordionTrigger?: ReactNode;
  accordionTriggerClassName?: string;
  accordionContent?: ReactNode;
  accordionContentClassName?: string;
}

export function CommonAccordion({
  defaultValue,
  accordionClassName,
  accordionItemValue,
  accordionItemClassName,
  accordionTrigger,
  accordionTriggerClassName,
  accordionContent,
  accordionContentClassName,
}: CommonAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={`${accordionClassName} w-full max-w-lg`}
      defaultValue={defaultValue}
    >
      <AccordionItem
        value={accordionItemValue}
        className={accordionItemClassName}
      >
        <AccordionTrigger className={accordionTriggerClassName}>
          {accordionTrigger}
        </AccordionTrigger>
        <AccordionContent
          className={`flex flex-col gap-4 text-balance ${accordionContentClassName}`}
        >
          {accordionContent}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
