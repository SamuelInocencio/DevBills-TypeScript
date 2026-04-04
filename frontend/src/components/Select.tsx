import { type ReactNode, type SelectHTMLAttributes, useId } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  options: SelectOption[];
}

const Select = ({
  label,
  options,
  icon,
  error,
  fullWidth = true,
  className = '',
  id,
  ...rest
}: SelectProps) => {
  const selectID = useId();

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && <label htmlFor={selectID}>{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
            {icon}
          </div>
        )}
        <select id={selectID} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default Select;
