import type { VerificationResult } from "~/types/verification";

export const MOCK_VERIFICATION_RESULTS: VerificationResult[] = [
  {
    id: "ver_1a2b3c4d",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: "success",
    studentName: "Emma Johnson",
    school: "Penn State University Park",
    verificationId: "SID-2024-001234",
    redirectUrl: "https://example.com/success?token=abc123",
  },
  {
    id: "ver_5e6f7g8h",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: "pending",
    studentName: "Michael Chen",
    school: "Penn State Harrisburg",
    verificationId: "SID-2024-001235",
  },
  {
    id: "ver_9i0j1k2l",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    status: "failure",
    studentName: "Sarah Williams",
    school: "Penn State Altoona",
    errorMessage: "Document verification failed - image quality too low",
  },
];
