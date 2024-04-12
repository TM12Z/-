const db = require('../db')
class tagController{
    async create(req, res){
        try {
            // Проверяем, был ли загружен файл
            if (req.file) {
                // Если да, отправляем информацию о файле обратно клиенту
                res.json(req.file);
            }

            // Если поле named доступно в запросе, получаем его значение
            const { named } = req.body;

            // Вставляем новую запись в таблицу tags
            const newTag = await db.query(
                'INSERT INTO tags (named) VALUES (?) RETURNING *',
                {
                    replacements: [named], // Заменяем placeholder (?) на значение named
                    type: db.QueryTypes.INSERT
                }
            );

            // Отправляем новую запись о теге обратно клиенту
            res.json(newTag);
        } catch (error) {
            console.error(error);
            res.status(500).send('Ошибка при обработке запроса');
        }
    }
    async delete(req, res){
        try {
            // Получение идентификатора тега, который нужно удалить, из параметров запроса или тела запроса
            const tagId = parseInt(req.body.id); // Например, если вы используете маршрут вида '/tags/:tagId'
            console.log(tagId)
            // Выполнение запроса к базе данных для удаления тега по идентификатору
            await db.query(
                'DELETE FROM tags WHERE id = :tagId',
                {
                    replacements: { tagId },
                    type: db.QueryTypes.DELETE
                }
            );

            // Отправка сообщения об успешном удалении обратно клиенту
            res.send('Тег успешно удален');
        } catch (error) {
            console.error(error);
            res.status(500).send('Ошибка при удалении тега');
        }
    }
    async update(req, res){
        res.json({message:'update'})
    }

    async read(req, res){
        try {
            // Выполнение запроса к базе данных для получения всех записей из таблицы tags
            const tags = await db.query(
                'SELECT * FROM tags',
                { type: db.QueryTypes.SELECT }
            );

            // Отправка найденных тегов обратно клиенту
            res.json(tags);
        } catch (error) {
            console.error(error);
            res.status(500).send('Ошибка при чтении данных');
        }

    }

}
module.exports = new tagController()