import { Grade } from '@/models/TankModel';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidGrade = (value: number): value is Grade => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(value);
};

export const parseGrade = (gradeStr: `${Grade}`): Grade | undefined => {
  const grade = Number(gradeStr) as Grade;
  return grade >= 1 && grade <= 10 ? grade : undefined;
};

export function deepSet(
  obj: Record<string, any>,
  path: string,
  value: any
): void {
  const keys = path.split('.');
  let current = obj;

  keys.forEach((key, index) => {
    if (!current[key]) {
      current[key] = {};
    }
    if (index === keys.length - 1) {
      current[key] = value;
    }
    current = current[key];
  });
}

export function normalizeInspectionData<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) => normalizeInspectionData(item)) as T;
  } else if (typeof data === 'object' && data !== null) {
    const normalizedObject: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed === 'true') {
          normalizedObject[key] = true;
        } else if (trimmed === 'false') {
          normalizedObject[key] = false;
        } else if (trimmed === '') {
          normalizedObject[key] = null;
        } else {
          normalizedObject[key] = value;
        }
      } else if (typeof value === 'object' && value !== null) {
        normalizedObject[key] = normalizeInspectionData(value);
      } else {
        normalizedObject[key] = value;
      }
    });
    return normalizedObject as T;
  }

  return data;
}
