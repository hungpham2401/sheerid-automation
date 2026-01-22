/**
 * SheerID API Integration Service
 * Documentation: https://developer.sheerid.com/
 */

export interface SheerIDVerificationRequest {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  organization: {
    name: string;
  };
}

export interface SheerIDVerificationResponse {
  verificationId: string;
  status: string;
  metadata?: {
    redirectUrl?: string;
  };
}

export interface SheerIDDocumentUpload {
  verificationId: string;
  documentType: string;
  file: Blob;
}

/**
 * Parse SheerID URL to extract program ID and other parameters
 */
export function parseSheerIDUrl(url: string): { programId: string; baseUrl: string } | null {
  try {
    const urlObj = new URL(url);
    const programId = urlObj.searchParams.get("programId") || urlObj.pathname.split("/").pop() || "";

    if (!programId) {
      return null;
    }

    return {
      programId,
      baseUrl: urlObj.origin,
    };
  } catch {
    return null;
  }
}

/**
 * Create a new verification request
 */
export async function createVerification(
  apiKey: string,
  programId: string,
  data: SheerIDVerificationRequest
): Promise<SheerIDVerificationResponse> {
  const response = await fetch(`https://services.sheerid.com/rest/v2/verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      programId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDate: data.birthDate,
      organization: {
        name: data.organization.name,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(`SheerID API error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Upload a document to an existing verification
 */
export async function uploadDocument(
  apiKey: string,
  verificationId: string,
  file: Blob
): Promise<{ success: boolean; message?: string }> {
  const formData = new FormData();
  formData.append("file", file, "student-id.png");
  formData.append("documentType", "STUDENT_ID");

  const response = await fetch(`https://services.sheerid.com/rest/v2/verification/${verificationId}/document`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(`Document upload error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Submit verification for review
 */
export async function submitVerification(
  apiKey: string,
  verificationId: string
): Promise<SheerIDVerificationResponse> {
  const response = await fetch(`https://services.sheerid.com/rest/v2/verification/${verificationId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(`Verification submit error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Get verification status
 */
export async function getVerificationStatus(apiKey: string, verificationId: string): Promise<{ status: string }> {
  const response = await fetch(`https://services.sheerid.com/rest/v2/verification/${verificationId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get verification status");
  }

  return response.json();
}
