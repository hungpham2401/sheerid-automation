import type React from "react";
import { useEffect, useRef } from "react";
import classNames from "classnames";
import type { ProgressLogEntry } from "~/types/verification";
import styles from "./progress-log.module.css";

interface ProgressLogProps {
  entries: ProgressLogEntry[];
  className?: string;
}

export const ProgressLog: React.FC<ProgressLogProps> = ({ entries, className }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", { hour12: false });
  };

  return (
    <div className={className}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Live Progress Log</h2>
        </div>
        <div className={styles.logContainer}>
          {entries.length === 0 ? (
            <div className={styles.empty}>No activity yet. Start a verification to see progress updates.</div>
          ) : (
            <>
              {entries.map((entry) => (
                <div key={entry.id} className={styles.logEntry}>
                  <div className={styles.logText}>
                    <span className={styles.timestamp}>{formatTime(entry.timestamp)}</span>
                    <span className={classNames(styles.message, styles[entry.type])}>{entry.message}</span>
                  </div>
                  {entry.screenshot && (
                    <div className={styles.screenshotContainer}>
                      <img 
                        src={entry.screenshot} 
                        alt="Progress screenshot" 
                        className={styles.screenshot}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div ref={logEndRef} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
