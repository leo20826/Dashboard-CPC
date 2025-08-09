import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CorporateStudentCard = ({ student, onViewDetails }) => { // Recibe onViewDetails
  const handleExportPdf = async () => {
    const input = document.getElementById(`student-card-${student.id}`); // Obtener el elemento de la tarjeta
    if (!input) {
      alert("No se pudo encontrar el elemento para exportar a PDF.");
      return;
    }

    // Ocultar botones antes de generar el PDF para que no aparezcan en el documento
    const buttons = input.querySelectorAll('button');
    buttons.forEach(button => button.style.visibility = 'hidden');

    try {
      const canvas = await html2canvas(input, { scale: 2 }); // Aumentar escala para mejor calidad
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // Ancho A4 en mm
      const pageHeight = 297; // Alto A4 en mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${student.name}_${student.lastName}_reporte.pdf`);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un error al generar el PDF. Inténtalo de nuevo.");
    } finally {
      // Mostrar botones de nuevo
      buttons.forEach(button => button.style.visibility = 'visible');
    }
  };

  return (
    <div id={`student-card-${student.id}`} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors duration-200">
      <h3 className="text-lg font-medium text-gray-900">{student.name} {student.lastName}</h3>
      <div className="mt-3 text-sm text-gray-700">
        <p>Usuario VJudge: <span className="font-semibold">{student.vjudgeUser}</span></p>
        <p>Envíos: <span className="font-semibold">{student.submissions}</span></p>
        <p>Resueltos: <span className="font-semibold">{student.solved}</span></p>
        <p>Intentados: <span className="font-semibold">{student.attempted}</span></p>
        <p>Rank: <span className="font-semibold">{student.rank}</span></p>
      </div>
      {/* Botón para ver detalles */}
      <button
        onClick={() => onViewDetails(student)} // Llama a la función pasada por props
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
      >
        Ver Reporte
      </button>
      {/* Botón para exportar a PDF */}
      <button
        onClick={handleExportPdf}
        className="w-full mt-2 bg-gray-200 text-gray-800 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors"
      >
        Exportar a PDF
      </button>
    </div>
  );
};

export default CorporateStudentCard;