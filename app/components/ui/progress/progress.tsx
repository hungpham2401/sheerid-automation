import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import classNames from "classnames";
import styles from "./progress.module.css";

const Progress: React.FC<React.ComponentProps<typeof ProgressPrimitive.Root>> = ({ className, value, ...props }) => (
  <ProgressPrimitive.Root className={classNames(styles.root, className)} {...props}>
    <ProgressPrimitive.Indicator
      className={styles.indicator}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
