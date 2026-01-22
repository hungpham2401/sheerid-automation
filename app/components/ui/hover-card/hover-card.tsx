import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import classNames from "classnames";
import styles from "./hover-card.module.css";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent: React.FC<React.ComponentProps<typeof HoverCardPrimitive.Content>> = ({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) => (
  <HoverCardPrimitive.Content
    align={align}
    sideOffset={sideOffset}
    className={classNames(styles.content, className)}
    {...props}
  />
);
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
