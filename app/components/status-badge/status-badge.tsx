import type React from "react";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import classNames from "classnames";
import styles from "./status-badge.module.css";
import type { VerificationStatus } from "~/types/verification";

interface StatusBadgeProps {
  /**
   * The verification status to display
   * @important
   * @enum success, pending, failure, processing
   */
  status: VerificationStatus;
  className?: string;
}

const STATUS_CONFIG = {
  success: {
    icon: CheckCircle,
    label: "Success",
  },
  pending: {
    icon: Clock,
    label: "Pending",
  },
  failure: {
    icon: XCircle,
    label: "Failed",
  },
  processing: {
    icon: Loader2,
    label: "Processing",
  },
} as const;

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span className={classNames(styles.badge, styles[status], className)}>
      <Icon className={styles.icon} />
      {config.label}
    </span>
  );
};
