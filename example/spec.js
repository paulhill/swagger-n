module.exports = {
	swagger: 2.0,
	info: {
		title: 'Example API',
		description: 'This is an example ReST API',
		contact: {
			name: 'Paul Hill',
			email: 'paul.william.hill@gmail.com'
		},
		license: {
			name: 'WTFPL',
			url: 'http://www.wtfpl.net/about/'
		},
		version: '0.0.0'
	},
	host: '',
	schemes: [],
	basePath: '',
	consumes: [
		'application/json'
	],
	produces: [
		'application/json'
	],
	paths: {
		'/users': {
			'get': {
				summary: 'Find Users',
				description: 'The Find Users endpoint returns information about users. The response includes the id, username and other details about each user.',
				operationId: 'getUsers',
				parameters: [{
					name: 'username',
					in: 'query',
					description: "User's username",
					required: false,
					type: 'string',
					minLength: 1,
					maxLength: 32
				}, {
					name: 'offset',
					in: 'query',
					description: 'Index at which to start returning data from the search results (0 based)',
					required: false,
					type: 'integer',
					format: 'int32',
					default: 0,
					minimum: 0
				}, {
					name: 'limit',
					in: 'query',
					description: 'Number of results to return',
					required: false,
					type: 'integer',
					format: 'int32',
					default: 100,
					minimum: 0,
					maximum: 1000
				}],
				tags: [
					'Users'
				],
				responses: {
					200: {
						description: 'An array of users',
						schema: {
							$ref: 'Users'
						}
					},
					400: {
						description: 'Bad Request',
						schema: {
							$ref: 'Error'
						}
					},
					401: {
						description: 'Unauthorized',
						schema: {
							$ref: 'Error'
						}
					},
					403: {
						description: 'Forbidden',
						schema: {
							$ref: 'Error'
						}
					},
					429: {
						description: 'Too Many Requests',
						schema: {
							$ref: 'Error'
						}
					},
					500: {
						description: 'Server Error',
						schema: {
							$ref: 'Error'
						}
					}
				}
			},
			post: {
				summary: 'Add User',
				description: 'The Add User endpoint create a new user',
				operationId: 'postUser',
				parameters: [{
					name: 'body',
					in: 'body',
					description: 'The new user',
					required: true,
					schema: {
						$ref: 'NewUser'
					}
				}],
				tags: [
					'Users'
				],
				responses: {
					200: {
						description: 'The newly minted user',
						schema: {
							$ref: 'User'
						}
					},
					400: {
						description: 'Bad Request',
						schema: {
							$ref: 'Error'
						}
					},
					401: {
						description: 'Unauthorized',
						schema: {
							$ref: 'Error'
						}
					},
					403: {
						description: 'Forbidden',
						schema: {
							$ref: 'Error'
						}
					},
					429: {
						description: 'Too Many Requests',
						schema: {
							$ref: 'Error'
						}
					},
					500: {
						description: 'Server Error',
						schema: {
							$ref: 'Error'
						}
					}
				}
			}
		},
		'/users/{userId}': {
			'get': {
				summary: 'Get User',
				description: 'The Get User endpoint returns information about a specific user. The response includes the id, username and other details about the user',
				operationId: 'getUser',
				parameters: [{
					name: 'userId',
					in: 'path',
					description: "The user's unique identifier",
					required: true,
					type: 'string'
				}],
				tags: [
					'Users'
				],
				responses: {
					200: {
						description: 'A user',
						schema: {
							$ref: 'User'
						}
					},
					401: {
						description: 'Unauthorized',
						schema: {
							$ref: 'Error'
						}
					},
					403: {
						description: 'Forbidden',
						schema: {
							$ref: 'Error'
						}
					},
					404: {
						description: 'Not Found',
						schema: {
							$ref: 'Error'
						}
					},
					429: {
						description: 'Too Many Requests',
						schema: {
							$ref: 'Error'
						}
					},
					500: {
						description: 'Server Error',
						schema: {
							$ref: 'Error'
						}
					}
				}
			}
		}
	},
	definitions: {
		User: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					format: 'object-id'
				},
				username: {
					type: 'string',
					minLength: 3,
					maxLength: 32
				}
			}
		},
		Users: {
			type: 'array',
			items: {
				$ref: 'User'
			}
		},
		NewUser: {
			type: 'object',
			properties: {
				username: {
					type: 'string',
					minLength: 3,
					maxLength: 32
				}
			}
		},
		Error: {
			type: 'object',
			properties: {
				code: {
					type: 'integer',
					format: 'int32'
				},
				message: {
					type: 'string'
				},
				fields: {
					type: 'object'
				}
			},
			required: ['code', 'message']
		}
	},
	parameters: {
		offset: {
			name: 'offset',
			in: 'query',
			description: 'Index at which to start returning data from the search results (0 based)',
			required: false,
			type: 'integer',
			format: 'int32',
			default: 0,
			minimum: 0
		},
		limit: {
			name: 'limit',
			in: 'query',
			description: 'Number of results to return',
			required: false,
			type: 'integer',
			format: 'int32',
			default: 100,
			minimum: 0,
			maximum: 1000
		}
	},
	responses: {

	}
};