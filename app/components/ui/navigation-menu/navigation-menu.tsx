import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import classNames from "classnames";
import styles from "./navigation-menu.module.css";

const NavigationMenu: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.Root>> = ({
  className,
  children,
  ...props
}) => (
  <NavigationMenuPrimitive.Root className={classNames(styles.root, className)} {...props}>
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
);
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.List>> = ({
  className,
  ...props
}) => <NavigationMenuPrimitive.List className={classNames(styles.list, className)} {...props} />;
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const NavigationMenuTrigger: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>> = ({
  className,
  children,
  ...props
}) => (
  <NavigationMenuPrimitive.Trigger className={classNames(styles.trigger, className)} {...props}>
    {children} <ChevronDown className={styles.chevron} aria-hidden="true" />
  </NavigationMenuPrimitive.Trigger>
);
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.Content>> = ({
  className,
  ...props
}) => <NavigationMenuPrimitive.Content className={classNames(styles.content, className)} {...props} />;
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>> = ({
  className,
  ...props
}) => (
  <div className={styles.viewportWrapper}>
    <NavigationMenuPrimitive.Viewport className={classNames(styles.viewport, className)} {...props} />
  </div>
);
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>> = ({
  className,
  ...props
}) => (
  <NavigationMenuPrimitive.Indicator className={classNames(styles.indicator, className)} {...props}>
    <div className={styles.arrow} />
  </NavigationMenuPrimitive.Indicator>
);
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
