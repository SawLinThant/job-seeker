import { cn } from '@/utils/cn';

export function ActiveCell({ renderedCellValue, row, className }: any) {
  return (
    <p
      className={cn(
        ' text-white inline-block px-2 rounded-md',
        className,
        renderedCellValue === 'Active' && 'text-green-500 bg-green-500/30',
        renderedCellValue !== 'Active' && 'text-red-500 bg-red-500/30'
      )}
    >
      {renderedCellValue === 'Active' ? 'active' : 'unactive'}
    </p>
  );
}
