import * as React from "react";
import classNames from "classnames";
import styles from "./card.module.css";

const Card: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={classNames(styles.card, className)} {...props} />
);
Card.displayName = "Card";

const CardHeader: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={classNames(styles.header, className)} {...props} />
);
CardHeader.displayName = "CardHeader";

const CardTitle: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={classNames(styles.title, className)} {...props} />
);
CardTitle.displayName = "CardTitle";

const CardDescription: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={classNames(styles.description, className)} {...props} />
);
CardDescription.displayName = "CardDescription";

const CardContent: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={classNames(styles.content, className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div className={classNames(styles.footer, className)} {...props} />
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
