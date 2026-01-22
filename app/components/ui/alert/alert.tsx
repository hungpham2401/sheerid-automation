import * as React from "react";
import classNames from "classnames";
import styles from "./alert.module.css";

interface AlertProps extends React.ComponentProps<"div"> {
  variant?: "default" | "destructive";
}

const Alert: React.FC<AlertProps> = ({ className, variant = "default", ...props }) => (
  <div role="alert" className={classNames(styles.alert, styles[variant], className)} {...props} />
);
Alert.displayName = "Alert";

const AlertTitle: React.FC<React.ComponentProps<"h5">> = ({ className, ...props }) => (
  <h5 className={classNames(styles.title, className)} {...props} />
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={classNames(styles.description, className)} {...props} />
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
