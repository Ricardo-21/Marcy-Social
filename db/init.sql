DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstname TEXT, 
    lastname TEXT, 
    username TEXT,
	photo_src TEXT,
    encrypted_password TEXT,
	bio TEXT
    );

CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
	user_id INT REFERENCES users(id),
    title TEXT,
    descr TEXT, 
    project_link TEXT
    );
	
CREATE TABLE comments (
    id SERIAL PRIMARY KEY, 
	user_id INT REFERENCES users(id),
	post_id INT REFERENCES posts(id),
    intial_comment TEXT
    );
	
CREATE TABLE likes (
    id SERIAL PRIMARY KEY, 
	user_id INT REFERENCES users(id),
	post_id INT REFERENCES posts(id)
    );