swaggerN
========

swaggerN is a very simple express 4.x routing middleware that takes a swagger 2.x specification and a mapping of operationId to handler function and configures express routes.

swaggerN casts parameters defined in the swagger specification to the appropriate types and exposes them at req.swagger

Like so:

```JavaScript
{
    query: { username: 'bob', offset: 1, limit: 2 }
}
```

## How to use swaggerN

Define your swagger 2.x spec:

```JavaScript
{
    "swagger": 2.0,
    "info": {
        "title": "Example API",
        ...
    },
    ...
    "paths": {
        "/users": {
            "get": {
				"summary": "Find Users",
				"operationId": "getUsers",
				...
}
```

Define your handler mapping:

```JavaScript
{
	getUsers: function (req, res) {
		...
	},
	...
}
```

Add the swaggerN router to express providing it with your spec and handler mapping

```JavaScript
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
...
// HERE
app.use(swaggerN.router(spec, handlers));
...
```