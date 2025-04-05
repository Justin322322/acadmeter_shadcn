// Type definitions for the grades module

// Student information type
export type StudentInfo = {
  name: string;
  section: string;
  schoolYear: string;
};

// Base grade entry type
export type GradeEntryBase = {
  subject: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  final: number;
};

// Grade status type
export type GradeStatus = 'passing' | 'failing' | 'warning';

// Extended grade entry with calculated fields
export type GradeEntry = GradeEntryBase & {
  gradeToDate: number;
  status: GradeStatus;
};
