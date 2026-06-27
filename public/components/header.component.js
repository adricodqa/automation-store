class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    
  }

  render() {
    this.innerHTML = /*html*/`
      <style>
        .header-background {
          background-color: #131921;
        }
      </style>
      <div class="container-fluid border-bottom border-dark header-background py-3">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="my-0">
              <a href="/" class="text-light text-decoration-none">Automation Store</a>
            </h2>

            <div>
              <a href="/signin" class="btn btn-dark btn-sm border border-secondary me-2">Sign in</a>
              <a href="/signup" class="btn btn-secondary btn-sm">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("header-component", HeaderComponent);