import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
  const { authState } = useAuth();

  // Enquanto o Firebase restaura a sessão não dá para decidir nada: redirecionar
  // aqui expulsaria quem está logado e apagaria a URL atual do histórico.
  if (authState.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
