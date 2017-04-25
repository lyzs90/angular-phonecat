module.exports = {
  getAll: () => {
    const phoneList = require('./phones/phones.json');
    return phoneList;
  },
  getOne: (phoneId) => {
    const phoneData = require(`./phones/${phoneId}.json`);
    return phoneData;
  }
}