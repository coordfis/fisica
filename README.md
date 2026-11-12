# Física 2027 · Saco Oliveros

Portal de trabajo para organizar los materiales de la plana de Física durante 2027.

## Programas

- Vacaciones útiles
- Verano San Marcos
- Verano UNI
- Aulas regulares: 1.º, 2.º, 3.º, 4.º y 5.º de secundaria
- Quinto UNI
- Quinto San Marcos

Cada programa o grado tiene libros, tareas, diapositivas, prácticas, evaluaciones y otros materiales. No se incluyen enlaces ficticios. Los apartados vacíos muestran un aviso de enlaces pendientes.

## Agregar enlaces

Editar `dist/materiales.js` y agregar objetos al arreglo `recursos` del programa o grado correspondiente:

```js
{
  titulo: 'Libro · Tomo 1',
  tipo: 'libros',
  url: 'https://enlace-real-del-material',
  descripcion: 'Descripción opcional'
}
```

Tipos admitidos: `libros`, `tareas`, `diapositivas`, `practicas`, `evaluaciones`, `otros`.

Los enlaces se guardan en el repositorio y se comparten con todas las personas que consultan la versión publicada. No existe una edición local que se confunda con cambios compartidos. El permiso de acceso a cada documento se administra en su servicio de origen.

## Estructura

- `dist/index.html`: página principal.
- `dist/styles.css`: diseño adaptable a móvil y escritorio.
- `dist/app.js`: navegación, buscador y filtros.
- `dist/materiales.js`: programas, grados y enlaces.
- `.openai/hosting.json`: identidad y configuración de la publicación en Sites.

Sitio estático sin dependencias ni compilación. Para GitHub Pages se puede servir la carpeta `dist` mediante un flujo de publicación, si posteriormente se habilita GitHub Pages en el repositorio. La publicación inicial usa Sites.
