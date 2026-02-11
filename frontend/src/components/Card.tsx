import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  hover?: boolean;
  glowEffect?: boolean;
  className?: string;
}

const Card = ({
  children,
  className = '',
  glowEffect = false,
  hover = false,
  icon,
  subtitle,
  title,
}: CardProps) => {
  return (
    <div
      className={`bg-gray-900 rounded-xl border border-gray-700 shadow-md p-6 transition-all cursor-pointer
    ${hover ? 'hover:border-primary-500 hover:shoadow-lg hover:-translate-y-0.5' : ''}
    ${glowEffect ? 'glow' : ''}
    ${className} 
    `}
    >
      {children}
    </div>
  );
};

export default Card;
