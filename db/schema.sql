DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Follows;

CREATE TABLE Posts(id integer PRIMARY KEY NOT NULL, author_id integer, content text, created_at datetime DEFAULT (DATETIME()));
CREATE TABLE Users(id integer PRIMARY KEY NOT NULL, username varchar(30), firstname varchar(30), lastname varchar(30), email varchar(30), password varchar(30));
CREATE TABLE Follows(follower_id integer, followed_id integer);
CREATE TABLE Notifications(user_id integer, message text);

-- Test Data
INSERT INTO Users values(NULL, 'rmmccann', 'Ryan', 'McCann', 'rmmccann@student.umass.edu', 'password');
INSERT INTO Users values(NULL, 'danton', 'Derek', 'Anton', 'danton@student.umass.edu', 'password');
INSERT INTO Users values(NULL, 'jcivey', 'Justin', 'Ivey', 'jcivey@student.umass.edu', 'password');
INSERT INTO Users values(NULL, 'srojee', 'Scott', 'Rojee', 'srojee@student.umass.edu', 'password');

-- Lets add some follower/following relations
INSERT INTO Follows values(1,2);
INSERT INTO Follows values(1,3);
INSERT INTO Follows values(2,1);
INSERT INTO Follows values(2,3);
INSERT INTO Follows values(3,1);
INSERT INTO Follows values(3,4);

-- To find someone's followers
--SELECT B.* FROM Users A, Users B, Follows F WHERE F.follower_id=A.id AND F.followed_id=B.id AND A.id=1;
