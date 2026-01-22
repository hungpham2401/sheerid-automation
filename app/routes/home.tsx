import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/home";
import { VerificationForm } from "~/components/verification-form/verification-form";
import { ProgressLog } from "~/components/progress-log/progress-log";
import { ResultsTable } from "~/components/results-table/results-table";
import { MOCK_VERIFICATION_RESULTS } from "~/data/mock-verification-data";
import type { ProgressLogEntry, VerificationResult, StudentProfile } from "~/types/verification";
import { executeVerification } from "~/services/verification-service";
import styles from "./home.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SheerGenie - Student Verification Automation" },
    {
      name: "description",
      content: "Simplify and automate SheerID student verification with SheerGenie",
    },
  ];
}

/**
 * Server action to handle verification requests
 */
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const sheerIdUrl = data.sheerIdUrl as string;
  const school = data.school as string;
  const studentProfile = JSON.parse(data.studentProfile as string);
  const studentName = `${studentProfile.firstName} ${studentProfile.lastName}`;

  // API key is optional now - browser automation doesn't need it
  const apiKey = process.env.SHEERID_API_KEY;

  const progressEvents: ProgressLogEntry[] = [];

  try {
    const result = await executeVerification({
      sheerIdUrl,
      school,
      studentProfile,
      apiKey,
      onProgress: (progress) => {
        progressEvents.push({
          id: `log_${Date.now()}_${Math.random()}`,
          timestamp: new Date().toISOString(),
          type: progress.status,
          message: progress.message,
        });
      },
    });

    return {
      success: result.success,
      verificationId: result.verificationId,
      redirectUrl: result.redirectUrl,
      errorMessage: result.errorMessage,
      screenshots: result.screenshots,
      studentName,
      school,
      progressEvents,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      studentName,
      school,
      progressEvents,
    };
  }
}

export default function Home() {
  const fetcher = useFetcher<typeof action>();
  const [logEntries, setLogEntries] = useState<ProgressLogEntry[]>([]);
  const [results, setResults] = useState<VerificationResult[]>(MOCK_VERIFICATION_RESULTS);

  const isProcessing = fetcher.state !== "idle";

  // Handle fetcher data when it comes back
  useEffect(() => {
    if (!fetcher.data || fetcher.state !== "idle") return;

    const data = fetcher.data;

    // Add progress events from server
    if (data.progressEvents && data.progressEvents.length > 0) {
      setLogEntries((prev) => {
        const newIds = new Set(data.progressEvents.map((e: ProgressLogEntry) => e.id));
        const filtered = prev.filter((e) => !newIds.has(e.id));
        return [...filtered, ...data.progressEvents];
      });
    }

    // Add result to table
    const newResult: VerificationResult = {
      id: `ver_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: data.success ? "success" : "failure",
      studentName: data.studentName || "Unknown",
      school: data.school || "Unknown",
      verificationId: data.verificationId,
      redirectUrl: data.redirectUrl,
      errorMessage: data.errorMessage || data.error,
    };

    setResults((prev) => {
      // Prevent duplicates
      if (prev[0]?.timestamp === newResult.timestamp) {
        return prev;
      }
      return [newResult, ...prev];
    });
  }, [fetcher.data, fetcher.state]);

  const handleVerification = (data: { sheerIdUrl: string; school: string; studentProfile: StudentProfile }) => {
    const { sheerIdUrl, school, studentProfile } = data;
    const studentName = `${studentProfile.firstName} ${studentProfile.lastName}`;

    // Clear previous logs for this run
    setLogEntries([]);

    // Add initial log entry
    setLogEntries([
      {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: "info",
        message: `Starting verification for ${studentName}`,
      },
    ]);

    // Submit to server action
    const formData = new FormData();
    formData.append("sheerIdUrl", sheerIdUrl);
    formData.append("school", school);
    formData.append("studentProfile", JSON.stringify(studentProfile));

    fetcher.submit(formData, { method: "post" });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.branding}>
          <Sparkles className={styles.logo} />
          <h1 className={styles.title}>SheerGenie</h1>
        </div>
        <p className={styles.subtitle}>
          Automate SheerID student verification with intelligent profile generation and seamless document submission
        </p>
      </header>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <VerificationForm onSubmit={handleVerification} isProcessing={isProcessing} />
          <ProgressLog entries={logEntries} />
        </div>

        <ResultsTable results={results} />
      </div>
    </div>
  );
}
