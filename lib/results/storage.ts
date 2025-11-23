import { StudentResult, ResultFilter } from "./types";

const RESULTS_STORAGE_KEY = "skyrider_results_v1";

export function loadResults(): StudentResult[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(RESULTS_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse results", e);
    return [];
  }
}

export function saveResults(results: StudentResult[]) {
  if (typeof window === "undefined") return;
  // Merge with existing results, updating duplicates based on symbolNumber + grade + batch
  const existing = loadResults();
  const newResults = [...existing];

  results.forEach((result) => {
    const index = newResults.findIndex(
      (r) =>
        r.symbolNumber === result.symbolNumber &&
        r.grade === result.grade &&
        r.batch === result.batch &&
        r.examType === result.examType
    );
    if (index >= 0) {
      newResults[index] = result;
    } else {
      newResults.push(result);
    }
  });

  localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(newResults));
}

export function getResults(filter?: ResultFilter): StudentResult[] {
  let results = loadResults();

  if (filter) {
    if (filter.grade) {
      results = results.filter((r) => r.grade === filter.grade);
    }
    if (filter.batch) {
      results = results.filter((r) => r.batch === filter.batch);
    }
    if (filter.symbolNumber) {
      results = results.filter((r) => r.symbolNumber === filter.symbolNumber);
    }
    if (filter.status) {
      results = results.filter((r) => r.status === filter.status);
    }
  }

  return results.sort((a, b) => b.percentage - a.percentage); // Default sort by rank/percentage
}

export function getResultBySymbolNumber(
  symbolNumber: string,
  dob: string
): StudentResult | null {
  const results = loadResults();
  return (
    results.find((r) => {
      const symbolMatch = r.symbolNumber === symbolNumber;
      const dobMatch = r.dob === dob;
      return symbolMatch && dobMatch && r.published;
    }) || null
  );
}

export function updateResult(id: string, data: Partial<StudentResult>) {
  const results = loadResults();
  const index = results.findIndex((r) => r.id === id);
  if (index === -1) return;

  results[index] = { ...results[index], ...data };
  localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
}

export function deleteResult(id: string) {
  const results = loadResults();
  const filtered = results.filter((r) => r.id !== id);
  localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(filtered));
}

export function getTopStudents(grade: string, limit: number = 5): StudentResult[] {
  const results = getResults();
  return results
    .filter((r) => r.grade === grade && r.published)
    .sort((a, b) => parseFloat(b.gpa) - parseFloat(a.gpa))
    .slice(0, limit);
}

export function getExamFolders() {
  const results = getResults();
  const folders = new Set<string>();
  
  results.forEach(r => {
    folders.add(`${r.batch}|${r.examType}`);
  });

  return Array.from(folders).map(f => {
    const [batch, examType] = f.split('|');
    return { batch, examType };
  }).sort((a, b) => b.batch.localeCompare(a.batch));
}
