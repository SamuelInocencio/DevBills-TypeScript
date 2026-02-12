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
    ${hover ? 'hover:border-primary-500 hover:shadow-lg hover:-translate-y-0.5' : ''}
    ${glowEffect ? 'glow' : ''}
    ${className} 
    `}
    >
      {(title || icon || subtitle) && (
        <div className="mb-4">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="p-2 bg-primary-500/10 rounded-xl flex items-center justify-center">
                {icon}
              </div>
            )}
            {title && <h3 className="text-lg font-medium">{title}</h3>}
          </div>
          {subtitle && <p className="text-sm text-gray-400 mt-2">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
