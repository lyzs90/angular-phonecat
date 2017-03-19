/**
 * PhoneController
 *
 * @description :: Server-side logic for managing phones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getPhones: (req, res) => {
    return res.json(PhoneService.getAll());
  },
  getProtectedPhones: (req, res) => {
    return res.json(PhoneService.getAll());
  },
  getPhoneById: (req, res) => {
    return res.json(PhoneService.getOne(req.param('phoneId')));
  },
  getProtectedPhoneById: (req, res) => {
    return res.json(PhoneService.getOne(req.param('phoneId')));
  }
};

