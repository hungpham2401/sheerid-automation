import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import classNames from "classnames";
import styles from "./context-menu.module.css";

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger: React.FC<
  React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }
> = ({ className, inset, children, ...props }) => (
  <ContextMenuPrimitive.SubTrigger
    className={classNames(styles.subTrigger, inset && styles.inset, className)}
    {...props}
  >
    {children}
    <ChevronRight className={styles.chevron} />
  </ContextMenuPrimitive.SubTrigger>
);
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent: React.FC<React.ComponentProps<typeof ContextMenuPrimitive.SubContent>> = ({
  className,
  ...props
}) => <ContextMenuPrimitive.SubContent className={classNames(styles.content, className)} {...props} />;
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent: React.FC<React.ComponentProps<typeof ContextMenuPrimitive.Content>> = ({
  className,
  ...props
}) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content className={classNames(styles.content, className)} {...props} />
  </ContextMenuPrimitive.Portal>
);
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem: React.FC<React.ComponentProps<typeof ContextMenuPrimitive.Item> & { inset?: boolean }> = ({
  className,
  inset,
  ...props
}) => <ContextMenuPrimitive.Item className={classNames(styles.item, inset && styles.inset, className)} {...props} />;
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem: React.FC<React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>> = ({
  className,
  children,
  ...props
}) => (
  <ContextMenuPrimitive.CheckboxItem className={classNames(styles.checkbox, className)} {...props}>
    <span className={styles.indicator}>
      <ContextMenuPrimitive.ItemIndicator>
        <Check className={styles.icon} />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
);
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem: React.FC<React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>> = ({
  className,
  children,
  ...props
}) => (
  <ContextMenuPrimitive.RadioItem className={classNames(styles.checkbox, className)} {...props}>
    <span className={styles.indicator}>
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className={styles.circleIcon} />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
);
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel: React.FC<React.ComponentProps<typeof ContextMenuPrimitive.Label> & { inset?: boolean }> = ({
  className,
  inset,
  ...props
}) => <ContextMenuPrimitive.Label className={classNames(styles.label, inset && styles.inset, className)} {...props} />;
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator: React.FC<React.ComponentProps<typeof ContextMenuPrimitive.Separator>> = ({
  className,
  ...props
}) => <ContextMenuPrimitive.Separator className={classNames(styles.separator, className)} {...props} />;
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span className={classNames(styles.shortcut, className)} {...props} />
);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
