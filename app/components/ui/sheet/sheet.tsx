import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import classNames from "classnames";
import styles from "./sheet.module.css";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay: React.FC<React.ComponentProps<typeof SheetPrimitive.Overlay>> = ({ className, ...props }) => (
  <SheetPrimitive.Overlay className={classNames(styles.overlay, className)} {...props} />
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

interface SheetContentProps extends React.ComponentProps<typeof SheetPrimitive.Content> {
  side?: "top" | "right" | "bottom" | "left";
}

const SheetContent: React.FC<SheetContentProps> = ({ side = "right", className, children, ...props }) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      className={classNames(
        styles.content,
        {
          [styles.contentTop]: side === "top",
          [styles.contentRight]: side === "right",
          [styles.contentBottom]: side === "bottom",
          [styles.contentLeft]: side === "left",
        },
        className
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className={styles.closeButton}>
        <X className={styles.closeIcon} />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={classNames(styles.header, className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={classNames(styles.footer, className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle: React.FC<React.ComponentProps<typeof SheetPrimitive.Title>> = ({ className, ...props }) => (
  <SheetPrimitive.Title className={classNames(styles.title, className)} {...props} />
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription: React.FC<React.ComponentProps<typeof SheetPrimitive.Description>> = ({
  className,
  ...props
}) => <SheetPrimitive.Description className={classNames(styles.description, className)} {...props} />;
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
