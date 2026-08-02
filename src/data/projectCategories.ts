export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectVideo {
  thumbnail: string;
  src?: string;
  vimeo?: string;
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
  motion?: ProjectMotion;
  brand?: ProjectBrand;
  video?: ProjectVideo;
}

export interface ProjectCategory {
  id: string;
  title: string;
  subtitle: string;
  projects: CategoryProject[];
}
export interface ProjectMotion {
  preview: string;
  src: string;
  ratio: "1:1" | "16:9" | "9:16";
}
export interface ProjectBrand {
  pages: string[];
}
