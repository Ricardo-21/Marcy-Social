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


-- DROP TABLE IF EXISTS events;

-- CREATE TABLE events (
-- 	id SERIAL PRIMARY KEY,
-- 	event TEXT,
-- 	start_date DATE,
-- 	end_date DATE
-- );

-- INSERT INTO events (event, start_date, end_date) VALUES 
-- 	('Family Friday', TO_DATE('23/04/2021', 'DD/MM/YYYY'), null),
-- 	('Leadership Seminar', TO_DATE('30/04/2021', 'DD/MM/YYYY'), null),
-- 	('Leadership Seminar', TO_DATE('07/05/2021', 'DD/MM/YYYY'), null),
-- 	('Civic Hackathon', TO_DATE('10/05/2021', 'DD/MM/YYYY'), TO_DATE('28/05/2021', 'DD/MM/YYYY')),
-- 	('Leadership Seminar', TO_DATE ('14/05/2021', 'DD/MM/YYYY'), null),
-- 	('Demo Day', TO_DATE('28/05/2021', 'DD/MM/YYYY'), null),
-- 	('Memorial Day', TO_DATE('31/05/2021', 'DD/MM/YYYY'), null),
-- 	('Summer Break', TO_DATE('01/06/2021', 'DD/MM/YYYY'), TO_DATE('11/06/2021', 'DD/MM/YYYY')),
-- 	('Practicum + Capstone', TO_DATE('14/06/2021', 'DD/MM/YYYY'), TO_DATE('03/09/2021', 'DD/MM/YYYY'));