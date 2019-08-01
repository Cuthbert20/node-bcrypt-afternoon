INSERT INTO users
(is_admin, username, hash)
VALUES
(${isAdmin}, ${username}, ${hash})
returning *;