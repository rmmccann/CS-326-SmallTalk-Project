
PostTable = [];

exports.PostTable = PostTable;

//List of supported languages for the language hashtag for example: %Java;
languages = [

	{name:"ABAP"},
	{name:"ActionScript"},
	{name:"Ada"},
	{name:"Apex"},
	{name:"AppleScript"},
	{name:"Arc"},
	{name:"Arduino"},
	{name:"ASP"},
	{name:"Assembly"},
	{name:"Augeas"},
	{name:"AutoHotkey"},
	{name:"Awk"},
	{name:"Boo"},
	{name:"Bro"},
	{name:"C"},
	{name:"C#"},
	{name:"C++"},
	{name:"Ceylon"},
	{name:"CLIPS"},
	{name:"Clojure"},
	{name:"CoffeeScript"},
	{name:"ColdFusion"},
	{name:"Common Lisp"},
	{name:"Coq"},
	{name:"D"},
	{name:"Dart"},
	{name:"DCPU-16 ASM"},
	{name:"Delphi"},
	{name:"DOT"},
	{name:"Dylan"},
	{name:"eC"},
	{name:"Ecl"},
	{name:"Eiffel"},
	{name:"Elixir"},
	{name:"Emacs Lisp"},
	{name:"Erlang"},
	{name:"F#"},
	{name:"Factor"},
	{name:"Fancy"},
	{name:"Fantom"},
	{name:"Forth"},
	{name:"FORTRAN"},
	{name:"Go"},
	{name:"Gosu"},
	{name:"Groovy"},
	{name:"Haskell"},
	{name:"Haxe"},
	{name:"Io"},
	{name:"Ioke"},
	{name:"Java"},
	{name:"JavaScript"},
	{name:"Julia"},
	{name:"Kotlin"},
	{name:"Lasso"},
	{name:"LiveScript"},
	{name:"Logos"},
	{name:"Logtalk"},
	{name:"Lua"},
	{name:"Matlab"},
	{name:"Max"},
	{name:"Mirah"},
	{name:"Monkey"},
	{name:"MoonScript"},
	{name:"Nemerle"},
	{name:"Nimrod"},
	{name:"Nu"},
	{name:"Objective-C"},
	{name:"Objective-J"},
	{name:"OCaml"},
	{name:"Omgrofl"},
	{name:"ooc"},
	{name:"Opa"},
	{name:"OpenEdge ABL"},
	{name:"Parrot"},
	{name:"Perl"},
	{name:"PHP"},
	{name:"Pike"},
	{name:"PogoScript"},
	{name:"PowerShell"},
	{name:"Prolog"},
	{name:"Puppet"},
	{name:"Pure Data"},
	{name:"Python"},
	{name:"R"},
	{name:"Racket"},
	{name:"Ragel in Ruby Host"},
	{name:"Rebol"},
	{name:"Rouge"},
	{name:"Ruby"},
	{name:"Rust"},
	{name:"Scala"},
	{name:"Scheme"},
	{name:"Scilab"},
	{name:"Self"},
	{name:"Shell"},
	{name:"Smalltalk"},
	{name:"Standard ML"},
	{name:"SuperCollider"},
	{name:"Tcl"},
	{name:"Turing"},
	{name:"TXL"},
	{name:"TypeScript"},
	{name:"Vala"},
	{name:"Verilog"},
	{name:"VHDL"},
	{name:"VimL"},
	{name:"Visual Basic"},
	{name:"XML"},
	{name:"XQuery"},
	{name:"Xtend"}

]

//Traverses languages[] to find the correct language
exports.getLanguage = function (name) {
    for (var i = 0; i < languages.length; i++) {
        if (languages[i].name.toLowerCase() == name) {
            return true;
        }
    }
    return false;
};

//Finds all posts that have used the specific language hashtag in the past and returns them
exports.getFollowedPosts = function(following, user){
	var postsToReturn = [];
	PostTable.forEach(function(post){
		if(post.user == user || following.indexOf(post.user) != -1){
			postsToReturn.push(post);
		}
	});
	return postsToReturn;
}