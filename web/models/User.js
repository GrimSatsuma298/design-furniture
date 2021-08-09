const fs = require("fs");

const User = {
  fileName: "./data/users.json",

  generateID: function () {
    let allUsers = this.findAll();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },
  findAll: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },
  findByPk: function (id) {
    let allUsers = this.findAll();
    let user = allUsers.find((u) => u.id === id);
    return user;
  },
  findByField: function (field, text) {
    let allUsers = this.findAll();
    let user = allUsers.find((u) => u[field] === text);
    return user;
  },
  create: function (userData) {
    let allUsers = this.findAll();
    let newUser = {
      id: this.generateID(),
      ...userData,
    };
    delete newUser.confirmPswd; // Removes property
    allUsers.push(newUser);
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, 2));
    return newUser;
  },
  delete: function (id) {
    let allUsers = this.findAll();
    let finalUsers = allUsers.filter((u) => u.id !== id);
    fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, 2));
    return true;
  },
};

module.exports = User;