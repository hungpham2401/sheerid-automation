import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import classNames from "classnames";
import styles from "./tabs.module.css";

const Tabs = TabsPrimitive.Root;

const TabsList: React.FC<React.ComponentProps<typeof TabsPrimitive.List>> = ({ className, ...props }) => (
  <TabsPrimitive.List className={classNames(styles.list, className)} {...props} />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger: React.FC<React.ComponentProps<typeof TabsPrimitive.Trigger>> = ({ className, ...props }) => (
  <TabsPrimitive.Trigger className={classNames(styles.trigger, className)} {...props} />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent: React.FC<React.ComponentProps<typeof TabsPrimitive.Content>> = ({ className, ...props }) => (
  <TabsPrimitive.Content className={classNames(styles.content, className)} {...props} />
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
