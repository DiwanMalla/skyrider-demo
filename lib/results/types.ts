export interface Subject {
  name: string;
  score: number;
  fullMarks: number;
  passMarks: number;
  grade: string; // A+, A, B+, etc.
  gradePoint: number; // 4.0, 3.6, etc.
}

export interface StudentResult {
  id: string;
  studentName: string;
  symbolNumber: string;
  grade: string; // Class 10, Class 11, etc.
  dob: string; // YYYY-MM-DD
  subjects: Subject[];
  totalObtained: number;
  totalFullMarks: number;
  gpa: string;
  percentage: number;
  rank: number;
  status: "passed" | "failed";
  published: boolean;
  batch: string; // e.g., "2080"
  examType: string; // e.g., "First Terminal", "Final Exam"
  uploadedAt: string;
}

export interface ResultFilter {
  grade?: string;
  batch?: string;
  symbolNumber?: string;
  status?: "passed" | "failed";
  examType?: string;
}
