class MessageBoxComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="message-box"></div>`;
  }

  show(message, type = 'danger') {
    this.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }

  clear() {
    this.innerHTML = '';
  }
}

customElements.define('message-box-component', MessageBoxComponent);