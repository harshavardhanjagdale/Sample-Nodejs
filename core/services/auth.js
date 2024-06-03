const express = require("express");
const app = express();
const { validationResult } = require("express-validator");
const conn = require("../../config");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

app.use(express.json());

// exports.loginUser = (req, cb) => {
//   // console.log("i am login",req.email,req.password)
//   let error = validationResult(req);
//   console.log(error.array(), "i am error");
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return cb(errors.array(), null);
//   }
//   let email = req.body.email;
//   let password = req.body.password;
//   conn.query(`Select * from users where email='${email}' `, (err, data) => {
//     if (err) {
//       return cb(err, null);
//     }
//     if (data.length > 0) {
//       console.log(data, "i am data");
//       if (password) {
//         if (data[0].password == password) {
//           conn.query(
//             `select r.role_name from roles r join userroles ur on r.id=ur.id where ur.user_id=${data[0].id}`,
//             (err, userData) => {
//               if (err) {
//                 return cb("user does not have any role", null);
//               }
//               console.log(userData, "i am user data");
//               const role = userData.map((ele) => ele.role_name);
//               console.log(role, "i am role");
//               const payload = {
//                 roles: role,
//                 user_id: data[0].id,
//               };
//               console.log(payload, "i am payload");
//               //  let payload={}
//                 const token = jwt.sign(payload, secretKey, { expiresIn: "3h" });
//                 console.log(token, "i am token");
//                 return cb(null, token);
//             }
//           )
//         } else {
//           return cb("password is incorrect", null);
//         }
//       } else {
//         return cb("password is required", null);
//       }
//     }
//     return cb("user not found", null);
//   });
// };
exports.loginUser = (req, cb) => {
	// Validate request body
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return cb(errors.array(), null);
	}

	// Extract email and password from request body
	const email = req.body.email;
	const password = req.body.password;

	// Query database to find user by email
	conn.query(`SELECT * FROM user WHERE email='${email}'`, (err, data) => {
		if (err) {
			return cb(err, null);
		}

		// Check if user with given email exists
		if (data.length === 0) {
			return cb("User not found", null);
		}

		console.log(data[0].password, password, "pass");
		// Check if password matches
		if (data[0].password != password) {
			return cb("Password is incorrect", null);
		}
		console.log(data[0].id);
		let qry = `SELECT r.role_name FROM user_role ur JOIN role r ON ur.role_id = r.id
    WHERE ur.user_id = ${data[0].id}`;
		console.log(qry, "qry");
		// Retrieve user's roles from the database
		conn.query(qry, (err, userData) => {
			if (err) {
				return cb("Failed to retrieve user roles", null);
			}

			// Map role names
			const roles = userData.map((ele) => ele.role_name);

			// Generate JWT token with user's roles
			const payload = {
				roles: roles,
				user_id: data[0].id,
			};
			const token = jwt.sign(payload, secretKey, { expiresIn: "3h" });

			// Return token to callback
			return cb(null, token);
		});
	});
};

exports.signUpUser = (req, cb) => {
	let firstName = req.first_name;
	let lastName = req.last_name;
	let email = req.email;
	let password = req.password;

	conn.query(
		`Insert into user (firstName, lastName, email, password) values ('${firstName}', '${lastName}', '${email}', '${password}'`,
		(err, data) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, data);
			}
		}
	);
};
