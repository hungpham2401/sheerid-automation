import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import classNames from "classnames";
import styles from "./pagination.module.css";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav role="navigation" aria-label="pagination" className={classNames(styles.nav, className)} {...props} />
);
Pagination.displayName = "Pagination";

const PaginationContent: React.FC<React.ComponentProps<"ul">> = ({ className, ...props }) => (
  <ul className={classNames(styles.list, className)} {...props} />
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem: React.FC<React.ComponentProps<"li">> = ({ className, ...props }) => (
  <li className={classNames(styles.item, className)} {...props} />
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  size?: "default" | "icon";
} & React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={classNames(
      styles.link,
      isActive ? styles.pageActive : styles.page,
      size === "icon" && styles.linkIcon,
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={classNames(styles.directionLink, styles.previous, className)}
    {...props}
  >
    <ChevronLeft className={styles.icon} />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={classNames(styles.directionLink, styles.next, className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className={styles.icon} />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={classNames(styles.ellipsis, className)} {...props}>
    <MoreHorizontal className={styles.ellipsis} />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
