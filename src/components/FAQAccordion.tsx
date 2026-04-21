import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className=" px-4"
        >
          <AccordionTrigger className="text-left font-mono text-lg md:text-xl text-gray-900 hover:no-underline">
            {item.question}
          </AccordionTrigger>

          <AccordionContent className="font-sans text-base md:text-lg leading-relaxed text-gray-700">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}