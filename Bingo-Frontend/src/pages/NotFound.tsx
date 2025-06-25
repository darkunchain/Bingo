import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
    <p className="text-xl mb-6">Página no encontrada</p>
    <Link
      to="/"
      className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-900"
    >
      Volver al inicio
    </Link>
  </div>
);

export default NotFound;
