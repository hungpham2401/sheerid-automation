import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import classNames from "classnames";
import styles from "./accordion.module.css";

const Accordion = AccordionPrimitive.Root;

const AccordionItem: React.FC<React.ComponentProps<typeof AccordionPrimitive.Item>> = ({ className, ...props }) => (
  <AccordionPrimitive.Item className={classNames(styles.item, className)} {...props} />
);
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const AccordionTrigger: React.FC<React.ComponentProps<typeof AccordionPrimitive.Trigger>> = ({
  className,
  children,
  ...props
}) => (
  <AccordionPrimitive.Header className={styles.header}>
    <AccordionPrimitive.Trigger className={classNames(styles.trigger, className)} {...props}>
      {children}
      <ChevronDown className={styles.chevron} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent: React.FC<React.ComponentProps<typeof AccordionPrimitive.Content>> = ({
  className,
  children,
  ...props
}) => (
  <AccordionPrimitive.Content className={styles.content} {...props}>
    <div className={classNames(styles.contentInner, className)}>{children}</div>
  </AccordionPrimitive.Content>
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
