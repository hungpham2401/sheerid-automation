/**
 * Main Verification Service
 * Orchestrates the entire verification process using browser automation
 */

import type { StudentProfile } from "~/types/verification";
import { automateSheerIDVerification } from "./browser-automation";
import { generateStudentIdDocument } from "./document-generator";

export interface VerificationProgress {
  step: string;
  message: string;
  status: "info" | "success" | "error" | "warning";
  screenshot?: string;
}

export interface VerificationResult {
  success: boolean;
  verificationId?: string;
  redirectUrl?: string;
  errorMessage?: string;
  screenshots?: string[];
}

export interface VerificationRequest {
  sheerIdUrl: string;
  school: string;
  studentProfile: StudentProfile;
  apiKey?: string; // Optional - not needed for browser automation
  onProgress?: (progress: VerificationProgress) => void;
}

/**
 * Execute complete verification workflow using browser automation
 */
export async function executeVerification(request: VerificationRequest): Promise<VerificationResult> {
  const { sheerIdUrl, school, studentProfile, onProgress } = request;

  const progress = (
    message: string,
    status: VerificationProgress["status"] = "info",
    screenshot?: string
  ) => {
    onProgress?.({ step: message, message, status, screenshot });
  };

  try {
    // Step 1: Generate student ID document
    progress("Generating student ID document...", "info");
    const documentBlob = await generateStudentIdDocument({
      studentProfile,
      school,
    });
    progress("Student ID document generated", "success");

    // Step 2: Execute browser automation
    progress("Starting browser automation...", "info");
    const automationResult = await automateSheerIDVerification({
      sheerIdUrl,
      school,
      studentProfile,
      documentBlob,
      onProgress: (autoProgress) => {
        progress(autoProgress.message, autoProgress.status, autoProgress.screenshot);
      },
    });

    if (!automationResult.success) {
      throw new Error(automationResult.errorMessage || "Automation failed");
    }

    progress("Verification completed successfully!", "success");

    return {
      success: true,
      verificationId: automationResult.verificationId,
      redirectUrl: automationResult.finalUrl,
      screenshots: automationResult.screenshots,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    progress(`Verification failed: ${errorMessage}`, "error");

    return {
      success: false,
      errorMessage,
    };
  }
}
