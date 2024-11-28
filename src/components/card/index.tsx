import React from 'react';
import { Paper as MCard, PaperProps } from '@mui/material';
import { cn } from '@/utils/cn';

interface ICardProps extends PaperProps {
  children: React.ReactNode;
  elevation?: PaperProps['elevation'];
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, ICardProps>(
  ({ children, elevation = 0, className, ...rest }, ref) => {
    return (
      <MCard
        {...rest}
        ref={ref}
        className={cn('bg-white p-4', !elevation && 'shadow-sm', className)}
        elevation={elevation}
      >
        {children}
      </MCard>
    );
  }
);

Card.displayName = 'Card';

export default Card;
