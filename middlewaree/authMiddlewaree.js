const jsw = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            console.log(error)
            res.status(403).json({message: "Пользователь не авторизован"})
        }
        const decodedData = jsw.verify(token, "Gosa-Vlad-Alex-Egor")
        req.user = decodedData
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({message: "Пользователь не авторизован"})
    }
}