import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import classNames from "classnames";
import styles from "./separator.module.css";

const Separator: React.FC<React.ComponentProps<typeof SeparatorPrimitive.Root>> = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) => (
  <SeparatorPrimitive.Root
    decorative={decorative}
    orientation={orientation}
    className={classNames(styles.root, orientation === "horizontal" ? styles.horizontal : styles.vertical, className)}
    {...props}
  />
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
