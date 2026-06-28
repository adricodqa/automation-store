import { showMessage, clearMessage } from '/components/js/messageBox.js';

const form = document.querySelector('form');
const usernameInput = document.querySelector('#inputUsername');
const passwordInput = document.querySelector('#inputPassword');
const submitButton = document.querySelector('button[type="button"]');

if (!form || !usernameInput || !passwordInput || !submitButton) {
  console.warn('Signin script: form elements not found');
} else {
  submitButton.addEventListener('click', async () => {
    clearMessage();
    
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = data?.message || 'Signin failed.';
        showMessage(message, 'danger');
        return;
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      showMessage(data?.message || 'Signin successful!', 'success');
      setTimeout(() => {
        window.location.href = '/';
      }, 1200);
    } catch (error) {
      console.error('Signin error', error);
      showMessage('Signin failed. Please try again later.', 'danger');
    }
  });
}
