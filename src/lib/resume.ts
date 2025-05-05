import resumeData from '@/data/resume.json';

// Type definitions
export interface ResumeData {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  objective: string;
  technicalSkills: {
    category: string;
    skills: string[];
  }[];
  experience: {
    company: string;
    position: string;
    duration: string;
    duties: string[];
  }[];
  projects: {
    name: string;
    description: string[];
    technologies: string[];
    image: string;
    previewImage: string;
    liveLink?: string;
    githubLink?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
    grade: string;
  }[];
  certifications: string[];
  languages: string[];
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

// Function to get resume data with type safety
export function getResumeData(): ResumeData {
  return resumeData as ResumeData;
}

// Helper functions to get specific sections
export function getSocialLinks() {
  return getResumeData().socialLinks;
}

export function getProjects() {
  return getResumeData().projects;
}

export function getSkills() {
  return getResumeData().technicalSkills;
}

export function getExperience() {
  return getResumeData().experience;
}

export function getEducation() {
  return getResumeData().education;
}

export function getCertifications() {
  return getResumeData().certifications;
}

export function getBasicInfo() {
  const { name, location, phone, email, linkedin, github, objective } = getResumeData();
  return { name, location, phone, email, linkedin, github, objective };
}
