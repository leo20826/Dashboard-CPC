import React from 'react';

const CorporateStatsOverview = ({ totalStudents, totalSubmissions, totalSolved, totalAttempted }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6"> {/* Cambiado a 4 columnas */}
      {/* Tarjetas con bordes de colores sutiles en el orden correcto */}
      <div className="bg-white p-5 rounded-lg shadow-sm border-t-4 border-blue-500 text-center">
        <h4 className="text-md font-medium text-gray-700">Total Estudiantes</h4>
        <p className="text-2xl font-bold text-gray-900 mt-1">{totalStudents}</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-sm border-t-4 border-yellow-500 text-center">
        <h4 className="text-md font-medium text-gray-700">Total Envíos</h4>
        <p className="text-2xl font-bold text-gray-900 mt-1">{totalSubmissions}</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-sm border-t-4 border-red-500 text-center">
        <h4 className="text-md font-medium text-gray-700">Total Resueltos</h4>
        <p className="text-2xl font-bold text-gray-900 mt-1">{totalSolved}</p>
      </div>
      {/* Nueva tarjeta para Ejercicios Intentados */}
      <div className="bg-white p-5 rounded-lg shadow-sm border-t-4 border-green-500 text-center"> {/* Nuevo color para diferenciar */}
        <h4 className="text-md font-medium text-gray-700">Total Intentados</h4>
        <p className="text-2xl font-bold text-gray-900 mt-1">{totalAttempted}</p>
      </div>
    </div>
  );
};

export default CorporateStatsOverview;