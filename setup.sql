DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS notes CASCADE;

CREATE TABLE IF NOT EXISTS users (
    uId serial NOT NULL,
    email varchar(254) NOT NULL,
    password_md5 varchar(32) NOT NULL,

    PRIMARY KEY (uId)
);

CREATE TABLE IF NOT EXISTS notes (
    nId SERIAL NOT NULL,
    uId int NOT NULL,
    title varchar(30) NOT NULL,
    text varchar(140),

    FOREIGN KEY(uId)
        REFERENCES users(uId)
        ON DELETE CASCADE,
    PRIMARY KEY(nId, uId)
);

INSERT INTO users (email,password_md5) VALUES 
	('James@gmail.com','5f4dcc3b5aa765d61d8327deb882cf99'),
	('arnaud.paul@dormakaba.com','5f4dcc3b5aa765d61d8327deb882cf99');
	
INSERT INTO notes (nId,uId,title,text) VALUES
	(1,1,'My first note','This is my first note'),
	(2,1,'My second note','This is my second note'),
	(3,2,'My first note','This is my first note'),
	(4,2,'My second note','This is my second note');