class LocalStorageFun {
  static save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  static get(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }
}

export default LocalStorageFun;
