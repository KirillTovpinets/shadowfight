class Config {
  constructor() {
    this.database = {};
    this.port = process.env.PORT || 8080;
    this.dbString = process.env.MONGODB_URI || 'mongodb://localhost:27017/game';
  }
}
const config = new Config();
module.exports = config;
