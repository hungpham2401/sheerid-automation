import * as React from "react";
import classNames from "classnames";
import styles from "./table.module.css";

const Table: React.FC<React.ComponentProps<"table">> = ({ className, ...props }) => (
  <div className={styles.wrapper}>
    <table className={classNames(styles.table, className)} {...props} />
  </div>
);
Table.displayName = "Table";

const TableHeader: React.FC<React.ComponentProps<"thead">> = ({ className, ...props }) => (
  <thead className={classNames(styles.header, className)} {...props} />
);
TableHeader.displayName = "TableHeader";

const TableBody: React.FC<React.ComponentProps<"tbody">> = ({ className, ...props }) => (
  <tbody className={classNames(styles.body, className)} {...props} />
);
TableBody.displayName = "TableBody";

const TableFooter: React.FC<React.ComponentProps<"tfoot">> = ({ className, ...props }) => (
  <tfoot className={classNames(styles.footer, className)} {...props} />
);
TableFooter.displayName = "TableFooter";

const TableRow: React.FC<React.ComponentProps<"tr">> = ({ className, ...props }) => (
  <tr className={classNames(styles.row, className)} {...props} />
);
TableRow.displayName = "TableRow";

const TableHead: React.FC<React.ComponentProps<"th">> = ({ className, ...props }) => (
  <th className={classNames(styles.head, className)} {...props} />
);
TableHead.displayName = "TableHead";

const TableCell: React.FC<React.ComponentProps<"td">> = ({ className, ...props }) => (
  <td className={classNames(styles.cell, className)} {...props} />
);
TableCell.displayName = "TableCell";

const TableCaption: React.FC<React.ComponentProps<"caption">> = ({ className, ...props }) => (
  <caption className={classNames(styles.caption, className)} {...props} />
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
