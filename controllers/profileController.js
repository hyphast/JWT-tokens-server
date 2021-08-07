const profileService = require('../services/profileService');

class ProfileController {
  async getRecords(req, res, next) {
    try {
      const records = await profileService.getRecords();
      return res.json(records);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProfileController();