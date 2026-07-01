import React from 'react';
import { cn } from '../../lib/utils';
import { Minus, Plus } from 'lucide-react';

interface QuantityPickerProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

export const QuantityPicker: React.FC<QuantityPickerProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
  disabled = false,
  className,
}) => {
  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg border border-secondary-200 dark:border-secondary-700',
        className
      )}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        className={cn(
          'flex items-center justify-center text-secondary-600 transition-colors',
          'hover:bg-secondary-100 dark:hover:bg-secondary-800',
          'disabled:cursor-not-allowed disabled:opacity-50',
          size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
        )}
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          'w-12 border-0 bg-transparent text-center text-secondary-900 dark:text-white focus:outline-none focus:ring-0',
          size === 'sm' ? 'h-8 text-sm' : 'h-10',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      />
      <button
        type="button"
        onClick={increment}
        disabled={disabled || value >= max}
        className={cn(
          'flex items-center justify-center text-secondary-600 transition-colors',
          'hover:bg-secondary-100 dark:hover:bg-secondary-800',
          'disabled:cursor-not-allowed disabled:opacity-50',
          size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
        )}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};
