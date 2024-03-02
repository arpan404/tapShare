const UNITS = ["B", "KB", "MB", "GB", "TB"];
const DIVISOR = 1024;

export function formatFileSize(sizeInBytes: number): string {
  let unitIndex: number = 0;
  let size: number = sizeInBytes;

  while (size >= DIVISOR && unitIndex < UNITS.length - 1) {
    size /= DIVISOR;
    unitIndex++;
  }

  const formattedSize = size.toFixed(2);
  const unit = UNITS[unitIndex];

  return `${formattedSize} ${unit}` as string;
}
