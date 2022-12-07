class Storage {
  static add(name, value) {
    const tasks = this.get(name);
    tasks.push(value);
    localStorage.setItem(name, JSON.stringify(tasks));
  }

  static edit(name, { id, date, title, tags }) {
    const tasks = Storage.get(name);
    let task = tasks.find((t) => t.id === id);
    task.title = title;
    task.date = date;
    task.tags = tags;
    localStorage.setItem(name, JSON.stringify(tasks));
  }

  static get(name) {
    return JSON.parse(localStorage.getItem(name)) || [];
  }

  static getById(name, id) {
    return this.get(name).find((task) => task.id === id) || null;
  }

  static toggleClosed(name, id) {
    const tasks = Storage.get(name);
    const task = tasks.find((task) => task.id === id);
    task.closed = !task.closed;
    localStorage.setItem(name, JSON.stringify(tasks));
    return task.closed;
  }

  static delete(name, id) {
    let tasks = this.get(name).filter((task) => task.id !== id);
    localStorage.setItem(name, JSON.stringify(tasks));
  }
}

export default Storage;
