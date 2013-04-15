var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db/db.sqlite");


//List of supported languages for the language hashtag for example: %Java;
languages = [
	"ABAP",
	"ActionScript",
	"Ada",
	"Apex",
	"AppleScript",
	"Arc",
	"Arduino",
	"ASP",
	"Assembly",
	"Augeas",
	"AutoHotkey",
	"Awk",
	"Boo",
	"Bro",
	"C",
	"C#",
	"C++",
	"Ceylon",
	"CLIPS",
	"Clojure",
	"CoffeeScript",
	"ColdFusion",
	"Common Lisp",
	"Coq",
	"D",
	"Dart",
	"DCPU-16 ASM",
	"Delphi",
	"DOT",
	"Dylan",
	"eC",
	"Ecl",
	"Eiffel",
	"Elixir",
	"Emacs Lisp",
	"Erlang",
	"F#",
	"Factor",
	"Fancy",
	"Fantom",
	"Forth",
	"FORTRAN",
	"Go",
	"Gosu",
	"Groovy",
	"Haskell",
	"Haxe",
	"Io",
	"Ioke",
	"Java",
	"JavaScript",
	"Julia",
	"Kotlin",
	"Lasso",
	"LiveScript",
	"Logos",
	"Logtalk",
	"Lua",
	"Matlab",
	"Max",
	"Mirah",
	"Monkey",
	"MoonScript",
	"Nemerle",
	"Nimrod",
	"Nu",
	"Objective-C",
	"Objective-J",
	"OCaml",
	"Omgrofl",
	"ooc",
	"Opa",
	"OpenEdge ABL",
	"Parrot",
	"Perl",
	"PHP",
	"Pike",
	"PogoScript",
	"PowerShell",
	"Prolog",
	"Puppet",
	"Pure Data",
	"Python",
	"R",
	"Racket",
	"Ragel in Ruby Host",
	"Rebol",
	"Rouge",
	"Ruby",
	"Rust",
	"Scala",
	"Scheme",
	"Scilab",
	"Self",
	"Shell",
	"Smalltalk",
	"Standard ML",
	"SuperCollider",
	"Tcl",
	"Turing",
	"TXL",
	"TypeScript",
	"Vala",
	"Verilog",
	"VHDL",
	"VimL",
	"Visual Basic",
	"XML",
	"XQuery",
	"Xtend"
];

//Traverses languages[] to find the correct language
exports.getLanguage = function (name)
{
    for (var i = 0; i < languages.length; i++) {
        if (languages[i].toLowerCase() == name) {
            return true;
        }
    }
    return false;
};

exports.insertPost = function(user_id, text)
{
	db.run("INSERT INTO Posts values(NULL, $id, $content, DATETIME())", {$id: user_id, $content: text});
}

exports.getPosts = function(user, cb)
{
	db.all("SELECT P.*, U.username FROM Posts P, Users U, Follows F WHERE (P.author_id=$uid OR (F.follower_id=$uid AND F.followed_id=author_id)) AND U.id=P.author_id GROUP BY P.id", {$uid: user.id}, function(err, rows){
		cb(rows);
	});
}

exports.getPostsByHashtag = function(hashtag, cb)
{
	var str = "%#"+hashtag+"%";
	db.all("SELECT * FROM Posts WHERE content LIKE ?", [str], function(err, rows){
		cb(rows);
	});
}

exports.getPostsByLanguage = function(language, cb)
{
	var str = "%\%"+language+"%";
	db.all("SELECT * FROM Posts WHERE content LIKE ?", [str], function(err, rows){
		cb(rows);
	});
}
