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
let lastEscape = 0;

const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const isTouchDevice =
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;


/* ---------------------------------------
   FORM STATE
--------------------------------------- */

function valid() {
  return (
    email.validity.valid &&
    password.value.length >= 4
  );
}

function updateState() {
  if (valid()) {
    armed = false;

    button.style.transform = 'translate(0, 0)';
    button.classList.remove('is-running');

    hint.textContent = 'You caught it. Now login.';
    hint.style.color = 'var(--cyan)';
  } else {
    armed = true;

    hint.textContent = escapeCount
      ? 'Nice try. Complete the form to catch it.'
      : 'Move closer. I dare you.';

    hint.style.color = '';
  }
}


/* ---------------------------------------
   RUNAWAY POSITION
--------------------------------------- */

function moveButton(event) {
  if (!armed || reduceMotion || isTouchDevice) {
    return;
  }

  const now = performance.now();

  // Prevent the button from jittering continuously.
  if (now - lastEscape < 120) {
    return;
  }

  const zoneRect = zone.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();

  const pointerX = event.clientX - zoneRect.left;
  const pointerY = event.clientY - zoneRect.top;

  const buttonCenterX =
    buttonRect.left - zoneRect.left + buttonRect.width / 2;

  const buttonCenterY =
    buttonRect.top - zoneRect.top + buttonRect.height / 2;

  const distance = Math.hypot(
    pointerX - buttonCenterX,
    pointerY - buttonCenterY
  );

  // Activation radius.
  if (distance > 105) {
    return;
  }

  escapeCount += 1;
  lastEscape = now;

  /*
   * Keep a generous invisible safety boundary.
   * The button will NEVER be placed directly at
   * the edge of the action zone.
   */
  const paddingX = 18;
  const paddingY = 10;

  const maxX =
    Math.max(
      0,
      (zoneRect.width - buttonRect.width) / 2 - paddingX
    );

  const maxY =
    Math.max(
      0,
      (zoneRect.height - buttonRect.height) / 2 - paddingY
    );

  /*
   * Generate several possible positions and select
   * one that is far away from the cursor.
   */
  let bestX = 0;
  let bestY = 0;
  let bestDistance = 0;

  for (let i = 0; i < 14; i++) {
    const candidateX =
      (Math.random() * 2 - 1) * maxX;

    const candidateY =
      (Math.random() * 2 - 1) * maxY;

    const candidateCenterX =
      zoneRect.width / 2 + candidateX;

    const candidateCenterY =
      zoneRect.height / 2 + candidateY;

    const candidateDistance = Math.hypot(
      pointerX - candidateCenterX,
      pointerY - candidateCenterY
    );

    if (candidateDistance > bestDistance) {
      bestDistance = candidateDistance;
      bestX = candidateX;
      bestY = candidateY;
    }
  }

  button.style.transform =
    `translate3d(${bestX}px, ${bestY}px, 0)`;

  button.classList.add('is-running');

  if (escapeCount === 1) {
    hint.textContent = 'Too close.';
  } else if (escapeCount === 2) {
    hint.textContent = 'Nice try.';
  } else if (escapeCount === 3) {
    hint.textContent = 'Almost had it.';
  } else if (escapeCount < 7) {
    hint.textContent = 'Still chasing?';
  } else {
    hint.textContent = 'You really want this, huh?';
  }
}


/* ---------------------------------------
   PREVENT EDGE CLICK
--------------------------------------- */

button.addEventListener('pointerdown', event => {
  if (!armed) {
    return;
  }

  event.preventDefault();

  if (!reduceMotion && !isTouchDevice) {
    moveButton(event);
  }
});

button.addEventListener('click', event => {
  if (armed) {
    event.preventDefault();
    event.stopPropagation();

    if (!reduceMotion && !isTouchDevice) {
      moveButton(event);
    }

    return;
  }
});


/* ---------------------------------------
   TRACK CURSOR
--------------------------------------- */

let isTicking = false;

// ⚡ Bolt: Throttle pointermove to 60fps to prevent layout thrashing
// from excessive getBoundingClientRect calls during rapid mouse movement.
zone.addEventListener(
  'pointermove',
  (event) => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        moveButton(event);
        isTicking = false;
      });
      isTicking = true;
    }
  },
  { passive: true }
);


/* ---------------------------------------
   PASSWORD VISIBILITY
--------------------------------------- */

showPassword.addEventListener('click', () => {
  const visible = password.type === 'text';

  password.type = visible
    ? 'password'
    : 'text';

  showPassword.textContent = visible
    ? 'SHOW'
    : 'HIDE';

  showPassword.setAttribute(
    'aria-label',
    visible
      ? 'Show password'
      : 'Hide password'
  );
});


/* ---------------------------------------
   FORM VALIDATION
--------------------------------------- */

['input', 'change'].forEach(type => {
  form.addEventListener(type, () => {
    emailError.textContent = '';
    passwordError.textContent = '';

    updateState();
  });
});


/* ---------------------------------------
   LOGIN
--------------------------------------- */

form.addEventListener('submit', event => {
  event.preventDefault();

  emailError.textContent = '';
  passwordError.textContent = '';

  let ok = true;

  if (!email.validity.valid) {
    emailError.textContent =
      'Enter a valid email address.';

    ok = false;
  }

  if (password.value.length < 4) {
    passwordError.textContent =
      'Access key needs at least 4 characters.';

    ok = false;
  }

  if (!ok) {
    armed = true;
    updateState();
    return;
  }

  // Lock the interaction.
  armed = false;

  button.classList.remove('is-running');

  button.disabled = true;

  button.style.transform =
    'translate3d(0, 0, 0) scale(.96)';

  button.querySelector('.button-label').textContent =
    'AUTHENTICATING';

  button.querySelector('.button-arrow').textContent =
    '…';

  hint.textContent =
    'Verifying credentials…';

  setTimeout(() => {
    button.style.display = 'none';

    success.style.display = 'block';

    hint.textContent =
      'Session initialized.';
  }, 850);
});


/* ---------------------------------------
   INITIAL STATE
--------------------------------------- */

updateState();