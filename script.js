const form = document.querySelector('#loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');
const button = document.querySelector('#runawayButton');
const zone = document.querySelector('#actionZone');
const hint = document.querySelector('#hint');
const success = document.querySelector('#success');
const showPassword = document.querySelector('.show-password');

let armed = true;
let escapeCount = 0;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function valid() {
  return email.validity.valid && password.value.length >= 4;
}
function updateState() {
  if (valid()) {
    armed = false;
    hint.textContent = 'You caught it. Now login.';
    hint.style.color = 'var(--cyan)';
  } else {
    armed = true;
    hint.textContent = escapeCount ? 'Nice try. Complete the form to catch it.' : 'Move closer. I dare you.';
    hint.style.color = '';
  }
}
function moveButton(event) {
  if (!armed || reduceMotion) return;
  const rect = button.getBoundingClientRect();
  const dx = event.clientX - (rect.left + rect.width / 2);
  const dy = event.clientY - (rect.top + rect.height / 2);
  const distance = Math.hypot(dx, dy);
  if (distance > 115) return;

  const zoneRect = zone.getBoundingClientRect();
  const maxX = Math.max(0, (zoneRect.width - rect.width) / 2 - 4);
  const maxY = Math.max(0, (zoneRect.height - rect.height) / 2 - 4);
  const push = Math.min(1, (125 - distance) / 125);
  const directionX = dx === 0 ? (Math.random() > .5 ? 1 : -1) : -Math.sign(dx);
  const directionY = dy === 0 ? 0 : -Math.sign(dy);
  const x = Math.max(-maxX, Math.min(maxX, directionX * (18 + push * maxX)));
  const y = Math.max(-maxY, Math.min(maxY, directionY * (8 + push * maxY)));

  button.style.transform = `translate(${x}px, ${y}px)`;
  escapeCount += 1;
  hint.textContent = escapeCount > 4 ? 'Still chasing?' : 'Too close.';
}

['input', 'change'].forEach(type => form.addEventListener(type, updateState));
document.addEventListener('pointermove', moveButton, { passive: true });

button.addEventListener('pointerleave', () => {
  if (armed) button.style.transform = '';
});

showPassword.addEventListener('click', () => {
  const visible = password.type === 'text';
  password.type = visible ? 'password' : 'text';
  showPassword.textContent = visible ? 'SHOW' : 'HIDE';
  showPassword.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
});

form.addEventListener('submit', event => {
  event.preventDefault();
  emailError.textContent = '';
  passwordError.textContent = '';
  let ok = true;
  if (!email.validity.valid) { emailError.textContent = 'Enter a valid email address.'; ok = false; }
  if (password.value.length < 4) { passwordError.textContent = 'Access key needs at least 4 characters.'; ok = false; }
  if (!ok) { armed = true; updateState(); return; }
  armed = false;
  button.disabled = true;
  button.style.transform = 'scale(.96)';
  button.querySelector('.button-label').textContent = 'AUTHENTICATING';
  button.querySelector('.button-arrow').textContent = '…';
  hint.textContent = 'Verifying credentials…';
  setTimeout(() => {
    button.style.display = 'none';
    success.style.display = 'block';
    hint.textContent = 'Session initialized.';
  }, 850);
});

updateState();
