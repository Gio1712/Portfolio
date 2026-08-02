export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectGalleryGroup {
  id: string;
  label: string;
  layout: "single" | "pair" | "triple";
  images: ProjectImage[];
}

export interface CategoryProject {
  id: string;
  title: string;
  type: string;
  year: string;
  client: string;
  role: string;
  tools: string[];
  thumbnail: string;
  description: string;
  groups: ProjectGalleryGroup[];
}

export interface ProjectCategory {
  id: string;
  title: string;
  subtitle: string;
  projects: CategoryProject[];
}
