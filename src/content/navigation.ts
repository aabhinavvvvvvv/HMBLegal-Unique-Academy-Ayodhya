import { hasGallery } from "./media";

export type NavChild = { label: string; href: string; description?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about", description: "A legacy of education since 1998" },
      { label: "Our Journey", href: "/about#journey", description: "From 1998 to Ayodhya, the 7th branch" },
      { label: "The Unique Difference", href: "/about#difference", description: "Rooted in values, ready for the future" },
      { label: "Vision & Mission", href: "/vision-mission", description: "What we are building, and why" },
      { label: "Our Philosophy", href: "/vision-mission#philosophy", description: "Six pillars of a Unique education" },
    ],
  },
  {
    label: "Why Unique",
    href: "/campus",
    children: [
      { label: "Dedicated AI Lab", href: "/campus#ai-lab", description: "Hands-on Artificial Intelligence learning" },
      { label: "Air-Conditioned Classrooms", href: "/campus#classrooms", description: "Focused, comfortable learning spaces" },
      { label: "Technology-Enabled Education", href: "/campus#technology", description: "Interactive digital resources" },
      { label: "Dedicated Faculty", href: "/campus#faculty", description: "Educators who mentor and inspire" },
      { label: "Indoor Games", href: "/campus#indoor-games", description: "Recreation, strategy and teamwork" },
    ],
  },
  {
    label: "Student Life",
    href: "/student-life",
    children: [
      { label: "Beyond the Classroom", href: "/student-life", description: "Sports, culture, AI projects and more" },
      { label: "Co-Curricular Learning", href: "/student-life#co-curricular", description: "Creativity, culture and communication" },
      { label: "Holistic Development", href: "/student-life#holistic", description: "Academics, personality and well-being" },
      { label: "Meet the Future", href: "/student-life#future", description: "Today's learners, tomorrow's leaders" },
      ...(hasGallery ? [{ label: "Gallery", href: "/gallery", description: "Moments from campus life" }] : []),
    ],
  },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  explore: [
    { label: "Our Story", href: "/about" },
    { label: "Vision & Mission", href: "/vision-mission" },
    { label: "Why Unique", href: "/campus" },
    { label: "Student Life", href: "/student-life" },
    ...(hasGallery ? [{ label: "Gallery", href: "/gallery" }] : []),
  ],
  parents: [
    { label: "Admissions", href: "/admissions" },
    { label: "Admission Enquiry", href: "/admissions#enquiry" },
    { label: "A Promise to Every Parent", href: "/admissions#promise" },
    { label: "Contact & Directions", href: "/contact" },
  ],
};
