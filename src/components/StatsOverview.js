import React from 'react';

const StatsOverview = ({ totalStudents, totalSubmissions, totalSolved }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h4 className="text-lg font-semibold text-gray-800">Total Estudiantes</h4>
        <p className="text-3xl font-bold text-black mt-2">{totalStudents}</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h4 className="text-lg font-semibold text-gray-800">Total Envíos</h4>
        <p className="text-3xl font-bold text-black mt-2">{totalSubmissions}</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h4 className="text-lg font-semibold text-gray-800">Total Resueltos</h4>
        <p className="text-3xl font-bold text-black mt-2">{totalSolved}</p>
      </div>
    </div>
  );
};

export default StatsOverview;