const {request} = require("express");
const db =  require("../db")
const fs = require ("fs")

const fileMiddleware = require('../file.js')
const jsw = require("jsonwebtoken");

class PhotoController{
    async create(req, res) {
        try {
            if(req.file){
                res.json(req.file)
                console.log("123")
            }
            console.log("123")
            const token = req.headers.authorization.split(' ')[1]
            console.log(token);

            if (!token) {
                return res.status(401).json({ error: 'Токен не предоставлен' });
            }

            const decodedToken = jsw.verify(token, "Gosa-Vlad-Alex-Egor");

            const userId = decodedToken.id;

            const { originalname, mimetype, filename, path, size } = req.file;

            const {named, description} = req.body;

            const newimage = await db.query(
                'INSERT INTO photos (ref, named, description, userid) VALUES (:filename, :named, :description, :userId) RETURNING *',
                {
                    replacements: { userId, filename, named, description},
                    type: db.QueryTypes.INSERT
                }
            );

        }
        catch (error){
            console.log(error);
        }
    }

    async read(req, res) {
        try{
            const ReadPhoto = await db.query(
                'SELECT * FROM photos',
            {
                type: db.QueryTypes.SELECT
            }
            )
            console.log(ReadPhoto);
            res.json(ReadPhoto);
        } catch(error) {
            console.log(error);
        }
    }

    async delete(req, res){
        try{

            const token = req.headers.authorization.split(' ')[1]
            console.log(token);

            if (!token) {
                return res.status(401).json({ error: 'Токен не предоставлен' });
            }

            const decodedToken = jsw.verify(token, "Gosa-Vlad-Alex-Egor");

            const userId = decodedToken.id;
            const { ref } = req.body;


            console.log(req.body)

            const deletedImage = await db.query(
                'DELETE FROM photos WHERE ref = :ref AND userId = :userId RETURNING *',
                {
                    replacements: { ref, userId },
                    type: db.QueryTypes.DELETE
                }
            );

            // Если запись была успешно удалена, удаляем файл из папки images
            const imagePath = `./images/${ref}`; // Укажите корректный путь к папке и имя файла
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении файла:', err);
                    return res.status(500).json({ error: 'Ошибка при удалении файла' });
                    // Обработка ошибки удаления файла
                } else {
                    console.log('Файл успешно удален из папки images');
                    return res.status(200).json({ message: 'Файл успешно удален из папки images' });
                    // Обработка успешного удаления файла
                }
            });


        } catch (error){
            console.log(error)
            return res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }

}
module.exports = new PhotoController()