import { type InputHTMLAttributes, type ReactNode, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  icon?: ReactNode;
  label?: string;
  error?: string;
  id?: string;
}

const Input = ({ icon, fullWidth, error, label, id, ...rest }): InputProps => {
  const generatedId = useId();
  const inputId = id || generatedId;
  return (
    <div>
      <input />
    </div>
  );
};

export default Input;
