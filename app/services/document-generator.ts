/**
 * Student ID Document Generator
 * Generates realistic student ID cards using Canvas API
 */

import type { StudentProfile } from "~/types/verification";

export interface DocumentGenerationOptions {
  studentProfile: StudentProfile;
  school: string;
  studentId?: string;
}

/**
 * Generate a random student ID number
 */
function generateStudentId(): string {
  const prefix = Math.floor(Math.random() * 90 + 10); // 10-99
  const middle = Math.floor(Math.random() * 9000 + 1000); // 1000-9999
  const suffix = Math.floor(Math.random() * 9000 + 1000); // 1000-9999
  return `${prefix}-${middle}-${suffix}`;
}

/**
 * Format date for display on ID card
 */
function formatExpirationDate(): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 4); // Valid for 4 years
  return date.toLocaleDateString("en-US", { month: "2-digit", year: "numeric" });
}

/**
 * Generate student ID document as Blob
 * This is a server-side safe version that returns a simple image
 */
export async function generateStudentIdDocument(options: DocumentGenerationOptions): Promise<Blob> {
  const { studentProfile, school } = options;
  const studentId = options.studentId || generateStudentId();

  // For server-side rendering, we'll create a simple data structure
  // In a real implementation, you'd use a headless browser or image generation library
  // For now, we'll create a simple SVG-based ID card

  const svg = `
    <svg width="600" height="380" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="600" height="380" fill="#003366" rx="10"/>
      
      <!-- Header -->
      <rect width="600" height="80" fill="#001f3f"/>
      <text x="300" y="35" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">
        ${school}
      </text>
      <text x="300" y="60" font-family="Arial, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">
        STUDENT IDENTIFICATION CARD
      </text>
      
      <!-- Photo placeholder -->
      <rect x="30" y="100" width="150" height="180" fill="#ffffff" rx="5"/>
      <text x="105" y="195" font-family="Arial, sans-serif" font-size="14" fill="#666666" text-anchor="middle">
        PHOTO
      </text>
      
      <!-- Student Information -->
      <text x="200" y="130" font-family="Arial, sans-serif" font-size="12" fill="#ffffff" font-weight="bold">
        NAME:
      </text>
      <text x="200" y="150" font-family="Arial, sans-serif" font-size="16" fill="#ffffff">
        ${studentProfile.firstName} ${studentProfile.lastName}
      </text>
      
      <text x="200" y="180" font-family="Arial, sans-serif" font-size="12" fill="#ffffff" font-weight="bold">
        STUDENT ID:
      </text>
      <text x="200" y="200" font-family="Arial, sans-serif" font-size="16" fill="#ffffff">
        ${studentId}
      </text>
      
      <text x="200" y="230" font-family="Arial, sans-serif" font-size="12" fill="#ffffff" font-weight="bold">
        DATE OF BIRTH:
      </text>
      <text x="200" y="250" font-family="Arial, sans-serif" font-size="16" fill="#ffffff">
        ${new Date(studentProfile.birthDate).toLocaleDateString("en-US")}
      </text>
      
      <!-- Footer -->
      <rect y="300" width="600" height="80" fill="#001f3f"/>
      <text x="30" y="330" font-family="Arial, sans-serif" font-size="12" fill="#ffffff">
        EMAIL: ${studentProfile.email}
      </text>
      <text x="30" y="355" font-family="Arial, sans-serif" font-size="12" fill="#ffffff">
        EXPIRES: ${formatExpirationDate()}
      </text>
      
      <!-- Barcode placeholder -->
      <rect x="420" y="315" width="150" height="50" fill="#ffffff" rx="3"/>
      <text x="495" y="345" font-family="monospace" font-size="10" fill="#000000" text-anchor="middle">
        ||||| ||||| |||||
      </text>
    </svg>
  `;

  // Convert SVG to Blob
  return new Blob([svg], { type: "image/svg+xml" });
}

/**
 * Generate student ID document and return as base64 data URL
 * Useful for preview or client-side display
 */
export async function generateStudentIdDataUrl(options: DocumentGenerationOptions): Promise<string> {
  const blob = await generateStudentIdDocument(options);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
