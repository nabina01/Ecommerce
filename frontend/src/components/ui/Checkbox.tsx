import React from 'react';
import { cn } from '../../lib/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, checked, ...props }, ref) => {
    const checkboxId = props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-start">
        <div className="flex h-6 items-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={checked}
            className={cn(
              'h-4 w-4 rounded border-secondary-300 text-primary-600',
              'focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
              'dark:border-secondary-600 dark:bg-secondary-900',
              error && 'border-red-500',
              className
            )}
            {...props}
          />
        </div>
        {(label || description || error) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={checkboxId}
                className="text-sm font-medium text-secondary-900 dark:text-secondary-100"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-secondary-500">{description}</p>
            )}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
