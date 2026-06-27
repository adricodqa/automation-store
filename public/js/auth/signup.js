import { showMessage } from '/components/js/messageBox.js';

const form = document.querySelector('form');
const emailInput = document.querySelector('#inputEmail');
const usernameInput = document.querySelector('#inputUsername');
const passwordInput = document.querySelector('#inputPassword');
const repeatPasswordInput = document.querySelector('#inputRepeatPassword');
const submitButton = document.querySelector('button[type="button"]');

if (!form || !emailInput || !usernameInput || !passwordInput || !repeatPasswordInput || !submitButton) {
  console.warn('Signup script: form elements not found');
} else {
  submitButton.addEventListener('click', async () => {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, repeatPassword }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.message || 'Signup failed.';
        showMessage(message, 'danger');
        return;
      }

      const data = await response.json().catch(() => null);
      showMessage(data?.message || 'Signup successful!', 'success');
      setTimeout(() => {
        window.location.href = '/';
      }, 1200);
    } catch (error) {
      console.error('Signup error', error);
      showMessage('Signup failed. Please try again later.', 'danger');
    }
  });
}
