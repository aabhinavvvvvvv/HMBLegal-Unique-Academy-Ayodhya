/**
 * School content, taken from the school's official content document
 * ("UNIQUE ACADEMY.docx"). Wording is preserved; only structure has been
 * added so the UI can present it. Do not add facts here that the school has
 * not supplied.
 */

export type IconKey =
  | "knowledge"
  | "innovation"
  | "creativity"
  | "values"
  | "character"
  | "excellence"
  | "classrooms"
  | "aiLab"
  | "technology"
  | "faculty"
  | "indoorGames"
  | "coCurricular"
  | "holistic"
  | "sports"
  | "competitions"
  | "cultural"
  | "aiProjects"
  | "celebrations"
  | "collaborative"
  | "personality";

/* ------------------------------------------------------------------ About */

export const about = {
  eyebrow: "About Unique Academy, Ayodhya",
  title: "A Legacy of Education. A Vision for Tomorrow.",
  paragraphs: [
    "Established as the seventh branch of the Unique Group of Schools, Unique Academy, Ayodhya carries forward an educational journey that began in 1998.",
    "For decades, the Unique Group of Schools has been dedicated to creating meaningful learning experiences and nurturing generations of young minds. With the establishment of our Ayodhya branch, we bring this legacy to a new generation of learners in the city.",
  ],
  moreThanASchool: "Unique Academy is more than a school. It is a blend of modern education and timeless values.",
  belief:
    "We believe that while the world is changing rapidly, the values that shape a good human being remain timeless. Our approach therefore combines contemporary teaching, technology, innovation, and future-ready skills with discipline, ethics, respect, responsibility, and strong human values.",
  blend: {
    modern: ["Contemporary teaching", "Technology", "Innovation", "Future-ready skills"],
    timeless: ["Discipline", "Ethics", "Respect", "Responsibility", "Strong human values"],
  },
  goalLead: "Our goal is simple yet powerful:",
  goal: "To prepare students not only for examinations, but for life.",
};

/* ------------------------------------------------------------- Philosophy */

export const philosophy = {
  eyebrow: "The Unique Philosophy",
  title: "Modern Minds. Strong Values. Bright Futures.",
  lead: "At Unique Academy, we believe true education happens when knowledge meets character.",
  body:
    "A child needs more than academic success to thrive in the real world. They need curiosity to learn, confidence to express, discipline to persevere, values to make the right choices, and the ability to adapt to an ever-changing future.",
  intro: "That is why our educational philosophy brings together:",
  pillars: [
    { icon: "knowledge", title: "Knowledge", text: "Building strong academic foundations and a genuine love for learning." },
    { icon: "innovation", title: "Innovation", text: "Introducing students to modern technology, Artificial Intelligence, and future-ready skills." },
    { icon: "creativity", title: "Creativity", text: "Encouraging students to question, imagine, experiment, and think beyond conventional boundaries." },
    { icon: "values", title: "Values", text: "Developing respect, empathy, honesty, responsibility, and compassion." },
    { icon: "character", title: "Character", text: "Nurturing confident and responsible individuals with strong principles." },
    { icon: "excellence", title: "Excellence", text: "Encouraging every student to discover their potential and strive for their personal best." },
  ] satisfies { icon: IconKey; title: string; text: string }[],
};

/* -------------------------------------------------------- Unique Difference */

export const difference = {
  eyebrow: "The Unique Difference",
  title: "Rooted in Values. Ready for the Future.",
  paragraphs: [
    "The world our children will grow up in will be very different from the world we know today.",
    "Artificial Intelligence, technology, innovation, and rapidly changing careers are reshaping the future. At the same time, qualities such as integrity, empathy, discipline, resilience, and respect will remain essential.",
  ],
  changing: ["Artificial Intelligence", "Technology", "Innovation", "Rapidly changing careers"],
  enduring: ["Integrity", "Empathy", "Discipline", "Resilience", "Respect"],
  bothWorlds: "Unique Academy brings both worlds together.",
  closing:
    "Our students experience a learning environment where traditional values meet modern thinking, classrooms meet technology, and education meets real-world skills.",
  meetings: [
    { from: "Traditional values", to: "Modern thinking" },
    { from: "Classrooms", to: "Technology" },
    { from: "Education", to: "Real-world skills" },
  ],
};

/* ---------------------------------------------------------------- Journey */

export const journey = {
  eyebrow: "Our Journey",
  title: "The legacy began in 1998. The journey continues in Ayodhya.",
  milestones: [
    { marker: "1998", text: "The journey of the Unique Group of Schools begins with a vision to provide meaningful, quality education." },
    { marker: "Over the Years", text: "The Unique Group grows into a trusted educational family, nurturing generations of students through a commitment to learning and values." },
    { marker: "Today", text: "Unique Academy, Ayodhya — the 7th branch of the Unique Group of Schools — carries this legacy forward with a modern approach to education." },
    { marker: "Tomorrow", text: "Our vision is to empower a new generation of confident, capable, compassionate, and future-ready individuals." },
  ],
};

/* --------------------------------------------------------- Why / Features */

export type Feature = {
  id: string;
  icon: IconKey;
  title: string;
  shortTitle: string;
  text: string;
};

export const whyUnique = {
  eyebrow: "Why Unique Academy, Ayodhya?",
  title: "A School Designed for the Future",
  features: [
    { id: "ai-lab", icon: "aiLab", title: "Dedicated AI Lab", shortTitle: "AI Lab", text: "An exciting space where students can explore Artificial Intelligence, technology, innovation, and future-ready concepts through practical learning." },
    { id: "classrooms", icon: "classrooms", title: "Fully Air-Conditioned Classrooms", shortTitle: "Air-Conditioned Classrooms", text: "Comfortable classrooms designed to provide a focused and pleasant learning environment." },
    { id: "technology", icon: "technology", title: "Technology-Enabled Education", shortTitle: "Technology-Enabled Education", text: "Modern educational tools and digital resources that make learning more interactive and engaging." },
    { id: "faculty", icon: "faculty", title: "Dedicated Faculty", shortTitle: "Dedicated Faculty", text: "Passionate educators who go beyond teaching lessons to mentor, motivate, and inspire students." },
    { id: "indoor-games", icon: "indoorGames", title: "Indoor Games", shortTitle: "Indoor Games", text: "A dedicated space for recreation, strategic thinking, coordination, teamwork, and healthy competition." },
    { id: "co-curricular", icon: "coCurricular", title: "Co-Curricular Learning", shortTitle: "Co-Curricular Learning", text: "Opportunities for students to explore creativity, culture, communication, and their individual talents." },
    { id: "holistic", icon: "holistic", title: "Holistic Development", shortTitle: "Holistic Development", text: "A balanced focus on academics, personality, confidence, communication, values, and physical well-being." },
  ] satisfies Feature[],
};

export const featureById = (id: string) => whyUnique.features.find((f) => f.id === id)!;

/* -------------------------------------------------------- Vision & Mission */

export const vision = {
  eyebrow: "Our Vision",
  statement:
    "To shape individuals who are confident in their abilities, strong in their values, curious about the world, and prepared for the future.",
  extended:
    "We envision a learning community where every child gets the opportunity to discover their potential and develop the knowledge, skills, and character needed to make a meaningful difference.",
};

export const mission = {
  eyebrow: "Our Mission",
  lead: "We are committed to creating an environment where students:",
  points: [
    "Learn with curiosity.",
    "Think independently.",
    "Create fearlessly.",
    "Use technology responsibly.",
    "Communicate confidently.",
    "Respect others.",
    "Embrace diversity.",
    "Develop strong values.",
    "Take responsibility for their actions.",
    "Strive for excellence.",
    "Prepare themselves for the future.",
  ],
};

/* ----------------------------------------------- Beyond the classroom */

export const beyond = {
  eyebrow: "Student Life",
  title: "Education Beyond the Classroom",
  lead: "At Unique Academy, we believe some of life's most important lessons cannot be found in textbooks.",
  body:
    "Through sports, indoor games, competitions, cultural activities, technology, AI projects, celebrations, collaborative learning, and personality development, students get opportunities to discover themselves beyond academics.",
  activities: [
    { icon: "sports", label: "Sports" },
    { icon: "indoorGames", label: "Indoor Games" },
    { icon: "competitions", label: "Competitions" },
    { icon: "cultural", label: "Cultural Activities" },
    { icon: "technology", label: "Technology" },
    { icon: "aiProjects", label: "AI Projects" },
    { icon: "celebrations", label: "Celebrations" },
    { icon: "collaborative", label: "Collaborative Learning" },
    { icon: "personality", label: "Personality Development" },
  ] satisfies { icon: IconKey; label: string }[],
  closing: ["Because education is not simply about what a child knows.", "It is also about who they become."],
};

/* ------------------------------------------------------- Meet the Future */

export const future = {
  eyebrow: "Meet the Future",
  title: "Today's Learners. Tomorrow's Leaders.",
  lead: "We want our students to enter the future with more than marks and certificates. We want them to carry:",
  qualities: [
    { word: "Confidence", rest: "to dream." },
    { word: "Knowledge", rest: "to achieve." },
    { word: "Creativity", rest: "to innovate." },
    { word: "Courage", rest: "to lead." },
    { word: "Values", rest: "to make a difference." },
  ],
};

/* ------------------------------------------------- Promise to parents */

export const promise = {
  eyebrow: "A Promise to Every Parent",
  title: "A Promise to Every Parent",
  paragraphs: [
    "Choosing a school is choosing an environment in which a child will spend some of the most formative years of their life.",
    "At Unique Academy, we understand that responsibility.",
  ],
  community: "We strive to create a school community where children are",
  communityWords: ["known", "supported", "encouraged", "challenged", "celebrated"],
  commitment:
    "With the experience of the Unique Group's journey since 1998 and a vision focused on the future, we are committed to giving every child an education that is meaningful, modern, and rooted in values.",
};

/* --------------------------------------------------------- Welcome / CTA */

export const welcome = {
  title: "Welcome to the Unique Journey",
  lines: ["The legacy began in 1998.", "The journey continues in Ayodhya.", "The future begins with your child."],
};
