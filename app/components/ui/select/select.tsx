import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import classNames from "classnames";
import styles from "./select.module.css";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger: React.FC<React.ComponentProps<typeof SelectPrimitive.Trigger>> = ({
  className,
  children,
  ...props
}) => (
  <SelectPrimitive.Trigger className={classNames(styles.trigger, className)} {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className={styles.icon} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton: React.FC<React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>> = ({
  className,
  ...props
}) => (
  <SelectPrimitive.ScrollUpButton className={classNames(styles.scrollButton, className)} {...props}>
    <ChevronUp className={styles.icon} />
  </SelectPrimitive.ScrollUpButton>
);
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton: React.FC<React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>> = ({
  className,
  ...props
}) => (
  <SelectPrimitive.ScrollDownButton className={classNames(styles.scrollButton, className)} {...props}>
    <ChevronDown className={styles.icon} />
  </SelectPrimitive.ScrollDownButton>
);
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent: React.FC<React.ComponentProps<typeof SelectPrimitive.Content>> = ({
  className,
  children,
  position = "popper",
  ...props
}) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content className={classNames(styles.content, className)} position={position} {...props}>
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport className={classNames(styles.viewport, position === "popper" && styles.viewportPopper)}>
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel: React.FC<React.ComponentProps<typeof SelectPrimitive.Label>> = ({ className, ...props }) => (
  <SelectPrimitive.Label className={classNames(styles.label, className)} {...props} />
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem: React.FC<React.ComponentProps<typeof SelectPrimitive.Item>> = ({ className, children, ...props }) => (
  <SelectPrimitive.Item className={classNames(styles.item, className)} {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className={styles.indicator}>
      <SelectPrimitive.ItemIndicator>
        <Check className={classNames(styles.icon, styles.indicatorIcon)} />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator: React.FC<React.ComponentProps<typeof SelectPrimitive.Separator>> = ({ className, ...props }) => (
  <SelectPrimitive.Separator className={classNames(styles.separator, className)} {...props} />
);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
