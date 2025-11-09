"use client";

import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import CourseLevelPage from "@/components/admin/courses/CourseLevelPage";
import { getLevelBySlug } from "@/lib/courseData";

export default function LevelPage() {
  const params = useParams();
  const levelSlug = params.level as string;

  const levelData = getLevelBySlug(levelSlug);

  if (!levelData) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Level Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              The requested education level could not be found.
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Transform the data to match the component's expected interface
  const transformedLevel = {
    title: levelData.title,
    description: levelData.description,
    gradeRange: levelData.gradeRange,
    icon: levelData.icon,
    gradient: levelData.gradient,
    iconBg: levelData.iconBg,
    iconColor: levelData.iconColor,
    classes: levelData.classes.map((cls) => ({
      id: cls.id,
      name: cls.name,
      grade: cls.grade,
      subjects: cls.subjects.map((sub) => sub.name), // Convert Subject[] to string[]
      totalStudents: cls.totalStudents,
    })),
  };

  return (
    <AdminLayout>
      <CourseLevelPage level={transformedLevel} levelSlug={levelSlug} />
    </AdminLayout>
  );
}
