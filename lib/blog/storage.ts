"use client";

import { BlogSubmission, SubmissionStatus } from "./types";

const STORAGE_KEY = "skyrider_blog_submissions_v1";
const EVENT_KEY = "blog-submissions-updated";

const isBrowser = typeof window !== "undefined";

function readStorage(): BlogSubmission[] {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BlogSubmission[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (error) {
    console.error("Failed to parse blog submissions", error);
    return [];
  }
}

function writeStorage(submissions: BlogSubmission[]) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch (error) {
    console.error("Failed to persist blog submissions", error);
  }
}

export function loadSubmissions(): BlogSubmission[] {
  return readStorage();
}

export function saveSubmission(submission: BlogSubmission) {
  const submissions = readStorage();
  submissions.unshift(submission);
  writeStorage(submissions);
}

export function updateSubmissionStatus(id: string, status: SubmissionStatus) {
  const submissions = readStorage();
  const next = submissions.map((item) =>
    item.id === id
      ? {
          ...item,
          status,
        }
      : item
  );
  writeStorage(next);
}

export function removeSubmission(id: string) {
  const submissions = readStorage().filter((item) => item.id !== id);
  writeStorage(submissions);
}

export function subscribeToSubmissionUpdates(
  callback: (submissions: BlogSubmission[]) => void
) {
  if (!isBrowser) {
    return () => undefined;
  }

  const handleUpdate = () => {
    callback(readStorage());
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      handleUpdate();
    }
  };

  window.addEventListener(EVENT_KEY, handleUpdate);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(EVENT_KEY, handleUpdate);
    window.removeEventListener("storage", handleStorage);
  };
}
