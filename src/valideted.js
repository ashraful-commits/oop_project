class Validate {
  static isEmail(email) {
    return email.match(
      /^[a-z0-9\.]{1,}@[a-z0-9]{1,5}\.[a-z0-9]{2,5}$/
    );
  }
  static isAge(age) {
    return age.match(/^[0-9]{1,3}$/);
  }
  static isMobile(cell) {
    return cell.match(/^(018|013|014|019|017|015)[0-9]{8}$/);
  }

  static update(array) {
    return localStorage.setItem(key, JSON.stringify(array));
  }
}

export default Validate;
