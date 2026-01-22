import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import classNames from "classnames";
import styles from "./toggle-group.module.css";

interface ToggleVariants {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const ToggleGroupContext = React.createContext<ToggleVariants>({
  size: "default",
  variant: "default",
});

const ToggleGroup: React.FC<React.ComponentProps<typeof ToggleGroupPrimitive.Root> & ToggleVariants> = ({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}) => (
  <ToggleGroupPrimitive.Root className={classNames(styles.root, className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
);
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem: React.FC<React.ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleVariants> = ({
  className,
  children,
  variant,
  size,
  ...props
}) => {
  const context = React.useContext(ToggleGroupContext);
  const itemVariant = variant || context.variant;
  const itemSize = size || context.size;

  return (
    <ToggleGroupPrimitive.Item
      className={classNames(
        styles.item,
        itemVariant === "default" && styles.itemDefault,
        itemVariant === "outline" && styles.itemOutline,
        itemSize === "sm" && styles.sizeSm,
        itemSize === "default" && styles.sizeDefault,
        itemSize === "lg" && styles.sizeLg,
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
};
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
