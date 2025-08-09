import React from 'react';

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-900">{student.name}</h3>
      <p className="text-gray-600 mt-2">Envíos: {student.submissions}</p>
      <p className="text-gray-600">Resueltos: {student.solved}</p>
      <p className="text-gray-600">Rank: {student.rank}</p>
      <button className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
        Ver Detalles
      </button>
    </div>
  );
};

export default StudentCard;