
Users = [
	{username:"JDoe",firstname:"John",lastname:"Doe",password:"password",followers:["Georgina", "Frank", "Howard", "Dominic"],following:["Caroline", "Howard", "Marvin", "Carlton"]},
	{username:"jcivey",firstname:"Justin",lastname:"Ivey",password:"password",followers:["Georgina", "Frank", "Howard", "Dominic"],following:["Caroline", "Howard", "Marvin", "Carlton"]},
	{username:"danton",firstname:"Derek",lastname:"Anton",password:"password",followers:["Georgina", "Frank", "Howard", "Dominic"],following:["Caroline", "Howard", "Marvin", "Carlton"]},
	{username:"srojee",firstname:"Scott",lastname:"Rojee",password:"password",followers:["Georgina", "Frank", "Howard", "Dominic"],following:["Caroline", "Howard", "Marvin", "Carlton"]},
	{username:"rmmccann",firstname:"Ryan",lastname:"Mccann",password:"password",followers:["Georgina", "Frank", "Howard", "Dominic"],following:["Caroline", "Howard", "Marvin", "Carlton"]}
	]

//user followers and following will be a function that retrieves the associated users followers and following from the corresponding relational table

exports.Users

exports.get_user = function (username) {
    var c = undefined;
    for (var i = 0; i < Users.length; i++) {
        if (Users[i].username === username) {
            c = Users[i];
            break;
        }
    }
    return c;
};
