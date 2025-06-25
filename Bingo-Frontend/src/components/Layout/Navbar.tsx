import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">Bingo App</Link>
      <div>
        {!user && (
          <>
            <Link to="/login" className="mx-2 hover:underline">Iniciar sesión</Link>
            <Link to="/register" className="mx-2 hover:underline">Registrarse</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/carton" className="mx-2 hover:underline">Mis Cartones</Link>
            <button
              className="mx-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              onClick={handleLogout}
            >
              Salir
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
