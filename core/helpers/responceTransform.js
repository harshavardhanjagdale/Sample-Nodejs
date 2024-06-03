exports.successResponse = function (
	data = [],
	msg = "success",
	error = false,
	statusCode = 200
) {
	return {
		error: error,
		statusCode: statusCode,
		message: msg,
		data: data,
	};
};

exports.errorResponse = function (
	msg = "Error",
	error = true,
	statusCode = 400
) {
	return {
		error: error,
		statusCode: statusCode,
		message: msg,
	};
};
