export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  points?: string[];
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  metric?: string;
  isLive?: boolean;
  technologies: string[];
  imageSrc?: string;
  link?: string;
}

export interface StackCategory {
  id: string;
  number: string;
  category: string;
  items: {
    name: string;
    icon?: string;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field?: string;
  period: string;
  courses?: string[];
}

export interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  slug: string;
  coverImage?: string;
}
