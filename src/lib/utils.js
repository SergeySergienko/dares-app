import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
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
