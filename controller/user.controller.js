const db = require('../db');
const jsw = require("jsonwebtoken");
const config = require('config');

class UserController {
    async registration(req, res) {
        try {
            const { named, description, login, password } = req.body;
            console.log('Received data:', { named, description, login, password });

            const newUser = await db.query(
                'INSERT INTO Users (named, description, login, password) VALUES (:named, :description, :login, :password) RETURNING *',
                {
                    replacements: { named, description, login, password },
                    type: db.QueryTypes.INSERT
                }
            );

            console.log('New user created:', newUser);
            const token = jsw.sign({ id: newUser[0].id }, "Gosa-Vlad-Alex-Egor", {expiresIn: "24h"});
            res.json({
                token,
                user: {
                    User: newUser[0]
                }
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Ошибка при создании пользователя');
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;
            console.log('Received data:', { login, password });

            const user = await db.query(
                'SELECT * FROM users WHERE login = :login AND password = :password',
                {
                    replacements: { login, password },
                    type: db.QueryTypes.SELECT
                }
            );

            if (user.length === 0) {
                console.log('User not found or invalid credentials');
                res.status(401).send('Неверный логин или пароль');
            } else {
                const token = jsw.sign({ id: user[0].id }, "Gosa-Vlad-Alex-Egor", {expiresIn: "24h"});
                console.log('User logged in:', user[0]);
                //res.json(user[0]);
                res.json({
                    token,
                    user: {
                        id: user[0].id
                    }
                });
                console.log(token);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).send('Ошибка при входе');
        }
    }

    async check(req, res) {
        try {
            const { login } = req.body;
            const [user] = await db.query(
                'SELECT id FROM users WHERE login = :login',
                {
                    replacements: { login },
                    type: db.QueryTypes.SELECT
                }
            );

            if (user) {
                res.json(user.id);
            } else {
                res.status(404).send('Пользователь не найден');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).send('Ошибка при входе');
        }
    }

    async refUser(req, res) {
        try {
            console.log('123')
            if(req.file){
                res.json(req.file)
                const { named, description } = req.body;
                const { originalname, mimetype, filename, path, size } = req.file;
                const token = req.headers.authorization.split(' ')[1]
                console.log(token);

                if (!token) {
                    return res.status(401).json({ error: 'Токен не предоставлен' });
                }

                const decodedToken = jsw.verify(token, "Gosa-Vlad-Alex-Egor");

                const userId = decodedToken.id;

                const UserPic = await db.query(
                    'UPDATE users SET named = :named, description = :description, ref_userpic = :filename WHERE id = :userId RETURNING *',
                    {
                        replacements: {named, description, filename, userId},
                        type: db.QueryTypes.UPDATE
                    }
                );
            } else {
                const { named, description } = req.body;
                const token = req.headers.authorization.split(' ')[1]
                console.log(token);

                if (!token) {
                    return res.status(401).json({ error: 'Токен не предоставлен' });
                }

                const decodedToken = jsw.verify(token, "Gosa-Vlad-Alex-Egor");

                const userId = decodedToken.id;

                const UserPic = await db.query(
                    'UPDATE users SET named = :named, description = :description WHERE id = :userId RETURNING *',
                    {
                        replacements: {named, description, userId},
                        type: db.QueryTypes.UPDATE
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readUser(req, res) {
        try {
            console.log('123')
            const token = req.headers.authorization.split(' ')[1]
            console.log(token);


            if (!token) {
                return res.status(401).json({ error: 'Токен не предоставлен' });
            }

            const decodedToken = jsw.verify(token, "Gosa-Vlad-Alex-Egor");
            const userId = decodedToken.id;

            const UserPic = await db.query(
                'SELECT * FROM users WHERE id = :userId;' +
                ' SELECT * FROM albums WHERE userid = :userId;' +
                ' SELECT * FROM photos WHERE userid = :userId;',
                {
                    replacements: {userId},
                    type: db.QueryTypes.UPDATE
                }
            );
            console.log(UserPic)
            res.json(UserPic);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new UserController();