import type { StudentProfile } from "~/types/verification";

const FIRST_NAMES = [
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Mason",
  "Isabella",
  "William",
  "Mia",
  "James",
  "Charlotte",
  "Benjamin",
  "Amelia",
  "Lucas",
  "Harper",
  "Henry",
  "Evelyn",
  "Alexander",
  "Abigail",
  "Michael",
  "Emily",
  "Daniel",
  "Elizabeth",
  "Matthew",
  "Sofia",
  "Jackson",
  "Avery",
  "Sebastian",
  "Ella",
  "Jack",
  "Scarlett",
  "Aiden",
  "Grace",
  "Owen",
  "Chloe",
  "Samuel",
  "Victoria",
  "Joseph",
  "Riley",
  "John",
  "Aria",
  "David",
  "Lily",
];

const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateBirthDate(): string {
  const currentYear = new Date().getFullYear();
  const minAge = 18;
  const maxAge = 25;

  const birthYear = currentYear - minAge - Math.floor(Math.random() * (maxAge - minAge + 1));
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");

  return `${birthYear}-${month}-${day}`;
}

function generateEmail(firstName: string, lastName: string): string {
  const randomNum = Math.floor(Math.random() * 999);
  const domain = "psu.edu";
  return `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomNum}@${domain}`;
}

function generateStudentId(): string {
  // Generate realistic student ID (e.g., PSU123456789)
  const randomNum = Math.floor(100000000 + Math.random() * 900000000);
  return `PSU${randomNum}`;
}

function generatePhone(): string {
  // Generate US phone number format
  const areaCode = Math.floor(200 + Math.random() * 800);
  const prefix = Math.floor(200 + Math.random() * 800);
  const lineNumber = Math.floor(1000 + Math.random() * 9000);
  return `(${areaCode}) ${prefix}-${lineNumber}`;
}

export function generateStudentProfile(): StudentProfile {
  const firstName = getRandomElement(FIRST_NAMES);
  const lastName = getRandomElement(LAST_NAMES);
  const email = generateEmail(firstName, lastName);
  const birthDate = generateBirthDate();
  const studentId = generateStudentId();
  const phone = generatePhone();

  return {
    firstName,
    lastName,
    email,
    birthDate,
    studentId,
    phone,
  };
}
