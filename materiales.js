/* Agregar aquí los enlaces compartidos. Cada recurso debe tener:
   { titulo: 'Libro · Tomo 1', tipo: 'libros', url: 'https://...', descripcion: 'Opcional' }
   Tipos: libros, tareas, diapositivas, practicas, evaluaciones, otros.
   En aulas regulares, colocar los recursos en el arreglo del grado correspondiente.
   No agregar datos personales ni enlaces que no deban ser visibles en el repositorio público.
*/
window.FISICA_2027 = {
  programas: [
    { id: 'vacaciones-diverticreativas', nombre: 'Vacaciones DivertiCreativas', etiqueta: 'VACACIONES', descripcion: 'Recursos para aprender, explorar y reforzar durante las vacaciones.', icono: 'sun', color: 'amber', recursos: [
      { titulo: 'Libros', tipo: 'libros', url: 'https://drive.google.com/drive/folders/1TVgRhvPazBMvKTNQThMYQ328OppT1eK5?usp=drive_link' },
      { titulo: 'Modelo de diapositivas', tipo: 'diapositivas', url: 'https://docs.google.com/presentation/d/14QKeSj2iGzx0HM1bqixLhbDf2s-D7Loz/edit?usp=drive_link&ouid=106404153639709258220&rtpof=true&sd=true' },
      { titulo: 'Diapositivas', tipo: 'diapositivas', url: 'https://drive.google.com/drive/folders/1-hBSICLtpckyFRkLeInLjR4FtTAlrggA?usp=drive_link' }
    ] },
    { id: 'verano-san-marcos', nombre: 'Verano San Marcos', etiqueta: 'PREUNIVERSITARIO', descripcion: 'Materiales del ciclo de verano con preparación San Marcos.', icono: 'sunrise', color: 'coral', recursos: [] },
    { id: 'verano-uni', nombre: 'Verano UNI', etiqueta: 'PREUNIVERSITARIO', descripcion: 'Materiales del ciclo de verano con preparación UNI.', icono: 'orbit', color: 'blue', recursos: [] },
    { id: 'aulas-regulares', nombre: 'Aulas regulares', etiqueta: 'SECUNDARIA', descripcion: 'Todo el material escolar, organizado de primero a quinto grado.', icono: 'school', color: 'green', grados: [
      { id: '1', nombre: '1.º de secundaria', recursos: [] },
      { id: '2', nombre: '2.º de secundaria', recursos: [] },
      { id: '3', nombre: '3.º de secundaria', recursos: [] },
      { id: '4', nombre: '4.º de secundaria', recursos: [] },
      { id: '5', nombre: '5.º de secundaria', recursos: [] }
    ] },
    { id: 'quinto-uni', nombre: 'Quinto UNI', etiqueta: 'QUINTO DE SECUNDARIA', descripcion: 'Libros, tareas y recursos para la preparación de quinto UNI.', icono: 'compass', color: 'violet', recursos: [] },
    { id: 'quinto-san-marcos', nombre: 'Quinto San Marcos', etiqueta: 'QUINTO DE SECUNDARIA', descripcion: 'Libros, tareas y recursos para la preparación de quinto San Marcos.', icono: 'graduation', color: 'teal', recursos: [] }
  ],
  tipos: [
    { id: 'libros', nombre: 'Libros', descripcion: 'Tomos, textos y material de consulta.', icono: 'book' },
    { id: 'tareas', nombre: 'Tareas', descripcion: 'Actividades y trabajo para casa.', icono: 'clipboard' },
    { id: 'diapositivas', nombre: 'Diapositivas', descripcion: 'Presentaciones para las clases.', icono: 'slides' },
    { id: 'practicas', nombre: 'Prácticas', descripcion: 'Ejercicios y prácticas dirigidas.', icono: 'pencil' },
    { id: 'evaluaciones', nombre: 'Evaluaciones', descripcion: 'Exámenes y controles de aprendizaje.', icono: 'check' },
    { id: 'otros', nombre: 'Otros materiales', descripcion: 'Recursos de apoyo para el equipo.', icono: 'folder' }
  ]
};
