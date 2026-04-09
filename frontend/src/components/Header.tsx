import { Activity } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface NavLink {
  name: string;
  path: string;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { authState, signOut } = useAuth();
  const { pathname } = useLocation();

  const isAuthenticated: boolean = !!authState.user;

  const navLink: NavLink[] = [
    { name: 'DashBoard', path: '/dashboard' },
    { name: 'Transações', path: '/transacoes' },
  ];

  const renderAvatar = () => {
    if (!authState.user) return null;

    if (authState.user.photoURL) {
      <img
        src={authState.user.photoURL}
        alt={`foto de perfil do(a) ${authState.user.displayName}`}
        className="w-8 h-8 rounded-full border border-gray-700"
      />;
    }

    return (
      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
        {authState.user.displayName?.charAt(0)}
      </div>
    );
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="container-app">
        <div className="flex justify-between items-center py-4">
          {/*LOGO*/}
          <Link
            to="/"
            className="flex gap-2 text-xl text-primary-500 items-center font-bold"
          >
            <Activity className="h-6 w-6" />
            DevBills
          </Link>

          {/*MENU DESKTOP */}

          {isAuthenticated && (
            <nav className='hidden md:flex space-x-3'>
              {navLink.map((link) => (
                <Link key={link.path} to={link.path}>
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
