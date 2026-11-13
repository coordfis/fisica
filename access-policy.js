// Este filtro evita mostrar el portal con una cuenta no autorizada.
// La autorización de los datos también se aplica en las reglas de Firestore.
export const allowedEmails = Object.freeze([
  'alexludenah@gmail.com',
  'coord.fis@sacooliveros.edu.pe'
]);

export function canEnter(claims) {
  return claims?.email_verified === true
    && claims?.firebase?.sign_in_provider === 'google.com'
    && typeof claims.email === 'string'
    && allowedEmails.includes(claims.email.toLowerCase());
}

export function createAccessController({ getClaims, readPortal, clearPortal, showLogin, showPortal, signOut }) {
  let generation = 0;

  async function update(user) {
    const current = ++generation;
    clearPortal();
    if (!user) {
      showLogin('', false);
      return;
    }
    showLogin('Verificando acceso…', true);
    try {
      const claims = await getClaims(user);
      if (current !== generation) return;
      if (!canEnter(claims)) {
        showLogin('Esta cuenta no tiene permiso para ingresar.', false);
        await signOut();
        return;
      }
      const record = await readPortal();
      if (current !== generation) return;
      // La consola permite pegar todos los materiales en un único campo de texto.
      const data = typeof record?.contenido === 'string'
        ? JSON.parse(record.contenido)
        : record;
      if (!data || !Array.isArray(data.programas) || !Array.isArray(data.tipos)) {
        throw new Error('portal/not-configured');
      }
      showPortal(data, claims.email);
    } catch (error) {
      if (current !== generation) return;
      clearPortal();
      const denied = error?.code === 'permission-denied';
      showLogin(denied
        ? 'Esta cuenta no tiene permiso para ingresar.'
        : 'No se pudo cargar el portal. Intenta ingresar nuevamente.', false);
      if (denied) await signOut();
    }
  }

  function cancel() {
    generation++;
    clearPortal();
  }
  return { update, cancel };
}
