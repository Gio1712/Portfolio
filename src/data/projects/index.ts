import { BRAND_CATEGORY } from "./brandProjects";
import { MOTION_CATEGORY } from "./motionProjects";
import { POSTER_CATEGORY } from "./posterProjects";
import { VIDEO_CATEGORY } from "./videoProjects";

import type { ProjectCategory } from "../projectCategories";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  POSTER_CATEGORY,
  MOTION_CATEGORY,
  VIDEO_CATEGORY,
  BRAND_CATEGORY,
];
