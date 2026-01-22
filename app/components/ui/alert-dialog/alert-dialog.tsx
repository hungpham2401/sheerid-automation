import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import classNames from "classnames";
import { Button } from "~/components/ui/button/button";
import styles from "./alert-dialog.module.css";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Overlay>> = ({
  className,
  ...props
}) => <AlertDialogPrimitive.Overlay className={classNames(styles.overlay, className)} {...props} />;
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Content>> = ({
  className,
  ...props
}) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content className={classNames(styles.content, className)} {...props} />
  </AlertDialogPortal>
);
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={classNames(styles.header, className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={classNames(styles.footer, className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Title>> = ({
  className,
  ...props
}) => <AlertDialogPrimitive.Title className={classNames(styles.title, className)} {...props} />;
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Description>> = ({
  className,
  ...props
}) => <AlertDialogPrimitive.Description className={classNames(styles.description, className)} {...props} />;
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Action>> = ({
  className,
  ...props
}) => (
  <AlertDialogPrimitive.Action className={classNames(styles.action, className)} asChild {...props}>
    <Button variant="destructive">{props.children}</Button>
  </AlertDialogPrimitive.Action>
);
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel: React.FC<React.ComponentProps<typeof AlertDialogPrimitive.Cancel>> = ({
  className,
  ...props
}) => (
  <AlertDialogPrimitive.Cancel className={classNames(styles.cancel, className)} asChild {...props}>
    <Button variant="outline" className={styles.cancelButton}>
      {props.children}
    </Button>
  </AlertDialogPrimitive.Cancel>
);
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
