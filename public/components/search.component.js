class SearchComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    
  }

  render() {
    this.innerHTML = /*html*/`
      <div class="container-fluid py-2 mt-5">
        <div class="container">
          <div class="d-flex justify-content-center align-items-center">
            <input type="text" class="form-control me-2 border border-dark" placeholder="Search for products..." style="max-width: 800px;" />
            <button class="btn btn-warning fw-bold">Search</button>
          </div>
        </div>
      </div>      
    `;
  }
}

customElements.define("search-component", SearchComponent);