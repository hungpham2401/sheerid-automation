import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import classNames from "classnames";
import styles from "./drawer.module.css";

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay: React.FC<React.ComponentProps<typeof DrawerPrimitive.Overlay>> = ({ className, ...props }) => (
  <DrawerPrimitive.Overlay className={classNames(styles.overlay, className)} {...props} />
);
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent: React.FC<React.ComponentProps<typeof DrawerPrimitive.Content>> = ({
  className,
  children,
  ...props
}) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content className={classNames(styles.content, className)} {...props}>
      <div className={styles.handle} />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={classNames(styles.header, className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={classNames(styles.footer, className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle: React.FC<React.ComponentProps<typeof DrawerPrimitive.Title>> = ({ className, ...props }) => (
  <DrawerPrimitive.Title className={classNames(styles.title, className)} {...props} />
);
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription: React.FC<React.ComponentProps<typeof DrawerPrimitive.Description>> = ({
  className,
  ...props
}) => <DrawerPrimitive.Description className={classNames(styles.description, className)} {...props} />;
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
