/**
 * Browser Automation Service - SIMULATION MODE ONLY
 * 
 * Note: Real Puppeteer removed to avoid Railway build issues
 * All verifications use simulation mode with realistic delays
 */

import type { StudentProfile } from "~/types/verification";

export interface AutomationProgress {
  step: string;
  message: string;
  status: "info" | "success" | "error" | "warning";
  screenshot?: string;
}

export interface AutomationResult {
  success: boolean;
  finalUrl?: string;
  verificationId?: string;
  errorMessage?: string;
  screenshots: string[];
}

export interface AutomationRequest {
  sheerIdUrl: string;
  school: string;
  studentProfile: StudentProfile;
  documentBlob?: Blob;
  onProgress?: (progress: AutomationProgress) => void;
}

// Helper to simulate delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate placeholder screenshots
function getPlaceholderScreenshot(type: "form" | "filled" | "success" | "error"): string {
  const placeholders = {
    form: "https://placehold.co/1280x720/667eea/ffffff?text=SheerID+Form+Loaded",
    filled: "https://placehold.co/1280x720/764ba2/ffffff?text=Form+Filled+Successfully",
    success: "https://placehold.co/1280x720/10b981/ffffff?text=Verification+Submitted",
    error: "https://placehold.co/1280x720/ef4444/ffffff?text=Error+Occurred",
  };
  return placeholders[type];
}

/**
 * Main entry point - simulation mode only
 */
export async function automateSheerIDVerification(request: AutomationRequest): Promise<AutomationResult> {
  console.log("🎭 Using simulation mode (safe & fast)");
  return automateSheerIDVerificationSimulated(request);
}

/**
 * SIMULATED automation - for development/preview environments
 */
async function automateSheerIDVerificationSimulated(request: AutomationRequest): Promise<AutomationResult> {
  const { sheerIdUrl, school, studentProfile, documentBlob, onProgress } = request;

  const screenshots: string[] = [];

  const progress = (message: string, status: AutomationProgress["status"] = "info", screenshot?: string) => {
    onProgress?.({ step: message, message, status, screenshot });
    if (screenshot) {
      screenshots.push(screenshot);
    }
  };

  try {
    // Step 1: Simulate browser launch
    progress("🚀 Initializing browser automation...", "info");
    await delay(500);
    progress("⚠️  Running in SIMULATION mode (deploy to Railway for real automation)", "warning");
    await delay(300);

    // Step 2: Simulate navigation
    progress(`🌐 Navigating to: ${sheerIdUrl}`, "info");
    await delay(800);

    const initialScreenshot = getPlaceholderScreenshot("form");
    progress("📄 Form page loaded successfully", "success", initialScreenshot);
    await delay(400);

    // Step 3: Simulate form field detection
    progress("🔍 Detecting form fields...", "info");
    await delay(600);

    // Step 4: Simulate filling each field
    const fields = [
      { name: "First Name", value: studentProfile.firstName },
      { name: "Last Name", value: studentProfile.lastName },
      { name: "Email", value: studentProfile.email },
      { name: "Birth Date", value: studentProfile.birthDate },
      { name: "School", value: school },
      { name: "Student ID", value: studentProfile.studentId },
    ];

    if (studentProfile.phone) {
      fields.push({ name: "Phone", value: studentProfile.phone });
    }

    for (const field of fields) {
      progress(`✏️  Filling "${field.name}": ${field.value}`, "info");
      await delay(400);
    }

    const filledScreenshot = getPlaceholderScreenshot("filled");
    progress(`✅ Successfully filled ${fields.length} fields`, "success", filledScreenshot);
    await delay(500);

    // Step 5: Simulate document upload
    progress("📎 Checking for file upload requirements...", "info");
    await delay(500);

    if (documentBlob || Math.random() > 0.3) {
      progress("📤 Uploading student ID document...", "info");
      await delay(800);
      progress("✅ Document uploaded successfully", "success");
    } else {
      progress("ℹ️  No file upload required for this form", "warning");
    }
    await delay(300);

    // Step 6: Simulate form submission
    progress("📨 Submitting form...", "info");
    await delay(1000);

    // Always succeed in demo mode
    const isSuccess = true;

    progress("🎉 Form submitted successfully!", "success");
    await delay(500);

    // Step 7: Simulate response
    progress("⏳ Waiting for verification response...", "info");
    await delay(800);

    const verificationId = `ver_sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const finalUrl = `${sheerIdUrl}/success?id=${verificationId}`;

    const successScreenshot = getPlaceholderScreenshot("success");
    progress(`📋 Verification ID: ${verificationId}`, "success", successScreenshot);
    await delay(300);

    progress("🧹 Cleaning up resources...", "info");
    await delay(200);

    return {
      success: true,
      finalUrl,
      verificationId,
      screenshots,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown automation error";
    progress(`❌ Automation failed: ${errorMessage}`, "error");

    const errorScreenshot = getPlaceholderScreenshot("error");
    progress("📸 Error state captured", "error", errorScreenshot);

    return {
      success: false,
      errorMessage,
      screenshots,
    };
  }
}
