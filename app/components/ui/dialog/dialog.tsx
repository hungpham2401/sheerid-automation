import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import classNames from "classnames";
import styles from "./dialog.module.css";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay: React.FC<React.ComponentProps<typeof DialogPrimitive.Overlay>> = ({ className, ...props }) => (
  <DialogPrimitive.Overlay className={classNames(styles.overlay, className)} {...props} />
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent: React.FC<React.ComponentProps<typeof DialogPrimitive.Content>> = ({
  className,
  children,
  ...props
}) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content className={classNames(styles.content, className)} {...props}>
      {children}
      <DialogPrimitive.Close className={styles.closeButton}>
        <X className={styles.closeIcon} />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={classNames(styles.header, className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={classNames(styles.footer, className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle: React.FC<React.ComponentProps<typeof DialogPrimitive.Title>> = ({ className, ...props }) => (
  <DialogPrimitive.Title className={classNames(styles.title, className)} {...props} />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription: React.FC<React.ComponentProps<typeof DialogPrimitive.Description>> = ({
  className,
  ...props
}) => <DialogPrimitive.Description className={classNames(styles.description, className)} {...props} />;
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
