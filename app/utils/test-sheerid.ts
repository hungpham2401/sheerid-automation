/**
 * Test utility to validate SheerID automation with a real verification URL
 */

import { automateSheerIDVerification } from "~/services/browser-automation";
import type { StudentProfile } from "~/types/verification";

export async function testRealSheerIDVerification() {
  console.log("\n🧪 TESTING REAL SHEERID AUTOMATION\n");
  console.log("=" .repeat(60));

  // Real SheerID verification URL from user
  const REAL_SHEERID_URL = "https://services.sheerid.com/verify/67c8c14f5f17a83b745e3f82/?verificationId=69723f2f11d51d3e6baa6de8";

  // Test student profile
  const testProfile: StudentProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@psu.edu",
    birthDate: "1995-05-15",
    studentId: "123456789",
    phone: "+1234567890",
  };

  const testSchool = "Pennsylvania State University";

  console.log("\n📝 Test Configuration:");
  console.log(`   SheerID URL: ${REAL_SHEERID_URL}`);
  console.log(`   Student: ${testProfile.firstName} ${testProfile.lastName}`);
  console.log(`   Email: ${testProfile.email}`);
  console.log(`   School: ${testSchool}`);
  console.log("\n" + "=".repeat(60));

  try {
    console.log("\n🚀 Starting automation...\n");

    const result = await automateSheerIDVerification({
      sheerIdUrl: REAL_SHEERID_URL,
      school: testSchool,
      studentProfile: testProfile,
      onProgress: (progress) => {
        const icon = progress.status === "success" ? "✅" : 
                    progress.status === "error" ? "❌" : 
                    progress.status === "warning" ? "⚠️" : "ℹ️";
        console.log(`${icon} ${progress.message}`);
        
        if (progress.screenshot && progress.screenshot.startsWith("data:image")) {
          console.log(`   📸 Screenshot captured (${progress.screenshot.length} bytes)`);
        }
      },
    });

    console.log("\n" + "=".repeat(60));
    console.log("\n📊 AUTOMATION RESULT:\n");
    console.log(`   Success: ${result.success ? "✅ YES" : "❌ NO"}`);
    
    if (result.success) {
      console.log(`   Final URL: ${result.finalUrl}`);
      console.log(`   Verification ID: ${result.verificationId}`);
      console.log(`   Screenshots: ${result.screenshots.length} captured`);
    } else {
      console.log(`   Error: ${result.errorMessage}`);
    }

    console.log("\n" + "=".repeat(60));

    return result;
  } catch (error) {
    console.error("\n❌ TEST FAILED:");
    console.error(error);
    throw error;
  }
}

// Allow running this file directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testRealSheerIDVerification()
    .then(() => {
      console.log("\n✅ Test completed successfully!\n");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Test failed with error:", error);
      process.exit(1);
    });
}
