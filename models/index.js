const { Sequelize, Model } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const db = {};
let sequelize;
require("dotenv").config();
console.log(process.env.host);
if (env === "development") {
  const config = require("../config/config.json")[env];

  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    timezone: config.timezone,
    define: {
      timestamps: false
    }
  });
} else {
  require("dotenv").config();

  sequelize = new Sequelize(
    process.env.database,
    process.env.username,
    process.env.password,
    {
      host: process.env.host,
      dialect: "mysql",
      operatorsAliases: 0,
      timezone: "+09:00",
      define: {
        timestamps: false,
        underscored: true
      }
    }
  );
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// routes 사용
db.user = require("./user.model")(sequelize, Sequelize);
db.list = require("./list.model")(sequelize, Sequelize);

module.exports = db;
