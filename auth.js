import { firebaseConfig, portalDocument } from './firebase-config.js';
import { createAccessController } from './access-policy.js';
import { startPortal } from './app.js?v=20261112-visual1';

const screen = document.querySelector('#auth-screen');
const portal = document.querySelector('#portal');
const login = document.querySelector('#google-sign-in');
const logout = document.querySelector('#sign-out');
const status = document.querySelector('#auth-status');
let disposePortal;
let notice = '';

function clearPortal() {
  portal.hidden = true;
  disposePortal?.();
  disposePortal = undefined;
  document.querySelector('#navigation').replaceChildren();
  document.querySelector('main').replaceChildren();
  document.querySelector('#session-email').textContent = '';
  document.title = 'Ingreso · Física 2027';
}

function showLogin(message, pending) {
  screen.hidden = false;
  if (message && !pending) notice = message;
  status.textContent = pending ? message : (message || notice);
  login.disabled = pending;
  login.textContent = pending ? 'Verificando acceso…' : 'Continuar con Google';
}

try {
  if (Object.values(firebaseConfig).some(value => !value)) {
    throw new Error('portal/not-configured');
  }
  const [appSdk, authSdk, firestoreSdk] = await Promise.all([
    import('https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js')
  ]);
  const app = appSdk.initializeApp(firebaseConfig, 'fisica-portal');
  const auth = authSdk.getAuth(app);
  const db = firestoreSdk.getFirestore(app);
  const provider = new authSdk.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  await authSdk.setPersistence(auth, authSdk.browserSessionPersistence);

  const access = createAccessController({
    getClaims: async user => (await authSdk.getIdTokenResult(user)).claims,
    readPortal: async () => {
      // Exigir respuesta del servidor: nunca abrir a partir de una copia sin verificar.
      const snapshot = await firestoreSdk.getDocFromServer(firestoreSdk.doc(db, portalDocument));
      if (!snapshot.exists()) throw new Error('portal/not-configured');
      return snapshot.data();
    },
    clearPortal,
    showLogin,
    showPortal(data, email) {
      notice = '';
      disposePortal = startPortal(data);
      document.querySelector('#session-email').textContent = email;
      screen.hidden = true;
      portal.hidden = false;
    },
    signOut: () => authSdk.signOut(auth)
  });

  authSdk.onIdTokenChanged(auth, user => {
    access.update(user).catch(() => {
      access.cancel();
      showLogin('No se pudo verificar la sesión. Intenta nuevamente.', false);
    });
  }, () => {
    access.cancel();
    showLogin('No se pudo verificar la sesión. Intenta nuevamente.', false);
  });

  login.onclick = async () => {
    notice = '';
    showLogin('Abriendo Google…', true);
    try {
      await authSdk.signInWithPopup(auth, provider);
    } catch (error) {
      const messages = {
        'auth/popup-closed-by-user': 'El ingreso se canceló. Puedes intentarlo nuevamente.',
        'auth/popup-blocked': 'Permite la ventana emergente de Google para ingresar.',
        'auth/unauthorized-domain': 'El acceso desde esta dirección aún no está habilitado.',
        'auth/network-request-failed': 'No se pudo conectar con Google. Revisa tu conexión.'
      };
      showLogin(messages[error.code] || 'No se pudo iniciar sesión. Intenta nuevamente.', false);
    }
  };

  logout.onclick = async () => {
    access.cancel();
    notice = '';
    showLogin('Cerrando sesión…', true);
    try {
      await authSdk.signOut(auth);
      showLogin('Sesión cerrada.', false);
    } catch {
      showLogin('No se pudo cerrar la sesión. Recarga la página e inténtalo nuevamente.', false);
    }
  };
} catch (error) {
  clearPortal();
  const pendingConfiguration = error.message === 'portal/not-configured';
  showLogin(pendingConfiguration
    ? 'El acceso institucional todavía no está habilitado.'
    : 'No se pudo conectar el servicio de ingreso. Recarga la página para reintentar.', true);
  login.textContent = pendingConfiguration ? 'Acceso pendiente' : 'Acceso no disponible';
}
