import { useState } from 'react';
import { QrReader } from '@blackbox-vision/react-qr-reader';

interface Props {
  onTokenRead: (token: string) => void;
}

const CartonQRReader = ({ onTokenRead }: Props) => {
  const [error, setError] = useState('');

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-2 font-semibold">Escanea el QR de tu cartón</h3>
      <div className="w-60 h-60 mb-2 bg-gray-200 rounded">
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result, error) => {
            if (!!result) {
              onTokenRead(result.getText());
            }
            if (!!error) {
              setError('No se pudo leer el QR. Intenta de nuevo.');
            }
          }}
          containerStyle={{ width: '100%', height: '100%' }}
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default CartonQRReader;
