"use server";

import { prisma } from "@/lib/prisma";

export async function getAdminStats() {
  try {
    const [
      totalAdmissions,
      pendingAdmissions,
      acceptedAdmissions,
      rejectedAdmissions,
      totalBlogs,
      pendingBlogs,
      totalResults,
    ] = await Promise.all([
      prisma.admission.count(),
      prisma.admission.count({ where: { status: "pending" } }),
      prisma.admission.count({ where: { status: "accepted" } }),
      prisma.admission.count({ where: { status: "rejected" } }),
      prisma.blog.count(),
      prisma.blog.count({ where: { status: "draft" } }), // Assuming draft is pending review
      prisma.result.count(),
    ]);

    return {
      admissions: {
        total: totalAdmissions,
        pending: pendingAdmissions,
        accepted: acceptedAdmissions,
        rejected: rejectedAdmissions,
      },
      blogs: {
        total: totalBlogs,
        pending: pendingBlogs,
      },
      results: {
        total: totalResults,
      },
    };
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return {
      admissions: { total: 0, pending: 0, accepted: 0, rejected: 0 },
      blogs: { total: 0, pending: 0 },
      results: { total: 0 },
    };
  }
}

export async function getRecentActivity() {
  try {
    const [recentAdmissions, recentBlogs] = await Promise.all([
      prisma.admission.findMany({
        take: 3,
        orderBy: { submittedAt: "desc" },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          status: true,
          submittedAt: true,
        },
      }),
      prisma.blog.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          author: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    const activities = [
      ...recentAdmissions.map((admission) => ({
        type: "admission",
        title: `New admission: ${admission.firstName} ${admission.lastName}`,
        name: admission.status,
        time: admission.submittedAt,
      })),
      ...recentBlogs.map((blog) => ({
        type: "blog",
        title: `New blog post: ${blog.title}`,
        name: blog.author,
        time: blog.createdAt,
      })),
    ];

    // Sort by time descending
    activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    return activities.slice(0, 5); // Return top 5 recent activities
  } catch (error) {
    console.error("Failed to fetch recent activity:", error);
    return [];
  }
}
