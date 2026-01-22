import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import classNames from "classnames";
import styles from "./popover.module.css";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent: React.FC<React.ComponentProps<typeof PopoverPrimitive.Content>> = ({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      className={classNames(styles.content, className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
