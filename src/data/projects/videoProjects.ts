import type { ProjectCategory } from "../projectCategories";

export const VIDEO_CATEGORY: ProjectCategory = {
  id: "video-editing",
  title: "Video Editing",
  subtitle:
    "A collection of edited video projects focused on pacing, storytelling, visual rhythm and promotional communication.",

  projects: [
    {
      id: "2nd-milestone",
      title: "2nd Milestone",
      type: "Video Editing",
      year: "2026",
      client: "Personal Project",
      role: "Video Editor",
      tools: ["Adobe Premiere Pro", "Adobe After Effects"],

      thumbnail: "/projects/video/Screenshot 2026-07-27 190730.webp",

      description:
        "A promotional video edit combining clear storytelling, rhythmic pacing, motion graphics and polished visual transitions.",

      groups: [],

      video: {
        thumbnail: "/projects/video/Screenshot 2026-07-27 190730.webp",
        src:
          "https://pub-063334e5ec6a49e8ac1371f715489bb1.r2.dev/2nd-anniversary_web.mp4",
      },
    },

    // Copy object trên để thêm project mới.
  ],
};