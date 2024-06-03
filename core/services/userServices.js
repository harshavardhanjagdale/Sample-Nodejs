const conn = require("../../config");
const { validationResult } = require("express-validator");
const User = require("../../models/user");

exports.user = (req, cb) => {
	let querys = User.findAll();
	querys
		.then((res) => {
			return cb(null, res);
		})
		.catch((err) => {
			return cb(err, null);
		});
	// conn.query(`SELECT * FROM user`, (err, data) => {
	// 	if (err) {
	// 		return cb(err, null);
	// 	} else {
	// 		return cb(null, data);
	// 	}
	// });
};

exports.users = (req, cb) => {
	let id = req?.params?.id;
	let querys = User.findByPk(id);
	querys
		.then((res) => {
			return cb(null, res);
		})
		.catch((err) => {
			return cb(err, null);
		});

	// conn.query(`SELECT * FROM user WHERE id=${id}`, (err, data) => {
	// 	if (err) {
	// 		return cb(err, null);
	// 	} else {
	// 		return cb(null, data);
	// 	}
	// });
};

// exports.postUsers = (req, cb) => {
// 	const errors = validationResult(req);
// 	if (!errors.isEmpty()) {
// 		// If validation errors exist, return the errors
// 		return cb(errors.array(), null);
// 	}
// 	console.log("post users console");
// 	let firstName = req.body.first_name;
// 	let lastName = req.body.last_name;
// 	let email = req.body.email;

// 	conn.query(`Select * from user where email='${email}'`, (err, data) => {
// 		if (err) {
// 			return cb(err, null);
// 		} else {
// 			if (data.length > 0) {
// 				return cb("email already exist", null);
// 			} else {
// 				conn.query(
// 					`Insert into user (firstName,lastName,email) values('${firstName}','${lastName}','${email}')`,
// 					(err, data) => {
// 						if (err) {
// 							return cb(err, null);
// 						} else {
// 							return cb(null, data);
// 						}
// 					}
// 				);
// 			}
// 		}
// 	});
// };
exports.postUsers = async (req, cb) => {
	let firstName = req.body.first_name;
	let lastName = req.body.last_name;
	let email = req.body.email;

	try {
		// Check if the email already exists
		const existingUser = await User.findOne({ where: { email } });

		if (existingUser) {
			return cb("Email already exists", null);
		}

		const newUser = await User.create({
			firstName,
			lastName,
			email,
		});

		return cb(null, newUser);
	} catch (error) {
		return cb(error, null);
	}
};

exports.updateUsers = async (req, cb) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return cb(errors.array(), null);
	}
	let id = req.params.id;
	let firstName = req.body.first_name;
	let lastName = req.body.last_name;
	let email = req.body.email;
	try {
		// Find the user by ID
		const user = await User.findByPk(id);

		if (!user) {
			return cb("User not found", null);
		}

		// Update the user data
		await user.update({
			firstName,
			lastName,
			email,
		});

		return cb(null, user);
	} catch (error) {
		return cb(error, null);
	}
	// conn.query(
	// 	`update user set firstName='${firstName}',lastName='${lastName}',email='${email}' where id=${id}`,
	// 	(err, data) => {
	// 		if (err) {
	// 			return cb(err, null);
	// 		} else {
	// 			return cb(null, data);
	// 		}
	// 	}
	// );
};
exports.deleteUser = async (req, cb) => {
	let id = req.params.id;
	try {
		// Find the user by ID
		const user = await User.findByPk(id);

		if (!user) {
			return cb("User not found", null);
		}

		// Delete the user
		await user.destroy();

		return cb(null, "User deleted successfully");
	} catch (error) {
		return cb(error, null);
	}
};
