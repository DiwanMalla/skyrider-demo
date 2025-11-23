import { Subject, StudentResult } from "./types";

// Grading System (NEB Standard or Custom)
const GRADE_SCALE = [
  { min: 90, grade: "A+", point: 4.0 },
  { min: 80, grade: "A", point: 3.6 },
  { min: 70, grade: "B+", point: 3.2 },
  { min: 60, grade: "B", point: 2.8 },
  { min: 50, grade: "C+", point: 2.4 },
  { min: 40, grade: "C", point: 2.0 },
  { min: 35, grade: "D", point: 1.6 },
  { min: 0, grade: "NG", point: 0.0 },
];

export function calculateGrade(score: number, fullMarks: number = 100): { grade: string; point: number } {
  const percentage = (score / fullMarks) * 100;
  const gradeInfo = GRADE_SCALE.find((g) => percentage >= g.min);
  return gradeInfo ? { grade: gradeInfo.grade, point: gradeInfo.point } : { grade: "NG", point: 0 };
}

export function calculateGPA(subjects: Subject[]): string {
  if (subjects.length === 0) return "0.00";
  const totalPoints = subjects.reduce((sum, sub) => sum + sub.gradePoint, 0);
  return (totalPoints / subjects.length).toFixed(2);
}

export function parseCSV(csvText: string, batch: string, grade: string, examType: string): StudentResult[] {
  const lines = csvText.split("\n").map((line) => line.trim()).filter((line) => line);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const results: StudentResult[] = [];

  // Identify columns
  const symbolIndex = headers.findIndex((h) => h.includes("symbol"));
  const nameIndex = headers.findIndex((h) => h.includes("name") || h.includes("student"));
  
  // Assume other columns are subjects
  // Filter out non-subject columns
  const subjectIndices = headers
    .map((h, i) => ({ header: h, index: i }))
    .filter(
      (item) =>
        item.index !== symbolIndex &&
        item.index !== nameIndex &&
        item.header !== "dob" &&
        item.header !== "rank"
    );

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    if (cols.length < headers.length) continue;

    const symbolNumber = cols[symbolIndex];
    const studentName = cols[nameIndex];
    
    if (!symbolNumber || !studentName) continue;

    const subjects: Subject[] = [];
    let totalObtained = 0;
    let totalFullMarks = 0;
    let hasFailed = false;

    subjectIndices.forEach((sub) => {
      const score = parseFloat(cols[sub.index]) || 0;
      const fullMarks = 100; // Default full marks, ideally should be configurable or in CSV
      const { grade: subjectGrade, point: gradePoint } = calculateGrade(score, fullMarks);
      const passMarks = 40; // Default pass marks

      if (score < passMarks) hasFailed = true;

      subjects.push({
        name: headers[sub.index].toUpperCase(), // Use header as subject name
        score,
        fullMarks,
        passMarks,
        grade: subjectGrade,
        gradePoint,
      });

      totalObtained += score;
      totalFullMarks += fullMarks;
    });

    const gpa = calculateGPA(subjects);
    const percentage = (totalObtained / totalFullMarks) * 100;

    results.push({
      id: crypto.randomUUID(),
      studentName,
      symbolNumber,
      grade,
      subjects,
      totalObtained,
      totalFullMarks,
      gpa,
      percentage,
      rank: 0, // Will calculate later
      status: hasFailed ? "failed" : "passed",
      published: false,
      batch,
      examType,
      uploadedAt: new Date().toISOString(),
      dob: ""
    });
  }

  // Calculate Rank
  results.sort((a, b) => parseFloat(b.gpa) - parseFloat(a.gpa));
  results.forEach((r, index) => {
    r.rank = index + 1;
  });

  return results;
}
