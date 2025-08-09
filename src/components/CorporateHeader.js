import React from 'react';

const CorporateHeader = ({ onLogout }) => { // Recibe la función onLogout
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        {/* Letras CPC con colores en el orden correcto */}
        <span className="text-blue-500 font-bold text-2xl">C</span>
        <span className="text-yellow-500 font-bold text-2xl">P</span>
        <span className="text-red-500 font-bold text-2xl">C</span>
        <h1 className="text-xl font-semibold ml-3">Dashboard Estudiantil</h1>
      </div>
      <nav>
        {/* Botón de Cerrar Sesión */}
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default CorporateHeader;