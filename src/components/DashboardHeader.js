import React from 'react';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center rounded-b-2xl">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard VJudge Estudiantil</h1>
      <div className="flex items-center space-x-4">
        {/* Aquí irían iconos o botones de usuario/configuración */}
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </header>
  );
};

export default DashboardHeader;