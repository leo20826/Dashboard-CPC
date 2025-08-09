import React, { useState, useEffect } from 'react';
import CorporateHeader from './components/CorporateHeader';
import CorporateStudentCard from './components/CorporateStudentCard';
import CorporateStatsOverview from './components/CorporateStatsOverview';
import LoginScreen from './components/LoginScreen';
import StudentDetailScreen from './components/StudentDetailScreen'; // Importamos el nuevo componente

// Importamos los datos mock que ahora simulan la estructura de Google Sheets
import { students as mockStudentsFromSheets } from './mock/students';

// Función para simular la lectura de datos de Google Sheets.
// En un escenario real, aquí harías una petición a tu backend
// o a la URL pública de tu Google Sheet exportada como CSV/JSON.
const fetchStudentsFromSheets = async () => {
  // --- INICIO: ZONA A MODIFICAR PARA CONECTAR A GOOGLE SHEETS REAL ---
  // Ejemplo si publicas tu Google Sheet como CSV y lo lees:
  // const response = await fetch('URL_PUBLICA_DE_TU_GOOGLE_SHEET_CSV');
  // const csvText = await response.text();
  // const parsedData = parseCsv(csvText); // Necesitarías una librería para parsear CSV
  // return parsedData.map(row => ({
  //   id: row.id, // Asegúrate de que tu CSV tenga un ID único
  //   name: row.nombre,
  //   lastName: row.apellido,
  //   vjudgeUser: row.usuario_vjudge,
  //   // Aquí tendrías que añadir lógica para obtener submissions, solved, attempted, rank
  //   // ya sea de otra fuente o si tu hoja de cálculo los contiene.
  //   submissions: 0, solved: 0, attempted: 0, rank: 0 // Valores por defecto si no vienen de Sheets
  // }));

  // Ejemplo si usas un backend que se conecta a Google Sheets:
  // const response = await fetch('TU_ENDPOINT_DE_BACKEND_PARA_SHEETS');
  // const data = await response.json();
  // return data.students; // Asegúrate de que tu backend devuelva el formato esperado

  // Por ahora, simulamos la carga con los datos mock.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockStudentsFromSheets);
    }, 500); // Simula un pequeño retraso
  });
  // --- FIN: ZONA A MODIFICAR PARA CONECTAR A GOOGLE SHEETS REAL ---
};

// Función genérica para cargar datos de rendimiento de estudiantes desde una API de juez online.
// Esta función es un placeholder. DEBES REEMPLAZAR SU IMPLEMENTACIÓN
// con la lógica real para conectarte a la API de VJudge, Codeforces, etc.
//
// @param {string} vjudgeUser - El nombre de usuario de VJudge del estudiante.
// @returns {Promise<Object>} Una promesa que resuelve con un objeto de rendimiento (submissions, solved, attempted, rank).
const fetchPerformanceData = async (vjudgeUser) => {
  // --- INICIO: ZONA A MODIFICAR PARA CONECTAR A LA API REAL DEL JUEZ ---
  // Aquí es donde harías la llamada a la API de VJudge o Codeforces para obtener los datos de rendimiento
  // para un usuario específico.
  // Ejemplo (esto es solo un placeholder, NO FUNCIONA DIRECTAMENTE CON VJUDGE/CODEFORCES):
  // const response = await fetch(`https://api.vjudge.net/user/${vjudgeUser}/stats`);
  // const data = await response.json();
  // return {
  //   submissions: data.totalSubmissions,
  //   solved: data.totalSolved,
  //   attempted: data.totalAttempted,
  //   rank: data.globalRank
  // };

  // Por ahora, simulamos datos de rendimiento aleatorios para cada usuario.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        submissions: Math.floor(Math.random() * 200) + 50,
        solved: Math.floor(Math.random() * 100) + 20,
        attempted: Math.floor(Math.random() * 150) + 30,
        rank: Math.floor(Math.random() * 50) + 1
      });
    }, 200); // Simula un pequeño retraso por cada usuario
  });
  // --- FIN: ZONA A MODIFICAR PARA CONECTAR A LA API REAL DEL JUEZ ---
};


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null); // Nuevo estado para el estudiante seleccionado

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentData([]);
    setLoading(true);
    setError(null);
    setCurrentPage('dashboard'); // Volver al dashboard por defecto
    setSelectedStudent(null); // Limpiar estudiante seleccionado
  };

  const handleViewDetails = (student) => { // Nueva función para ver detalles
    setSelectedStudent(student);
    setCurrentPage('details');
  };

  const handleBackToDashboard = () => { // Nueva función para volver al dashboard
    setSelectedStudent(null);
    setCurrentPage('dashboard');
  };

  useEffect(() => {
    if (isLoggedIn) {
      const loadAllData = async () => {
        try {
          setLoading(true);
          setError(null);

          // 1. Cargar listado de estudiantes desde la fuente "Sheets"
          const studentsFromSheets = await fetchStudentsFromSheets();

          // 2. Para cada estudiante, obtener sus datos de rendimiento del juez
          const studentsWithPerformance = await Promise.all(
            studentsFromSheets.map(async (student) => {
              const performance = await fetchPerformanceData(student.vjudgeUser);
              return {
                ...student,
                ...performance // Combina los datos de Sheets con los de rendimiento
              };
            })
          );

          setStudentData(studentsWithPerformance);
          setLoading(false);
        } catch (err) {
          console.error("Error al cargar datos:", err);
          setError(new Error("No se pudieron cargar los datos. Revisa la conexión a Google Sheets o a la API del juez."));
          setLoading(false);
        }
      };
      loadAllData();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-gray-700 text-lg">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-red-600 text-lg">Error al cargar los datos: {error.message}</p>
      </div>
    );
  }

  // Renderizado condicional basado en la página actual
  if (currentPage === 'details') {
    return <StudentDetailScreen student={selectedStudent} onBack={handleBackToDashboard} />;
  }

  const totalStudents = studentData.length;
  const totalSubmissions = studentData.reduce((sum, student) => sum + student.submissions, 0);
  const totalSolved = studentData.reduce((sum, student) => sum + student.solved, 0);
  const totalAttempted = studentData.reduce((sum, student) => sum + student.attempted, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <CorporateHeader onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-6">
        {currentPage === 'dashboard' && (
          <>
            <CorporateStatsOverview
              totalStudents={totalStudents}
              totalSubmissions={totalSubmissions}
              totalSolved={totalSolved}
              totalAttempted={totalAttempted}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {studentData.map(student => (
                <CorporateStudentCard key={student.id} student={student} onViewDetails={handleViewDetails} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;