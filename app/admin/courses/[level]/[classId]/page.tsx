"use client";

import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import ClassDetailPage from "@/components/admin/courses/ClassDetailPage";
import { getLevelBySlug, getClassById } from "@/lib/courseData";

export default function ClassDetailRoute() {
  const params = useParams();
  const levelSlug = params.level as string;
  const classId = params.classId as string;

  const levelData = getLevelBySlug(levelSlug);
  const classResult = getClassById(classId);

  if (!levelData || !classResult) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Class Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              The requested class could not be found.
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const { classData, levelTitle, levelGradient } = classResult;

  return (
    <AdminLayout>
      <ClassDetailPage
        classData={{
          id: classData.id,
          name: classData.name,
          grade: classData.grade,
          subjects: classData.subjects,
          totalStudents: classData.totalStudents,
        }}
        levelTitle={levelTitle}
        levelGradient={levelGradient}
      />
    </AdminLayout>
  );
}
