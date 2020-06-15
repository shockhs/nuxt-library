const jwt = require('jsonwebtoken');

// Мы исходим из предположения о том, что JWT приходит на сервер в заголовке Authorization, но токен может быть передан и в req.body, и в параметре запроса, поэтому вам нужно выбрать тот вариант, который подходит вам лучше всего. 
const getTokenFromHeader = (req) => {
    if (req.headers.authorization) {
        return req.headers.authorization;
    }
}

function jwtDecode() {
    return jwt({
        secret: process.env.TOKEN_SECRET, // Тут должно быть то же самое, что использовалось при подписывании JWT

        userProperty: 'authorization', // Здесь следующее промежуточное ПО сможет найти то, что было закодировано в services/auth:generateToken -> 'req.token'

        getToken: getTokenFromHeader, // Функция для получения токена аутентификации из запроса
    })
}
module.exports.jwtDecode = jwtDecode 
