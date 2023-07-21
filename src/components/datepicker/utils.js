export const range = (min, max) => Array.from({ length: (max - min + 1) }, (_, i) => min + i);
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);