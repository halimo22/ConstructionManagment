import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'green' | 'amber' | 'red';
  className?: string;
  labelClassName?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  showPercentage = true,
  size = 'md',
  color = 'primary',
  className = '',
  labelClassName = '',
}) => {
  // Ensure value is between 0 and 100
  const percentage = Math.min(Math.max(0, value), 100);
  
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-2.5',
  };
  
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    green: 'bg-green-600',
    amber: 'bg-amber-500',
    red: 'bg-red-600',
  };
  
  return (
    <div className={className}>
      <div className={cn('w-full bg-gray-200 rounded-full', heightClasses[size])}>
        <div 
          className={cn(colorClasses[color], 'rounded-full', heightClasses[size])} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {showPercentage && (
        <span className={cn('text-xs text-gray-500 mt-1', labelClassName)}>
          {percentage}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
