import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
    icon?: ReactNode;
    label?: string;
    error?:string;
}



const Input = () => {
  return (
    <div>
      <input />
    </div>
  );
};

export default Input;
