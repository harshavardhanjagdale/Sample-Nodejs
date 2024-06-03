const express = require("express");
const router = express.Router();
const { param } = require("express-validator");
const userService = require("../core/services/userServices");
const Auth = require("../core/middleware/verifyToken");
const resTransform = require("../core/helpers/responceTransform");
const validate = require("../core/helpers/validationCheck");
const checkAccess = require("../core/middleware/checkAccess");
// const verifyadmin=require('../middleware/checkAcces')

router.get(
	"/users/:id",
	Auth,
	[param("id").exists().withMessage("id is required")],
	checkAccess.verifyAdminAccess,
	(req, res) => {
		// console.log(req.user)
		userService.users(req, (err, result) => {
			if (err) {
				res.json(resTransform.errorResponse(err));
			} else {
				res.json(resTransform.successResponse(result));
			}
			return res;
		});
	}
);

router.get("/users", Auth, checkAccess.verifyAdminAccess, (req, res) => {
	// console.log(req.user)
	userService.user(req, (err, result) => {
		if (err) {
			res.json(resTransform.errorResponse(err));
		} else {
			res.json(resTransform.successResponse(result));
		}
		return res;
	});
});

router.post("/users", Auth, validate.createUserValidate(), (req, res) => {
	userService.postUsers(req, (err, result) => {
		if (err) {
			res.json(res.json(resTransform.errorResponse(err)));
		} else {
			res.json(resTransform.successResponse("Record Added successfully"));
		}
		return res;
	});
});

router.put("/users/:id", Auth, validate.updateUserValidate(), (req, res) => {
	userService.updateUsers(req, (err, result) => {
		if (err) {
			res.json(resTransform.errorResponse(err));
		} else {
			res.json(
				resTransform.successResponse(
					result,
					"Record Updated successfully"
				)
			);
		}
		return res;
	});
});

router.delete(
	"/users/:id",
	Auth,
	[param("id").exists().withMessage("id is required")],
	(req, res) => {
		userService.deleteUser(req, (err, result) => {
			if (err) {
				res.json(resTransform.errorResponse(err));
				return res;
			} else {
				res.json(
					resTransform.successResponse(
						result,
						"Record Deleted successfully"
					)
				);
			}
			return res;
		});
	}
);

module.exports = router;
