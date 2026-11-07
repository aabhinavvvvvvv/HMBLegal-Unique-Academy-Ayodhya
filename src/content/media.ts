/**
 * Photography registry — the school's own photographs, in /public/images/school.
 * Originals as supplied are kept (unserved) in /assets-source/photos-original.
 *
 * `position` is the CSS object-position used when a photo is cropped to fit a
 * frame, so faces stay in view. Any `photos` slot left `null` renders a designed
 * illustration panel instead of generic stock imagery.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
  caption?: string;
};

export type GalleryCategory = "Celebrations" | "Cultural Programmes" | "Learning";

export type GalleryItem = Photo & { category: GalleryCategory };

const dir = "/images/school";

/** Every photograph, keyed by a short name. */
export const library = {
  courtyard: {
    src: `${dir}/dussehra-craft-courtyard.jpg`,
    width: 960,
    height: 640,
    position: "50% 60%",
    alt: "Young students in red-and-white uniforms gather with their teachers in the school courtyard, holding up golden paper Ravana crowns they made for Dussehra",
    caption: "Dussehra craft activity in the school courtyard",
  },
  scienceProject: {
    src: `${dir}/science-project-water-purifier.jpg`,
    width: 1040,
    height: 780,
    position: "50% 55%",
    alt: "Students in school blazers smile beside the water purifier model they built for a science exhibition in their classroom",
    caption: "A water purifier project at the science exhibition",
  },
  ukgCraft: {
    src: `${dir}/ukg-students-ravana-craft.jpg`,
    width: 528,
    height: 960,
    position: "50% 40%",
    alt: "Two young students in sports uniform stand outside the UKG classroom, proudly holding a ten-headed Ravana paper craft",
    caption: "Craft time outside the UKG classroom",
  },
  republicDay: {
    src: `${dir}/republic-day-human-pyramid.jpg`,
    width: 720,
    height: 1190,
    position: "50% 35%",
    alt: "On Republic Day, students form a human pyramid in the courtyard while a girl at the top waves the Indian tricolour and classmates salute",
    caption: "Republic Day — a human pyramid crowned with the tricolour",
  },
  stageDance: {
    src: `${dir}/stage-dance-performance.jpg`,
    width: 1599,
    height: 1066,
    position: "45% 50%",
    alt: "Children in bright festive outfits dance on stage in front of a mountain-and-river backdrop",
    caption: "A joyful group dance on the cultural stage",
  },
  classicalWide: {
    src: `${dir}/classical-dance-wide.jpg`,
    width: 1600,
    height: 716,
    position: "50% 50%",
    alt: "Girls in yellow classical dance costumes hold a graceful pose on a stage framed with marigold garlands",
    caption: "Classical dance on a marigold-framed stage",
  },
  compere: {
    src: `${dir}/student-compere-podium.jpg`,
    width: 1066,
    height: 1599,
    position: "50% 40%",
    alt: "A student confidently compères a school programme from a podium bearing the Unique Academy name",
    caption: "A student compères the programme",
  },
  skit: {
    src: `${dir}/stage-skit.jpg`,
    width: 1600,
    height: 900,
    position: "60% 50%",
    alt: "Students in school uniform perform a skit on stage",
    caption: "Students bring a story to life in a stage skit",
  },
  classicalEnsemble: {
    src: `${dir}/classical-dance-ensemble.jpg`,
    width: 1600,
    height: 1333,
    position: "50% 45%",
    alt: "A group of girls in yellow classical costumes performs a dance, arms raised in expressive mudras",
    caption: "Classical dance ensemble",
  },
  dandiya: {
    src: `${dir}/dandiya-celebration.jpg`,
    width: 1280,
    height: 720,
    position: "50% 55%",
    alt: "Students and teachers in festive clothes play dandiya with colourful sticks in the school courtyard",
    caption: "Dandiya celebrations in the courtyard",
  },
  ganeshVandana: {
    src: `${dir}/ganesh-vandana-dance.jpg`,
    width: 1599,
    height: 1066,
    position: "50% 45%",
    alt: "Girls in red silk costumes perform a Ganesh Vandana dance around a classmate dressed as Lord Ganesha",
    caption: "Ganesh Vandana performance",
  },
  stageGroup: {
    src: `${dir}/stage-dance-group.jpg`,
    width: 1599,
    height: 1066,
    position: "50% 45%",
    alt: "Students in maroon outfits dance on a brightly lit stage",
    caption: "Dance performance on the cultural stage",
  },
  folkDance: {
    src: `${dir}/folk-dance-ensemble.jpg`,
    width: 1600,
    height: 1064,
    position: "50% 45%",
    alt: "A line of girls in pink and orange lehengas performs a folk dance on stage",
    caption: "Folk dance ensemble",
  },
  solarModel: {
    src: `${dir}/teacher-students-solar-model.jpg`,
    width: 1156,
    height: 571,
    position: "50% 40%",
    alt: "A teacher stands with her students in blazers around the solar power model they built together",
    caption: "Students and their teacher with a solar power project",
  },
} satisfies Record<string, Photo>;

/** Feature-specific slots used on the "Why Unique" page. */
export const photos: Record<
  "aiLab" | "classrooms" | "technology" | "faculty" | "indoorGames" | "coCurricular" | "holistic",
  Photo | null
> = {
  aiLab: null, // no photograph of the AI Lab yet
  classrooms: library.scienceProject,
  technology: null, // no photograph of digital learning yet
  faculty: library.solarModel,
  indoorGames: null, // no photograph of the indoor games room yet
  coCurricular: library.classicalEnsemble,
  holistic: library.republicDay,
};

/** Photo shown beside each inner-page title. */
export const heroPhotos = {
  about: library.courtyard,
  visionMission: library.compere,
  studentLife: library.dandiya,
  admissions: library.ukgCraft,
} satisfies Record<string, Photo>;

/** Home page: three images woven into the introduction. */
export const introPhotos = [library.courtyard, library.republicDay, library.ganeshVandana];

/** Mosaics (first item is the large tile). */
export const homeMosaic = [
  library.stageDance,
  library.dandiya,
  library.scienceProject,
  library.skit,
  library.folkDance,
  library.classicalWide,
];

export const studentLifeMosaic = [
  library.ganeshVandana,
  library.skit,
  library.compere,
  library.classicalWide,
  library.stageGroup,
  library.courtyard,
];

/** Gallery page. It and its menu link are published automatically when this has items. */
export const gallery: GalleryItem[] = [
  { ...library.courtyard, category: "Celebrations" },
  { ...library.ganeshVandana, category: "Cultural Programmes" },
  { ...library.solarModel, category: "Learning" },
  { ...library.dandiya, category: "Celebrations" },
  { ...library.classicalEnsemble, category: "Cultural Programmes" },
  { ...library.republicDay, category: "Celebrations" },
  { ...library.scienceProject, category: "Learning" },
  { ...library.stageDance, category: "Cultural Programmes" },
  { ...library.compere, category: "Cultural Programmes" },
  { ...library.ukgCraft, category: "Learning" },
  { ...library.folkDance, category: "Cultural Programmes" },
  { ...library.skit, category: "Cultural Programmes" },
  { ...library.stageGroup, category: "Cultural Programmes" },
  { ...library.classicalWide, category: "Cultural Programmes" },
];

export const hasGallery = gallery.length > 0;
