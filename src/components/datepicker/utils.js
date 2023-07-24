/*  */
export const range = (min, max) => Array.from({ length: (max - min + 1) }, (_, i) => min + i);
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

/*  */
export const daysCount = (year, month) => new Date(year, month + 1, 0).getDate();
export const weekCount = (daysCount) => Math.ceil(daysCount / 7);