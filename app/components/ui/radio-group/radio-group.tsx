import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import classNames from "classnames";
import styles from "./radio-group.module.css";

const RadioGroup: React.FC<React.ComponentProps<typeof RadioGroupPrimitive.Root>> = ({ className, ...props }) => (
  <RadioGroupPrimitive.Root className={classNames(styles.root, className)} {...props} />
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem: React.FC<React.ComponentProps<typeof RadioGroupPrimitive.Item>> = ({ className, ...props }) => (
  <label className={styles.label}>
    <RadioGroupPrimitive.Item className={classNames(styles.item, className)} {...props}>
      <RadioGroupPrimitive.Indicator className={styles.indicator}>
        <Circle className={styles.icon} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
    <span className={styles.labelText}>{props.value}</span>
  </label>
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
