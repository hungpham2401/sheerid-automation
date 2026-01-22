import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import classNames from "classnames";
import styles from "./scroll-area.module.css";

const ScrollArea: React.FC<React.ComponentProps<typeof ScrollAreaPrimitive.Root>> = ({
  className,
  children,
  ...props
}) => (
  <ScrollAreaPrimitive.Root className={classNames(styles.root, className)} {...props}>
    <ScrollAreaPrimitive.Viewport className={styles.viewport}>{children}</ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar: React.FC<React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>> = ({
  className,
  orientation = "vertical",
  ...props
}) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    orientation={orientation}
    className={classNames(
      styles.scrollbar,
      orientation === "vertical" ? styles.scrollbarVertical : styles.scrollbarHorizontal,
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className={styles.thumb} />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
