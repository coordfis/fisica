# Física 2027 · Saco Oliveros

Portal público de materiales de la plana de Física para 2027. Implementado con HTML, CSS y JavaScript; no requiere cuentas, inicio de sesión, dependencias ni servicios de ChatGPT.

## Programas

- Vacaciones DivertiCreativas
- Verano San Marcos
- Verano UNI
- Aulas regulares: 1.º a 5.º de secundaria
- Quinto UNI
- Quinto San Marcos

Cada programa o grado organiza libros, tareas, diapositivas, prácticas, evaluaciones y otros materiales. Los enlaces pendientes se señalan sin incluir direcciones ficticias.

## Agregar enlaces

Editar `materiales.js` y añadir un objeto al arreglo `recursos` del programa o grado correspondiente:

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
- `materiales.js`: programas, grados y enlaces.
- `.nojekyll`: publicación de los archivos estáticos sin Jekyll.

## Publicación en GitHub Pages

El sitio está preparado para publicarse desde la raíz de la rama `gh-pages`. En Settings → Pages, seleccionar **Deploy from a branch → gh-pages → /(root)** y guardar si no estuviera activado automáticamente.

La rama `main` contiene también el código. Para publicar cambios, actualizar `gh-pages` con el contenido de `main`. No se necesita compilar ni instalar nada. Los permisos de cada documento enlazado se administran en Google Drive u otro servicio de origen.
