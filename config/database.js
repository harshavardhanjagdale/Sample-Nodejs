const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test", "root", null, {
	host: "localhost",
	dialect: "mysql", // or any other supported dialect
	// other options
});

module.exports = sequelize;
