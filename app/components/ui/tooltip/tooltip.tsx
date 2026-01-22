import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import classNames from "classnames";
import styles from "./tooltip.module.css";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipPortal = TooltipPrimitive.Portal;

const TooltipContent: React.FC<React.ComponentProps<typeof TooltipPrimitive.Content>> = ({
  className,
  sideOffset = 4,
  ...props
}) => <TooltipPrimitive.Content sideOffset={sideOffset} className={classNames(styles.content, className)} {...props} />;
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipPortal };
