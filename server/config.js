class Config {
  constructor() {
    this.database = {};
    this.port = process.env.PORT || 3001;
    this.dbString = process.env.DATABASE_URL || 'mongodb://localhost:27017/game';
  }
}
const config = new Config();
module.exports = config;
