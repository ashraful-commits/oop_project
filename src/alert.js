class Alert {
  static danger(msg) {
    return `<p class="alert d-flex justify-content-between alert-danger">
       ${msg}
        <button data-bs-dismiss="alert" class="btn-close"></button>
      </p>`;
  }
  static warning(msg) {
    return `<p class="alert d-flex justify-content-between alert-warning">
       ${msg}
        <button data-bs-dismiss="alert" class="btn-close"></button>
      </p>`;
  }
  static success(msg) {
    return `<p class="alert d-flex justify-content-between alert-success">
       ${msg}
        <button data-bs-dismiss="alert" class="btn-close"></button>
      </p>`;
  }
  static info(msg) {
    return `<p class="alert d-flex justify-content-between alert-info">
       ${msg}
        <button data-bs-dismiss="alert" class="btn-close"></button>
      </p>`;
  }
}

export default Alert;
