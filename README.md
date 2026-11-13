# Física 2027 · Saco Oliveros

Portal de materiales de la plana de Física para 2027, con inicio de sesión de Google y lectura de materiales autorizada por Firebase Authentication y Firestore.

El acceso utiliza el proyecto institucional `fisica-2027---saco-oliveros`, administrado con `coord.fis@sacooliveros.edu.pe`. Las capturas de configuración confirman el dominio autorizado, Firestore, las reglas publicadas y el documento de materiales. La comprobación final del ingreso con las cuentas permitidas se realiza en la web publicada. Ver `firebase/ACTIVACION.md`.

## Programas

- Vacaciones DivertiCreativas
- Verano San Marcos
- Verano UNI
- Aulas regulares: 1.º a 5.º de secundaria
- Quinto UNI
- Quinto San Marcos

Cada programa o grado organiza libros, tareas, diapositivas, prácticas, evaluaciones y otros materiales.

## Agregar enlaces

Actualizar el documento protegido `portales/fisica2027` en Firestore. Para la carga manual, el campo de texto `contenido` contiene un JSON con los arreglos `programas` y `tipos`. Añadir los enlaces al arreglo `recursos` del programa o grado correspondiente dentro de ese JSON:

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

La rama `main` contiene también el código. Para publicar cambios, actualizar `gh-pages` con el contenido de `main`. No se necesita compilar. Verificar la pantalla sin sesión y completar las pruebas de ingreso descritas en `firebase/ACTIVACION.md`. Los permisos de cada documento enlazado se administran en Google Drive u otro servicio de origen.
