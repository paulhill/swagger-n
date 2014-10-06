module.exports = {

	// dummy methods, just logging the parsed params and returning an empty result

	getUsers: function (req, res) {
		console.log('getUsers', req.swagger);
        res.status(200).json([]);
	},
	postUser: function (req, res) {
		console.log('postUser', req.swagger);
        res.status(200).json({});
	},
	getUser: function (req, res) {
		console.log('getUser', req.swagger);
        res.status(200).json({});
	}
};