import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <h1 className="text-4xl font-bold mb-6">Bienvenido al Bingo en Línea</h1>
    <p className="text-lg mb-6 text-center">
      Participa en juegos de bingo en tiempo real.  
      Ingresa con tu usuario, reclama tus cartones y disfruta del juego.
    </p>
    <div className="flex gap-4">
      <Link to="/login" className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-900">
        Iniciar Sesión
      </Link>
      <Link to="/carton" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-800">
        Ingresar código de cartón
      </Link>
    </div>
  </div>
);

export default Home;
