export function wrapIndex(n: number, count: number): number {
  return ((n % count) + count) % count;
}

export function frameIndexFromDrag(
  startIndex: number,
  dx: number,
  sensitivity: number,
  frameCount: number,
): number {
  return wrapIndex(Math.round(startIndex - dx / sensitivity), frameCount);
}

export function frameUrl(
  frameDir: string,
  index: number,
  framePad: number,
  frameExt = "webp",
): string {
  return `${frameDir}${String(index + 1).padStart(framePad, "0")}.${frameExt}`;
}

export function angleFromIndex(index: number, frameCount: number): number {
  return Math.round((index / frameCount) * 360) % 360;
}
