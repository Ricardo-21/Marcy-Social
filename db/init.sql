DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstname TEXT, 
    lastname TEXT, 
    username TEXT,
	photo_src TEXT,
    encrypted_password TEXT,
	bio TEXT,
    api_key TEXT
    );

CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
	user_id INT REFERENCES users(id),
    title TEXT,
    descr TEXT, 
    project_link TEXT,
    code_block TEXT
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