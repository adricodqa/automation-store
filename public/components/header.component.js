class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;
    
    let authButtons = '';
    
    // If logged in, don't show auth buttons
    if (!token) {
      // If not on signin page, show signin button
      if (!currentPath.includes('/signin')) {
        authButtons += '<a href="/signin" class="btn btn-dark btn-sm border border-secondary me-2">Sign in</a>';
      }
      
      // If not on signup page, show signup button
      if (!currentPath.includes('/signup')) {
        authButtons += '<a href="/signup" class="btn btn-secondary btn-sm">Sign up</a>';
      }
    }

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
              ${authButtons}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("header-component", HeaderComponent);