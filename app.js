// Node Module dependencies:
var express = require('express');
var http = require('http');
var path = require('path');
// Application specific requires:
var index = require('./routes/index');
var user = require('./routes/user');
var hashfeed = require('./routes/hashfeed');
var feed = require('./routes/feed');
var chat = require('./routes/chat');
var search = require('./routes/search');

// Set up Express, socket.io
app = express(); //global app object
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.configure(
	function()
	{
		app.set('port', process.env.PORT || 3000);
		app.set('views', __dirname + '/views');
		app.set('view engine', 'ejs');
		app.use(express.favicon(__dirname + "/public/images/favicon.ico"));
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser('your secret here'));
		app.use(express.session());
		app.use(function(req, res, next){ res.locals.current_user = req.session.user; next(); });
		app.use(app.router);
		app.use(express.static(path.join(__dirname, 'public')));
		app.use(Handle404);
	}
);

//Handles 404 page
function Handle404(req, res, next)
{
	res.render('404');
}

//error handling
app.configure('development',    
	function()
	{
		app.use(express.errorHandler());
	}
);
//Tells the console it is listening on the given port
server.listen(app.get('port'),   
	function()
	{
		console.log("Express server listening on port " + app.get('port'));
	}
);
//array of connected users
var connectedClients = [];

io.set("log level", 1);
io.sockets.on("connection", function(socket)
{
	console.log("new connection:");
	//console.log(socket);
	socket.emit("message", {message: "hello from server", from: "Server"});

	socket.on("set nickname", function(username)
	{
		socket.set("nickname", username);
		connectedClients[username] = socket;
		console.log("CLIENTS: ");
		console.log(connectedClients);
	});

	socket.on("echo", function(data)
	{
		console.log("echo received");
		console.log(data);
		io.sockets.emit("message", {message: "ECHO: "+data, sender: "Server"});
	});

	socket.on("relay", function(data)
	{
		console.log("relay");
		console.log(data);

		// var tmp = io.sockets.sockets[data.username];
		// console.log(tmp);
		// console.log(io.sockets);
		// console.log(io.sockets.sockets);

		var soc = connectedClients[data.to];
		if(!soc){
			socket.emit("message", {message: "ERROR: USER NOT CONNECTED", from: "SERVER"});
		}
		else{
			soc.emit("message", data);
		}

		//io.sockets.emit("message", {message: data, sender: "Server"});
	});

	socket.on("disconnect", function()
	{
		console.log("client disconnect");
	});
});

// Define routes, route handlers
app.get('/', index.index);
app.get('/signup', index.signup);
app.get('/:user/profile', user.profile);
app.get('/:user/followers', user.followers);
app.get('/:user/following', user.following);
app.get('/feed/:language', hashfeed.feed);
app.get('/hashtag/:hashtag', feed.hashtag);
app.get('/language/:language', feed.language);
app.get('/chat', chat.index);
app.get('/help', index.help);
app.get('/settings', index.settings);
app.get('/shorty', index.shorty);


app.get('/signout', index.signout);
app.post('/signin', index.signin);
app.post('/toggleFollow', index.toggleFollow);
app.post('/addNewUser', index.createNewUser);
app.post('/submitNewPost', index.submitNewPost);
app.post('/search', search.searchAll);
app.post('/search/users', search.searchUsers);
app.get('/search', search.searchAll);

