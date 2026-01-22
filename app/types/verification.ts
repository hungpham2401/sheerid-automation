export type VerificationStatus = "success" | "pending" | "failure" | "processing";

export interface StudentProfile {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  studentId?: string;
  phone?: string;
}

export interface VerificationResult {
  id: string;
  timestamp: string;
  status: VerificationStatus;
  studentName: string;
  school: string;
  verificationId?: string;
  redirectUrl?: string;
  errorMessage?: string;
}

export interface ProgressLogEntry {
  id: string;
  timestamp: string;
  type: "info" | "success" | "error" | "warning";
  message: string;
  screenshot?: string;
}
