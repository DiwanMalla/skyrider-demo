import { z } from 'zod'

/**
 * Reusable Zod validation schemas
 * Keep these organized by domain (results, exams, students, etc.)
 */

// Results domain schemas
export const ExamSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  term: z.string().optional(),
  date: z.date(),
  createdAt: z.date(),
})

export const StudentSchema = z.object({
  id: z.string().uuid(),
  rollNumber: z.string().min(1).max(20),
  name: z.string().min(1).max(100),
  classId: z.string().uuid(),
})

export const ResultSchema = z.object({
  id: z.string().uuid(),
  examId: z.string().uuid(),
  studentId: z.string().uuid(),
  subject: z.string().min(1).max(50),
  marks: z.number().min(0).max(100),
  grade: z.string().optional(),
})

// CSV Import schemas
export const CSVResultRowSchema = z.object({
  rollNumber: z.string().min(1),
  studentName: z.string().min(1),
  subject: z.string().min(1),
  marks: z.number().min(0).max(100),
  grade: z.string().optional(),
})

export type ExamType = z.infer<typeof ExamSchema>
export type StudentType = z.infer<typeof StudentSchema>
export type ResultType = z.infer<typeof ResultSchema>
export type CSVResultRow = z.infer<typeof CSVResultRowSchema>
