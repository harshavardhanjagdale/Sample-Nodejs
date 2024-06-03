exports.verifyAdminAccess = (req, res, next) => {
	console.log(req.user);
	if (req.user && req.user.roles.includes("admin")) {
		next();
	} else {
		res.status(404).json({
			message: "Forbidden",
		});
	}
};

exports.verifyUserAccess = (req, res, next) => {
	if (req.user && req.user.roles.includes("user")) {
		next();
	} else {
		res.status(401).json({
			message: "Unauthorised User",
		});
	}
};

exports.verifyManagerAccess = (req, res, next) => {
	if (req.user && req.user.roles.includes("manager")) {
		next();
	} else {
		res.status(401).json({
			message: "Unauthorised User",
		});
	}
};

exports.verifyTeamLead = (req, res, next) => {
	if (req.user && req.user.roles.includes("teamLead")) {
		next();
	} else {
		res.status(401).json({
			message: "Unauthorised User",
		});
	}
};
