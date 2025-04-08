// Constants for the grades module

// Minimum passing grade (Philippine standard)
export const PASSING_GRADE = 75;

// Grade descriptors based on Philippine grading system
export const GRADE_DESCRIPTORS = {
  OUTSTANDING: { min: 90, max: 100, label: 'Outstanding' },
  VERY_SATISFACTORY: { min: 85, max: 89, label: 'Very Satisfactory' },
  SATISFACTORY: { min: 80, max: 84, label: 'Satisfactory' },
  FAIRLY_SATISFACTORY: { min: 75, max: 79, label: 'Fairly Satisfactory' },
  DID_NOT_MEET: { min: 0, max: 74, label: 'Did Not Meet Expectations' }
};

// Default student information
export const DEFAULT_STUDENT_INFO = {
  name: "Maria Santos",
  section: "Grade 8 - Section A",
  schoolYear: "2024-2025"
};

// Default grades data
export const DEFAULT_GRADES = [
  { subject: "Filipino", q1: 80, q2: 89, q3: 86, q4: 84, final: 85 },
  { subject: "English", q1: 89, q2: 90, q3: 92, q4: 87, final: 90 },
  { subject: "Mathematics", q1: 82, q2: 85, q3: 83, q4: 83, final: 83 },
  { subject: "Science", q1: 86, q2: 87, q3: 85, q4: 84, final: 86 },
  { subject: "Araling Panlipunan", q1: 90, q2: 92, q3: 91, q4: 89, final: 91 },
  { subject: "Edukasyon sa Pagpapakatao", q1: 89, q2: 93, q3: 90, q4: 88, final: 90 },
  { subject: "Edukasyong Pantahanan at Pangkabuhayan", q1: 80, q2: 81, q3: 84, q4: 79, final: 81 },
  { subject: "MAPEH", q1: 85, q2: 86, q3: 85, q4: 84, final: 85 }
];

// Status color classes
export const STATUS_COLOR_CLASSES = {
  passing: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  failing: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  default: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
};
