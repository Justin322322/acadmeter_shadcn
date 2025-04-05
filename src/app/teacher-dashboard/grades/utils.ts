// Utility functions for the grades module
import { GradeEntryBase, GradeStatus } from './types';
import { GRADE_DESCRIPTORS, PASSING_GRADE, STATUS_COLOR_CLASSES } from './constants';

// Get grade descriptor based on score
export const getGradeDescriptor = (grade: number) => {
  if (grade >= GRADE_DESCRIPTORS.OUTSTANDING.min) return GRADE_DESCRIPTORS.OUTSTANDING;
  if (grade >= GRADE_DESCRIPTORS.VERY_SATISFACTORY.min) return GRADE_DESCRIPTORS.VERY_SATISFACTORY;
  if (grade >= GRADE_DESCRIPTORS.SATISFACTORY.min) return GRADE_DESCRIPTORS.SATISFACTORY;
  if (grade >= GRADE_DESCRIPTORS.FAIRLY_SATISFACTORY.min) return GRADE_DESCRIPTORS.FAIRLY_SATISFACTORY;
  return GRADE_DESCRIPTORS.DID_NOT_MEET;
};

// Calculate grade status
export const calculateGradeStatus = (grade: number): GradeStatus => {
  // Ensure we have a valid grade
  const validGrade = grade || 0;

  if (validGrade >= PASSING_GRADE) return 'passing';
  if (validGrade >= PASSING_GRADE - 5) return 'warning'; // Within 5 points of passing
  return 'failing';
};

// Get status color class
export const getStatusColorClass = (status: GradeStatus | undefined): string => {
  if (status === 'passing') return STATUS_COLOR_CLASSES.passing;
  if (status === 'warning') return STATUS_COLOR_CLASSES.warning;
  if (status === 'failing') return STATUS_COLOR_CLASSES.failing;
  return STATUS_COLOR_CLASSES.default;
};

// Calculate current quarter based on date
export const getCurrentQuarter = (): 1 | 2 | 3 | 4 => {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  if (currentMonth >= 6 && currentMonth <= 8) return 1; // Q1: Jun-Aug
  if (currentMonth >= 9 && currentMonth <= 11) return 2; // Q2: Sep-Nov
  if (currentMonth >= 12 || currentMonth <= 2) return 3; // Q3: Dec-Feb
  return 4; // Q4: Mar-May
};

// Calculate grade to date for each subject - include all quarters up to current
export const calculateGradeToDate = (grade: GradeEntryBase, currentQuarter: number): number => {
  let sum = 0;
  let count = 0;
  const quarters = [grade.q1, grade.q2, grade.q3, grade.q4];

  // Include all quarters up to and including the current one
  for (let i = 0; i < currentQuarter; i++) {
    // Only count if there's a valid grade (greater than 0)
    if (quarters[i] > 0) {
      sum += quarters[i];
      count++;
    }
  }

  // If no grades yet for current quarters, use the final grade as fallback
  if (count === 0) {
    return grade.final;
  }

  return Math.round(sum / count);
};
