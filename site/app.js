const form = document.querySelector('#status-form');
const result = document.querySelector('#result');
const submit = form.querySelector('button');

function show(message, kind) {
  result.textContent = message;
  result.className = `result ${kind}`;
  result.hidden = false;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const houseNumber = document.querySelector('#house-number').value.trim();
  const accessCode = document.querySelector('#access-code').value.trim().toUpperCase();
  if (!/^\d{1,8}$/.test(houseNumber) || !/^[A-Z2-9]{4}(?:-[A-Z2-9]{4}){2}$/.test(accessCode)) {
    show('Please enter your house number and access code in the format ABCD-EFGH-JKLM.', 'error');
    return;
  }
  if (!window.HOA_PORTAL_API_URL || window.HOA_PORTAL_API_URL.includes('REPLACE-ME')) {
    show('This portal is not yet active. Please contact the HOA.', 'error');
    return;
  }
  submit.disabled = true;
  submit.textContent = 'Checking…';
  try {
    const response = await fetch(window.HOA_PORTAL_API_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ houseNumber, accessCode }),
    });
    const payload = await response.json();
    show(payload.message || payload.error || 'Unable to check your status. Please contact the HOA.', response.ok ? payload.status : 'error');
  } catch {
    show('We could not reach the status service. Please try again later or contact the HOA.', 'error');
  } finally {
    submit.disabled = false;
    submit.textContent = 'Check my dues status';
  }
});
