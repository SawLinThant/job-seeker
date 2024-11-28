import { cn } from '@/utils/cn';

export function TextCell({ renderedCellValue, row, className }: any) {
  return <p className={cn(' text-white', className)}>{renderedCellValue}</p>;
}
