export interface ProjectItem {
  number: string;
  title: string;
  titleLines: [string, string];
  category: string;
  year: string;
  image: string;
  categoryId: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    number: "01",
    title: "Brand Identity",
    titleLines: ["Brand", "Identity"],
    category: "Creative Direction",
    year: "2025",
    image: "/projects/brandidentity/thumbcamdotietkiem.webp",
    categoryId: "brand-identity",
  },
  {
    number: "02",
    title: "Poster Design",
    titleLines: ["Poster", "Design"],
    category: "Visual Communication",
    year: "2025",
    image: "/projects/poster/stealth-in-motion/portrait.webp",
    categoryId: "poster-design",
  },
  {
    number: "03",
    title: "Motion Graphics",
    titleLines: ["Motion", "Graphics"],
    category: "Animation",
    year: "2025",
    image: "/projects/motiongraphic/source/portrait.webp",
    categoryId: "motion-graphics",
  },
  {
    number: "04",
    title: "Video Editing",
    titleLines: ["Video", "Editing"],
    category: "Post Production",
    year: "2025",
    image: "/projects/video/Screenshot 2026-07-27 190730.webp",
    categoryId: "video-editing",
  },
];
