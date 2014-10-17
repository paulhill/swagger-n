var _ = require('lodash');
var express = require('express');

function castParam(req, spec) {

	var name = spec.name;

	var scope;
	switch (spec.in) {
		case 'query':
			scope = 'query';
			break;
		case 'header':
			scope = 'header';
			break;
		case 'path':
			scope = 'params';
			break;
		case 'formData':
			// leave form data parsing to 3rd party middleware
			break;
		case 'body':
			// leave body parsing to 3rd party middleware
			break;
	}

	if (typeof scope === 'undefined') {
		// scope not parsed
		return;
	}

	req.swagger[scope] = req.swagger[scope] || {};

	var param = req[scope][name];
	if (typeof param === 'undefined') {
		// param not found
		return;
	}

	if (spec.type === 'string') {

		if (spec.format === 'date' || spec.format === 'date-time') {
			// dates
			req.swagger[scope][name] = new Date(param);
		} else if (spec.format === 'byte') {
			// byte array
			var bytes = [];
			for (var i = 0; i < str.length; ++i) {
				bytes.push(str.charCodeAt(i));
			}
			req.swagger[scope][name] = bytes;
		} else {
			// plain strings
			req.swagger[scope][name] = param;
		}
	}

	if (spec.type === 'number') {
		req.swagger[scope][name] = parseFloat(param);
	}

	if (spec.type === 'integer') {
		req.swagger[scope][name] = parseInt(param, 10);
	}

	if (spec.type === 'boolean') {
		req.swagger[scope][name] = (param === 'true');
	}

	if (spec.type === 'array') {
		var separator; // csv default
		switch (spec.collectionFormat) {
			case 'csv':
				separator = ',';
				break;
			case 'ssv':
				separator = ' ';
				break;
			case 'tsv':
				separator = '\t';
				break;
			case 'pipes':
				separator = '|';
				break;
			case 'multi':
				// TODO unsupported multi
				break;
		}

		if (!separator) {
			// param not found
			return;
		}

		// convert array types
		req.swagger[scope][name] = param.split(separator);
	}
}

function router(spec, handlers) {

	var r = express.Router();

	r.get('/swagger.json', function (req, res) {
		res.json(spec);
	});

	_.forOwn(spec.paths, function (pathSpec, path) {

		// convert to express style path
		path = path.replace(/\/{/g, "/:").replace(/\}/g, "");

		_.forOwn(pathSpec, function (methodSpec, method) {

			if (!methodSpec) {
				throw new Error('missing method spec for ' + method + ' ' + path);
			}

			var handler = handlers[methodSpec.operationId];
			if (!handler) {
				throw new Error('missing route handler for ' + methodSpec.operationId);
			}

			r[method](path, function (req, res, next) {

				req.swagger = req.swagger || {};

				if (methodSpec.parameters) {
					_.forEach(methodSpec.parameters, function (parameterSpec) {
						// cast params in req.swagger object
						castParam(req, parameterSpec);
					});
				}

				handler(req, res, next);
			});
		});
	});

	return r;
}

module.exports.router = router;