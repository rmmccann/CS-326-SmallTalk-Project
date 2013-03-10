
UserTable = [
	{username:"JDoe",firstname:"John",lastname:"Doe",email:"jdoe@sm.com",password:"password",followers:["Georgina", "Frank", "Howard", "Dominic"],following:["Caroline", "Howard", "Marvin", "Carlton"]},
	{username:"jcivey",firstname:"Justin",lastname:"Ivey",email:"jcivey@sm.com",password:"password",followers:["Georgina", "Frank", "Howard", "Dominic"],following:["Caroline", "Howard", "Marvin", "Carlton"]},
	{username:"danton",firstname:"Derek",lastname:"Anton",email:"danton@sm.com",password:"password",followers:["Georgina", "Frank", "Howard", "Dominic"],following:["Caroline", "Howard", "Marvin", "Carlton"]},
	{username:"srojee",firstname:"Scott",lastname:"Rojee",email:"srojee@sm.com",password:"password",followers:["Georgina", "Frank", "Howard", "Dominic"],following:["Caroline", "Howard", "Marvin", "Carlton"]},
	{username:"rmmccann",firstname:"Ryan",lastname:"Mccann",email:"rmmccann@sm.com",password:"password",followers:["Georgina", "Frank", "Howard", "Dominic"],following:["Caroline", "Howard", "Marvin", "Carlton"]}
	];

exports.NewUser = {username: "",password: "",email: "",firstname: "",lastname: "",followers: [],following: []};
//user followers and following will be a function that retrieves the associated users followers and following from the corresponding relational table

exports.UserTable = UserTable;

exports.getUser = function (username) {
    var c = undefined;
    for (var i = 0; i < UserTable.length; i++) {
        if (UserTable[i].username === username) {
            c = UserTable[i];
            break;
        }
    }
    return c;
};
