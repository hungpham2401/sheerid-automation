import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import classNames from "classnames";
import styles from "./switch.module.css";

const Switch: React.FC<React.ComponentProps<typeof SwitchPrimitives.Root>> = ({ className, ...props }) => (
  <SwitchPrimitives.Root className={classNames(styles.root, className)} {...props}>
    <SwitchPrimitives.Thumb className={styles.thumb} />
  </SwitchPrimitives.Root>
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
