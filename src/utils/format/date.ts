export function formatDate(date: Date): string {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
