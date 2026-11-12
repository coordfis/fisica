# Activación del acceso de Física 2027

Estado: integración preparada. No publicar en `main` ni en `gh-pages` hasta completar la configuración y verificar las reglas del servidor.

## Configuración

Proyecto Firebase existente: `sin-limites-12f07`. El cliente usa una aplicación con nombre propio, `fisica-portal`, para separar su sesión del resto de aplicaciones.

1. Leer la configuración real de Authentication y las reglas de Firestore publicadas. Comprobar que Google está habilitado y autorizar `coordfis.github.io` como dominio de acceso.
2. Combinar la regla de `/portales/fisica2027` con las reglas actuales. El archivo de este repositorio conserva las reglas de `/users` tomadas del código actual de Sin Límites, pero debe compararse con la versión realmente publicada antes de desplegarlo.
3. La lectura de ese documento requiere un token válido de Firebase, correo verificado, proveedor de acceso `google.com` y exactamente uno de estos correos:
   - `alexludenah@gmail.com`
   - `coord.fis@sacooliveros.edu.pe`
4. Crear el documento `portales/fisica2027` con los campos `programas` y `tipos`, utilizando los materiales de la versión anterior del portal. Conservar los dos accesos actuales de Vacaciones DivertiCreativas: Libros y Diapositivas. No reincorporar Modelo de diapositivas. La aplicación cliente no tiene permiso de escritura ni de listado.
5. Probar las reglas contra solicitudes anónimas, ambas cuentas permitidas, un tercer correo de Gmail, otro correo institucional, un correo no verificado y un proveedor diferente. Verificar también que las reglas existentes de `/users` se conservan.
6. Probar el acceso real y el cierre de sesión, y publicar el cambio en `main` y `gh-pages` solo después de esa comprobación.

## Comprobaciones locales

`npm test` comprueba el filtro previo y que una lectura denegada, una sesión cerrada o una respuesta antigua no abra el portal. Estas pruebas no sustituyen las pruebas de las reglas en Firestore.

La aplicación no descarga `materiales.js`: obtiene los datos del servidor únicamente después de la autenticación. La persistencia de autenticación dura la sesión del navegador y Firestore no tiene persistencia local habilitada.

El repositorio y las versiones anteriores de GitHub Pages ya contenían enlaces públicos a Drive. La autenticación nueva no revoca esos enlaces históricos ni cambia los permisos de los archivos de Drive; esos permisos son independientes del acceso al portal.
