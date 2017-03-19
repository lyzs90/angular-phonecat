const phoneList = require('./phones/phones.json');

module.exports = {
  getAll: () => {
    return phoneList;
  },
  getOne: (phoneId) => {
    return require(`./phones/${phoneId}.json`);
  }
}