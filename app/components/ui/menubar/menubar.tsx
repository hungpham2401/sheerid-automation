import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import classNames from "classnames";
import styles from "./menubar.module.css";

const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar: React.FC<React.ComponentProps<typeof MenubarPrimitive.Root>> = ({ className, ...props }) => (
  <MenubarPrimitive.Root className={classNames(styles.root, className)} {...props} />
);
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger: React.FC<React.ComponentProps<typeof MenubarPrimitive.Trigger>> = ({ className, ...props }) => (
  <MenubarPrimitive.Trigger className={classNames(styles.trigger, className)} {...props} />
);
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger: React.FC<React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }> = ({
  className,
  inset,
  children,
  ...props
}) => (
  <MenubarPrimitive.SubTrigger className={classNames(styles.subTrigger, inset && styles.inset, className)} {...props}>
    {children}
    <ChevronRight className={styles.chevron} />
  </MenubarPrimitive.SubTrigger>
);
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent: React.FC<React.ComponentProps<typeof MenubarPrimitive.SubContent>> = ({
  className,
  ...props
}) => <MenubarPrimitive.SubContent className={classNames(styles.subContent, className)} {...props} />;
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent: React.FC<React.ComponentProps<typeof MenubarPrimitive.Content>> = ({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={classNames(styles.content, className)}
      {...props}
    />
  </MenubarPrimitive.Portal>
);
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem: React.FC<React.ComponentProps<typeof MenubarPrimitive.Item> & { inset?: boolean }> = ({
  className,
  inset,
  ...props
}) => <MenubarPrimitive.Item className={classNames(styles.item, inset && styles.inset, className)} {...props} />;
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem: React.FC<React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>> = ({
  className,
  children,
  checked,
  ...props
}) => (
  <MenubarPrimitive.CheckboxItem className={classNames(styles.checkbox, className)} checked={checked} {...props}>
    <span className={styles.indicator}>
      <MenubarPrimitive.ItemIndicator>
        <Check className={styles.icon} />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
);
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem: React.FC<React.ComponentProps<typeof MenubarPrimitive.RadioItem>> = ({
  className,
  children,
  ...props
}) => (
  <MenubarPrimitive.RadioItem className={classNames(styles.checkbox, className)} {...props}>
    <span className={styles.indicator}>
      <MenubarPrimitive.ItemIndicator>
        <Circle className={styles.circleIcon} />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
);
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel: React.FC<React.ComponentProps<typeof MenubarPrimitive.Label> & { inset?: boolean }> = ({
  className,
  inset,
  ...props
}) => <MenubarPrimitive.Label className={classNames(styles.label, inset && styles.inset, className)} {...props} />;
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator: React.FC<React.ComponentProps<typeof MenubarPrimitive.Separator>> = ({
  className,
  ...props
}) => <MenubarPrimitive.Separator className={classNames(styles.separator, className)} {...props} />;
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span className={classNames(styles.shortcut, className)} {...props} />
);
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
