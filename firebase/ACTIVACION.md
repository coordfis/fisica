# Activación del acceso de Física 2027

Estado: proyecto institucional y aplicación web creados por Alex; configuración pública incorporada al borrador. Las capturas de Alex confirman el dominio autorizado `coordfis.github.io`, la base Firestore `(default)` y las reglas publicadas para los dos correos. Pendiente cargar los datos y verificar el proveedor Google y el acceso real del servidor. No publicar en `main` ni en `gh-pages` hasta completar esos pasos.

## Administración y cuentas de ingreso

Proyecto Firebase propio de este portal: `fisica-2027---saco-oliveros`, administrado con `coord.fis@sacooliveros.edu.pe`. Aplicación web registrada: `1:763118242659:web:9a9802ca1bda81c3f8e156`.

La propiedad y los permisos administrativos del proyecto son independientes de la lista de usuarios que pueden ingresar al portal. Los dos correos autorizados para consultar materiales siguen siendo:

- `alexludenah@gmail.com`
- `coord.fis@sacooliveros.edu.pe`

El proyecto personal de Sin Límites no se utiliza ni se modifica. No desplegar las reglas de este repositorio sobre ese proyecto.

## Configuración

1. Seleccionar el proyecto institucional `fisica-2027---saco-oliveros` desde la cuenta de coordinación y confirmar sus permisos administrativos.
2. La aplicación web ya está registrada y su configuración pública está en `firebase-config.js`. El cliente usa el nombre `fisica-portal` y no inicializa Google Analytics.
3. Habilitar Google en Authentication y autorizar `coordfis.github.io` como dominio de acceso. El proveedor debe admitir también la cuenta de Gmail personal autorizada; una pantalla de consentimiento limitada a usuarios internos del colegio impediría ese acceso.
4. Crear Firestore y publicar `firebase/firestore.rules` únicamente en el proyecto institucional. Las reglas exigen un token válido, correo verificado, proveedor `google.com` y exactamente uno de los dos correos permitidos. El resto de documentos queda cerrado a los clientes.
5. En Datos, crear la colección `portales` y el documento `fisica2027`. Para facilitar la carga manual, añadir un único campo `contenido` de tipo `string` y pegar como valor un JSON con los arreglos `programas` y `tipos`, utilizando los materiales de la versión anterior del portal. También se admiten esos dos arreglos como campos estructurados del documento. Conservar los dos accesos actuales de Vacaciones DivertiCreativas: Libros y Diapositivas. La aplicación cliente no tiene permiso de escritura ni de listado.
6. Probar las reglas contra solicitudes anónimas, ambas cuentas permitidas, un tercer correo de Gmail, otro correo institucional, un correo no verificado y un proveedor diferente.
7. Probar el acceso real y el cierre de sesión, y publicar el cambio en `main` y `gh-pages` después de esas comprobaciones.

## Comprobaciones locales

`npm test` comprueba el filtro previo y que una lectura denegada, una sesión cerrada o una respuesta antigua no abra el portal. Estas pruebas no sustituyen las pruebas de las reglas en Firestore.

Mientras no se configure el proyecto institucional, la pantalla de ingreso permanece cerrada y no intenta conectarse al proyecto personal.

La aplicación no descarga `materiales.js`: obtiene los datos del servidor únicamente después de la autenticación. La persistencia de autenticación dura la sesión del navegador y Firestore no tiene persistencia local habilitada.

El repositorio y las versiones anteriores de GitHub Pages ya contenían enlaces públicos a Drive. La autenticación nueva no revoca esos enlaces históricos ni cambia los permisos de los archivos de Drive; esos permisos son independientes del acceso al portal.
