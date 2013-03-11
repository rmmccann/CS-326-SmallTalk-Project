//Dummy data
UserTable = [

	{username:"JDoe",firstname:"John",lastname:"Doe",email:"jdoe@sm.com",password:"password",followers:["jcivey", "danton", "srojee", "rmmccann"],following:["jcivey", "danton", "srojee", "rmmccann"]},
	{username:"jcivey",firstname:"Justin",lastname:"Ivey",email:"jcivey@sm.com",password:"password",followers:["JDoe", "danton", "srojee", "rmmccann"],following:["JDoe", "danton", "srojee", "rmmccann"]},
	{username:"danton",firstname:"Derek",lastname:"Anton",email:"danton@sm.com",password:"password",followers:["JDoe", "jcivey", "srojee", "rmmccann"],following:["JDoe", "jcivey", "srojee", "rmmccann"]},
	{username:"srojee",firstname:"Scott",lastname:"Rojee",email:"srojee@sm.com",password:"password",followers:["JDoe", "jcivey", "danton", "rmmccann"],following:["JDoe", "jcivey", "danton", "rmmccann"]},
	{username:"rmmccann",firstname:"Ryan",lastname:"Mccann",email:"rmmccann@sm.com",password:"password",followers:["JDoe", "jcivey", "danton", "srojee"],following:["JDoe", "jcivey", "danton", "srojee"]}

	];



exports.UserTable = UserTable;

//For the given user, the list of followers and followed users are returned
exports.getUser = function (username) {
    var c = undefined;
    if(!username){username = ""}
    for (var i = 0; i < UserTable.length; i++) {
        if (UserTable[i].username.toLowerCase() == username.toLowerCase()) {
            c = UserTable[i];
            break;
        }
    }
    return c;
};
