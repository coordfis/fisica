import test from 'node:test';
import assert from 'node:assert/strict';
import { canEnter, createAccessController } from '../access-policy.js';

const claims = email => ({ email, email_verified: true, firebase: { sign_in_provider: 'google.com' } });
const portal = { programas: [], tipos: [] };

test('solo permite las dos cuentas verificadas por Google', () => {
  assert.equal(canEnter(claims('alexludenah@gmail.com')), true);
  assert.equal(canEnter(claims('coord.fis@sacooliveros.edu.pe')), true);
  assert.equal(canEnter(claims('otro@sacooliveros.edu.pe')), false);
  assert.equal(canEnter(claims('alexludenah+otra@gmail.com')), false);
  assert.equal(canEnter({ ...claims('alexludenah@gmail.com'), email_verified: false }), false);
  assert.equal(canEnter({ ...claims('alexludenah@gmail.com'), firebase: { sign_in_provider: 'password' } }), false);
  assert.equal(canEnter(undefined), false);
});

function harness(overrides = {}) {
  const events = [];
  const controller = createAccessController({
    getClaims: async () => claims('alexludenah@gmail.com'),
    readPortal: async () => portal,
    clearPortal: () => events.push('clear'),
    showLogin: message => events.push(['login', message]),
    showPortal: data => events.push(['portal', data]),
    signOut: async () => events.push('signOut'),
    ...overrides
  });
  return { ...controller, events };
}

test('no consulta materiales sin sesión ni con una cuenta ajena', async () => {
  let reads = 0;
  const h = harness({ getClaims: async () => claims('otro@gmail.com'), readPortal: async () => { reads++; return portal; } });
  await h.update(null);
  await h.update({});
  assert.equal(reads, 0);
  assert.ok(h.events.includes('signOut'));
  assert.equal(h.events.some(e => Array.isArray(e) && e[0] === 'portal'), false);
});

test('no abre si el servidor deniega la lectura', async () => {
  const h = harness({ readPortal: async () => { throw { code: 'permission-denied' }; } });
  await h.update({});
  assert.equal(h.events.some(e => Array.isArray(e) && e[0] === 'portal'), false);
  assert.ok(h.events.includes('signOut'));
});

test('solo abre después de recibir los datos del servidor', async () => {
  const h = harness();
  await h.update({});
  assert.deepEqual(h.events.at(-1), ['portal', portal]);
});

test('abre los materiales guardados en el campo de texto contenido', async () => {
  const h = harness({ readPortal: async () => ({ contenido: JSON.stringify(portal) }) });
  await h.update({});
  assert.deepEqual(h.events.at(-1), ['portal', portal]);
});

test('un campo contenido inválido mantiene el portal cerrado', async () => {
  for (const contenido of ['{incompleto', 'null', '{"programas":[]}']) {
    const h = harness({ readPortal: async () => ({ contenido }) });
    await h.update({});
    assert.equal(h.events.some(e => Array.isArray(e) && e[0] === 'portal'), false);
  }
});

test('una lectura pendiente no vuelve a abrir el portal después de salir', async () => {
  let finish;
  const h = harness({ readPortal: () => new Promise(resolve => { finish = resolve; }) });
  const loading = h.update({});
  await new Promise(resolve => setImmediate(resolve));
  h.cancel();
  finish(portal);
  await loading;
  assert.equal(h.events.some(e => Array.isArray(e) && e[0] === 'portal'), false);
});

test('una respuesta de una cuenta anterior se descarta al cambiar de sesión', async () => {
  let finish;
  const h = harness({ readPortal: () => new Promise(resolve => { finish = resolve; }) });
  const loading = h.update({});
  await new Promise(resolve => setImmediate(resolve));
  await h.update(null);
  finish(portal);
  await loading;
  assert.equal(h.events.some(e => Array.isArray(e) && e[0] === 'portal'), false);
});

test('un fallo de red o datos incompletos mantiene el portal cerrado', async () => {
  for (const readPortal of [async () => { throw new Error('network'); }, async () => ({})]) {
    const h = harness({ readPortal });
    await h.update({});
    assert.equal(h.events.some(e => Array.isArray(e) && e[0] === 'portal'), false);
  }
});
