
/**
 * Module dependencies.
 */

var express = require('express');
var index = require('./routes/index');
var user = require('./routes/user');
var hashfeed = require('./routes/hashfeed');
var http = require('http');
var path = require('path');
//var tables = require('./lib/Tables')

app = express();


app.configure(
	function()
	{
		app.set('port', process.env.PORT || 3000);
		app.set('views', __dirname + '/views');
		app.set('view engine', 'ejs');
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser('your secret here'));
		app.use(express.session());
		app.use(function(req, res, next){ res.locals.current_user = req.session.username; next(); });
		app.use(app.router);
		app.use(express.static(path.join(__dirname, 'public')));
	}
);

app.configure('development', 
	function()
	{
		app.use(express.errorHandler());
	}
);

//creating tables here
//tables.User.sync();
//tables.Tweet.sync();


app.get('/', index.index);
app.get('/signup', index.signup);
app.get('/logout', index.logout);
app.get('/:user/profile', user.profile);
app.get('/:user/followers', user.followers);
app.get('/:user/following', user.following);
app.get('/feed/:hashtag', hashfeed.feed);

app.post('/signin', index.signin);
app.post('/addNewUser', index.createNewUser);



http.createServer(app).listen(app.get('port'), 
	function()
	{
		console.log("Express server listening on port " + app.get('port'));
	}
);
