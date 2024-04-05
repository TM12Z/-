const db = require('../db')

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
            res.json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Ошибка при создании пользователя');
        }
    }

    async login(req, res) {
        res.json({ message: 'logincreate' });
    }

    async check(req, res) {
        res.json({ message: 'online' });
    }
}

module.exports = new UserController();