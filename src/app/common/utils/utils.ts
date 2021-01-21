export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function removeDuplicates<T>(arr: T[]): T[] {
  const set = new Set(arr);
  const values = set.values();
  return Array.from(values);
}
