const { v4: uuidv4 } = require("uuid");
const cluster = require("cluster");

class Database {
  constructor() {
    this.data = [];
  }

  setData(data) {
    this.data = data.data;
  }

  notifyMasterAboutUpdate() {
    process.send({ data: this.data });
  }

  getUsers() {
    return this.data;
  }

  getUser(id) {
    const user = this.data.find((record) => record.id === id);
    return user || null;
  }

  createUser(user) {
    const id = uuidv4();
    user.id = id;
    this.data.push(user);
    if (cluster.isWorker) {
      this.notifyMasterAboutUpdate();
    }
    return user;
  }

  updateUser(id, user) {
    const record = this.data.find((item) => item.id === id);
    if (!record) {
      throw new Error("User does not exist");
    }

    record.age = user.age;
    record.username = user.username;
    record.hobbies = user.hobbies;
    if (cluster.isWorker) {
      this.notifyMasterAboutUpdate();
    }
    return record;
  }

  deleteUser(id) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new Error("User does not exist");
    }
    this.data.splice(index, 1);
    if (cluster.isWorker) {
      this.notifyMasterAboutUpdate();
    }
    return { message: "Success" };
  }
}

module.exports = {
  Database,
};
