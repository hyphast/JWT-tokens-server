const Users = require('../models/User');

class ProfileService {
  async getRecords() {
    const records = await Users.find(); //!!!!
    return records;
  }
}

module.exports = new ProfileService();