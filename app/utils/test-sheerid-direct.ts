/**
 * Direct Test Utility for SheerID Verification
 * Tests with REAL SheerID URL without browser automation
 */

import { generateStudentProfile } from './student-generator';

interface TestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

/**
 * Test SheerID form submission via HTTP (without browser)
 */
export async function testSheerIDDirect(url: string): Promise<TestResult> {
  console.log('🧪 Testing SheerID Direct Submission');
  console.log('📍 URL:', url);
  
  try {
    // Generate test data
    const studentData = generateStudentProfile();
    console.log('👤 Generated student data:', {
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      email: studentData.email,
      birthDate: studentData.birthDate,
      studentId: studentData.studentId,
    });

    // Extract verification ID from URL
    const verificationId = url.match(/verificationId=([^&]+)/)?.[1];
    console.log('🔑 Verification ID:', verificationId);

    if (!verificationId) {
      throw new Error('Could not extract verificationId from URL');
    }

    // Try to fetch the form page first
    console.log('🌐 Fetching form page...');
    const formResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    console.log('📄 Form page status:', formResponse.status);
    
    if (!formResponse.ok) {
      throw new Error(`Failed to fetch form: ${formResponse.status} ${formResponse.statusText}`);
    }

    const formHtml = await formResponse.text();
    console.log('📝 Form HTML length:', formHtml.length, 'bytes');

    // Check if form loaded correctly
    if (formHtml.includes('SheerID') || formHtml.includes('verification')) {
      console.log('✅ Form page loaded successfully');
    } else {
      console.log('⚠️ Form page might not have loaded correctly');
    }

    // Extract CSRF token or session data if present
    const csrfMatch = formHtml.match(/csrf[_-]?token["']?\s*[:=]\s*["']([^"']+)/i);
    const csrfToken = csrfMatch?.[1];
    
    if (csrfToken) {
      console.log('🔐 Found CSRF token:', csrfToken.substring(0, 10) + '...');
    }

    // Prepare form data
    const formDataObj: Record<string, string> = {
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      email: studentData.email,
      birthDate: studentData.birthDate,
    };
    
    if (studentData.studentId) {
      formDataObj.studentId = studentData.studentId;
    }
    
    if (csrfToken) {
      formDataObj.csrf_token = csrfToken;
    }
    
    const formData = new URLSearchParams(formDataObj);

    console.log('📨 Attempting form submission...');
    console.log('📋 Form data:', Object.fromEntries(formData.entries()));

    // Try to submit (this might fail due to CSRF/session requirements)
    const submitResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Referer': url,
      },
      body: formData.toString(),
    });

    console.log('📬 Submit response status:', submitResponse.status);

    const result: TestResult = {
      success: true,
      message: `Form submission test completed. Status: ${submitResponse.status}`,
      data: {
        verificationId,
        studentData,
        formStatus: formResponse.status,
        submitStatus: submitResponse.status,
        formLoaded: formHtml.includes('SheerID'),
        csrfTokenFound: !!csrfToken,
      },
    };

    console.log('✅ Test completed successfully');
    console.log('📊 Result:', result);

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Test failed:', errorMessage);
    
    return {
      success: false,
      message: 'Test failed',
      error: errorMessage,
    };
  }
}

// CLI test function
if (import.meta.url === `file://${process.argv[1]}`) {
  const testUrl = process.argv[2] || 
    'https://services.sheerid.com/verify/67c8c14f5f17a83b745e3f82/?verificationId=69723f2f11d51d3e6baa6de8';
  
  console.log('🚀 Starting SheerID Direct Test');
  console.log('=' .repeat(60));
  
  testSheerIDDirect(testUrl)
    .then((result) => {
      console.log('=' .repeat(60));
      console.log('🏁 Final Result:', result.success ? '✅ SUCCESS' : '❌ FAILED');
      console.log(JSON.stringify(result, null, 2));
      process.exit(result.success ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Unhandled error:', error);
      process.exit(1);
    });
}
