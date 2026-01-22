import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import classNames from "classnames";
import styles from "./avatar.module.css";

const Avatar: React.FC<React.ComponentProps<typeof AvatarPrimitive.Root>> = ({ className, ...props }) => (
  <AvatarPrimitive.Root className={classNames(styles.root, className)} {...props} />
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage: React.FC<React.ComponentProps<typeof AvatarPrimitive.Image>> = ({ className, ...props }) => (
  <AvatarPrimitive.Image className={classNames(styles.image, className)} {...props} />
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback: React.FC<React.ComponentProps<typeof AvatarPrimitive.Fallback>> = ({ className, ...props }) => (
  <AvatarPrimitive.Fallback className={classNames(styles.fallback, className)} {...props} />
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
