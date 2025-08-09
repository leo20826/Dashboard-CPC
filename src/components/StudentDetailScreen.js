import React from 'react';

const StudentDetailScreen = ({ student, onBack }) => {
  if (!student) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-700 text-lg">No se encontró información del estudiante.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          ← Volver al Dashboard
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Reporte de {student.name} {student.lastName}
        </h2>
        <p className="text-gray-600 mb-6">Usuario VJudge: <span className="font-semibold">{student.vjudgeUser}</span></p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Estadísticas Generales</h3>
            <p className="text-gray-700">Envíos Totales: <span className="font-bold">{student.submissions}</span></p>
            <p className="text-gray-700">Problemas Resueltos: <span className="font-bold">{student.solved}</span></p>
            <p className="text-gray-700">Problemas Intentados: <span className="font-bold">{student.attempted}</span></p>
            <p className="text-gray-700">Rank Actual: <span className="font-bold">{student.rank}</span></p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200">
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">Detalles Adicionales</h3>
            <p className="text-gray-700">ID de Estudiante: <span className="font-bold">{student.id}</span></p>
            <p className="text-gray-700">Fecha de Ingreso: <span className="font-bold">N/A (simulado)</span></p>
            <p className="text-gray-700">Última Actualización: <span className="font-bold">N/A (simulado)</span></p>
            {/* Aquí podrías añadir más detalles si los tuvieras en tus datos */}
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
          <h3 className="text-xl font-semibold text-red-700 mb-2">Notas del Profesor</h3>
          <p className="text-gray-700 italic">
            "Este es un espacio para notas personalizadas sobre el progreso del estudiante.
            Podrías añadir comentarios sobre su desempeño, áreas de mejora o logros destacados."
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailScreen;