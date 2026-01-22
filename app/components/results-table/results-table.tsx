import type React from "react";
import { FileSearch } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table/table";
import { StatusBadge } from "~/components/status-badge/status-badge";
import type { VerificationResult } from "~/types/verification";
import styles from "./results-table.module.css";

interface ResultsTableProps {
  results: VerificationResult[];
  className?: string;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results, className }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={className}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Verification Results</h2>
          <p className={styles.description}>Complete history of all initiated verification requests</p>
        </div>

        {results.length === 0 ? (
          <div className={styles.empty}>
            <FileSearch className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No Verifications Yet</h3>
            <p className={styles.emptyText}>
              Your verification history will appear here once you submit your first request.
            </p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verification ID</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className={styles.timestampCell}>{formatTimestamp(result.timestamp)}</TableCell>
                    <TableCell>{result.studentName}</TableCell>
                    <TableCell>{result.school}</TableCell>
                    <TableCell>
                      <StatusBadge status={result.status} />
                    </TableCell>
                    <TableCell className={styles.idCell}>{result.verificationId || "—"}</TableCell>
                    <TableCell>
                      {result.redirectUrl ? (
                        <a href={result.redirectUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                          View Details
                        </a>
                      ) : result.errorMessage ? (
                        <span className={styles.errorCell} title={result.errorMessage}>
                          {result.errorMessage}
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
