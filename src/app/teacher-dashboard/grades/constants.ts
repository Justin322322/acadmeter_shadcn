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
  name: "",
  section: "",
  schoolYear: ""
};

// Default grades data - empty for manual input
export const DEFAULT_GRADES = [
  { subject: "", q1: 0, q2: 0, q3: 0, q4: 0, final: 0 },
  { subject: "", q1: 0, q2: 0, q3: 0, q4: 0, final: 0 },
  { subject: "", q1: 0, q2: 0, q3: 0, q4: 0, final: 0 },
  { subject: "", q1: 0, q2: 0, q3: 0, q4: 0, final: 0 },
  { subject: "", q1: 0, q2: 0, q3: 0, q4: 0, final: 0 },
  { subject: "", q1: 0, q2: 0, q3: 0, q4: 0, final: 0 },
  { subject: "", q1: 0, q2: 0, q3: 0, q4: 0, final: 0 },
  { subject: "", q1: 0, q2: 0, q3: 0, q4: 0, final: 0 }
];

// Status color classes
export const STATUS_COLOR_CLASSES = {
  passing: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  failing: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  default: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
};
