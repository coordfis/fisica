# Física 2027 · Saco Oliveros

Portal de materiales de la plana de Física para 2027, con inicio de sesión de Google y lectura de materiales autorizada por Firebase Authentication y Firestore.

La integración de acceso está preparada en esta rama y requiere crear y configurar un proyecto Firebase propio con la cuenta institucional `coord.fis@sacooliveros.edu.pe` antes de publicarse. Ver `firebase/ACTIVACION.md`.

## Programas

- Vacaciones DivertiCreativas
- Verano San Marcos
- Verano UNI
- Aulas regulares: 1.º a 5.º de secundaria
- Quinto UNI
- Quinto San Marcos

Cada programa o grado organiza libros, tareas, diapositivas, prácticas, evaluaciones y otros materiales.

## Agregar enlaces

Actualizar el documento protegido `portales/fisica2027` en Firestore y añadir un objeto al arreglo `recursos` del programa o grado correspondiente:

```js
{
  titulo: 'Libro · Tomo 1',
  tipo: 'libros',
  url: 'https://enlace-real-del-material',
  descripcion: 'Descripción opcional'
}
```

Tipos: `libros`, `tareas`, `diapositivas`, `practicas`, `evaluaciones`, `otros`.

## Archivos

- `index.html`: estructura de la página.
- `styles.css`: diseño adaptable a escritorio y celular.
- `app.js`: navegación y accesos a los materiales, con una interfaz minimalista sin iconos, buscadores ni filtros.
- `auth.js`: ingreso con Google, carga autorizada y cierre de sesión.
- `access-policy.js`: filtro de cuentas y control del estado de acceso.
- `firebase-config.js`: configuración pública del cliente Firebase.
- `firebase/firestore.rules`: reglas del proyecto institucional que permiten leer los materiales únicamente a los dos correos autorizados.
- `tests/access.test.js`: pruebas del control de acceso y de los cambios de sesión.
- `.nojekyll`: publicación de los archivos estáticos sin Jekyll.

## Publicación en GitHub Pages

El sitio está preparado para publicarse desde la raíz de la rama `gh-pages`. En Settings → Pages, seleccionar **Deploy from a branch → gh-pages → /(root)** y guardar si no estuviera activado automáticamente.

La rama `main` contiene también el código. Para publicar cambios, actualizar `gh-pages` con el contenido de `main`. No se necesita compilar. Antes de publicar esta integración debe completarse `firebase/ACTIVACION.md`. Los permisos de cada documento enlazado se administran en Google Drive u otro servicio de origen.
