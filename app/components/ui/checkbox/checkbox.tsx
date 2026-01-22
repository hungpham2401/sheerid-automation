import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import classNames from "classnames";
import styles from "./checkbox.module.css";

const Checkbox: React.FC<React.ComponentProps<typeof CheckboxPrimitive.Root>> = ({ className, ...props }) => (
  <CheckboxPrimitive.Root className={classNames(styles.root, className)} {...props}>
    <CheckboxPrimitive.Indicator className={styles.indicator}>
      <Check className={styles.icon} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
