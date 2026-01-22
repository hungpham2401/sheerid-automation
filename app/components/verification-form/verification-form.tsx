import type React from "react";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Input } from "~/components/ui/input/input";
import { Button } from "~/components/ui/button/button";
import { PENN_STATE_CAMPUSES } from "~/data/penn-state-campuses";
import { generateStudentProfile } from "~/utils/student-generator";
import type { StudentProfile } from "~/types/verification";
import styles from "./verification-form.module.css";

interface VerificationFormProps {
  onSubmit: (data: { sheerIdUrl: string; school: string; studentProfile: StudentProfile }) => void;
  isProcessing: boolean;
  className?: string;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({ onSubmit, isProcessing, className }) => {
  const [sheerIdUrl, setSheerIdUrl] = useState("");
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(generateStudentProfile());

  useEffect(() => {
    setStudentProfile(generateStudentProfile());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sheerIdUrl.trim()) {
      const randomCampus = PENN_STATE_CAMPUSES[Math.floor(Math.random() * PENN_STATE_CAMPUSES.length)];
      const newProfile = generateStudentProfile();
      setStudentProfile(newProfile);
      onSubmit({ sheerIdUrl, school: randomCampus, studentProfile: newProfile });
    }
  };

  return (
    <div className={className}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Start Verification</h2>
          <p className={styles.description}>Paste your SheerID URL and let the magic happen</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label htmlFor="sheerIdUrl" className={styles.label}>
              SheerID Verification URL
            </label>
            <Input
              id="sheerIdUrl"
              type="url"
              placeholder="https://services.sheerid.com/verify/..."
              value={sheerIdUrl}
              onChange={(e) => setSheerIdUrl(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.label}>
              Auto-Generated Student Profile
              <span style={{ fontSize: 'var(--font-size-0)', fontWeight: 400, color: 'var(--color-neutral-10)' }}>
                Generated randomly
              </span>
            </div>
            <div className={styles.studentFields}>
              <div className={styles.fieldGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  value={studentProfile.firstName}
                  disabled
                  style={{ background: 'var(--color-neutral-1)' }}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  value={studentProfile.lastName}
                  disabled
                  style={{ background: 'var(--color-neutral-1)' }}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={studentProfile.email}
                  disabled
                  style={{ background: 'var(--color-neutral-1)' }}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="birthDate" className={styles.label}>
                  Birth Date
                </label>
                <Input
                  id="birthDate"
                  type="date"
                  value={studentProfile.birthDate}
                  disabled
                  style={{ background: 'var(--color-neutral-1)' }}
                />
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button type="submit" disabled={!sheerIdUrl.trim() || isProcessing} style={{ width: '100%' }}>
              <Sparkles style={{ width: '20px', height: '20px' }} />
              {isProcessing ? "Processing Verification..." : "Start Verification"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
