# Activación del acceso de Física 2027

Estado: integración preparada. No publicar en `main` ni en `gh-pages` hasta configurar el proyecto institucional y verificar el acceso del servidor.

## Administración y cuentas de ingreso

Crear un proyecto Firebase propio para este portal, administrado con `coord.fis@sacooliveros.edu.pe`. Aún no se ha creado ni se ha asignado un identificador de proyecto.

La propiedad y los permisos administrativos del proyecto son independientes de la lista de usuarios que pueden ingresar al portal. Los dos correos autorizados para consultar materiales siguen siendo:

- `alexludenah@gmail.com`
- `coord.fis@sacooliveros.edu.pe`

El proyecto personal de Sin Límites no se utiliza ni se modifica. No desplegar las reglas de este repositorio sobre ese proyecto.

## Configuración

1. Crear o seleccionar el proyecto institucional dedicado desde la cuenta de coordinación. Confirmar que esa cuenta tiene permisos de administración.
2. Registrar una aplicación web y completar `firebase-config.js` con su configuración pública. El cliente usa el nombre `fisica-portal`.
3. Habilitar Google en Authentication y autorizar `coordfis.github.io` como dominio de acceso. El proveedor debe admitir también la cuenta de Gmail personal autorizada; una pantalla de consentimiento limitada a usuarios internos del colegio impediría ese acceso.
4. Crear Firestore y publicar `firebase/firestore.rules` únicamente en el proyecto institucional. Las reglas exigen un token válido, correo verificado, proveedor `google.com` y exactamente uno de los dos correos permitidos. El resto de documentos queda cerrado a los clientes.
5. Crear el documento `portales/fisica2027` con los campos `programas` y `tipos`, utilizando los materiales de la versión anterior del portal. Conservar los dos accesos actuales de Vacaciones DivertiCreativas: Libros y Diapositivas. La aplicación cliente no tiene permiso de escritura ni de listado.
6. Probar las reglas contra solicitudes anónimas, ambas cuentas permitidas, un tercer correo de Gmail, otro correo institucional, un correo no verificado y un proveedor diferente.
7. Probar el acceso real y el cierre de sesión, y publicar el cambio en `main` y `gh-pages` después de esas comprobaciones.

## Comprobaciones locales

`npm test` comprueba el filtro previo y que una lectura denegada, una sesión cerrada o una respuesta antigua no abra el portal. Estas pruebas no sustituyen las pruebas de las reglas en Firestore.

Mientras no se configure el proyecto institucional, la pantalla de ingreso permanece cerrada y no intenta conectarse al proyecto personal.

La aplicación no descarga `materiales.js`: obtiene los datos del servidor únicamente después de la autenticación. La persistencia de autenticación dura la sesión del navegador y Firestore no tiene persistencia local habilitada.

El repositorio y las versiones anteriores de GitHub Pages ya contenían enlaces públicos a Drive. La autenticación nueva no revoca esos enlaces históricos ni cambia los permisos de los archivos de Drive; esos permisos son independientes del acceso al portal.
