import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deepSet(obj, path, value) {
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

export function normalizeInspectionData(data) {
  if (Array.isArray(data)) {
    return data.map((item) => normalizeInspectionData(item));
  } else if (typeof data === 'object' && data !== null) {
    const normalizedObject = {};

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
    return normalizedObject;
  }

  return data;
}
