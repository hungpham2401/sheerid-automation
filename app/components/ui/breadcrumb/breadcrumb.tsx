import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import classNames from "classnames";
import styles from "./breadcrumb.module.css";

const Breadcrumb: React.FC<React.ComponentProps<"nav"> & { separator?: React.ReactNode }> = ({ ...props }) => (
  <nav aria-label="breadcrumb" {...props} />
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList: React.FC<React.ComponentProps<"ol">> = ({ className, ...props }) => (
  <ol className={classNames(styles.list, className)} {...props} />
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem: React.FC<React.ComponentProps<"li">> = ({ className, ...props }) => (
  <li className={classNames(styles.item, className)} {...props} />
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink: React.FC<React.ComponentProps<"a"> & { asChild?: boolean }> = ({
  asChild,
  className,
  ...props
}) => {
  const Comp = asChild ? Slot : "a";
  return <Comp className={classNames(styles.link, className)} {...props} />;
};
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbSelected: React.FC<React.ComponentProps<"span">> = ({ className, ...props }) => (
  <span role="link" aria-disabled="true" className={classNames(styles.selected, className)} {...props} />
);
BreadcrumbSelected.displayName = "BreadcrumbSelected";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={classNames(styles.separator, className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span role="presentation" aria-hidden="true" className={classNames(styles.ellipsis, className)} {...props}>
    <MoreHorizontal />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSelected,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
