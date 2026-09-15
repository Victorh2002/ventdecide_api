const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let authHeader = null;
    let token = null;

    if (req.headers.authorization) {
        authHeader = req.headers.authorization;
        token = authHeader && authHeader.split(' ')[1];
    } else if (req.headers.cookie) {
        authHeader = req.headers.cookie;
        const splittedCookies = authHeader.split(';');
        const accessToken = splittedCookies.findIndex(e => e.trim().startsWith("access_token"));
        accessToken !== -1 ? token = splittedCookies[accessToken].split('=')[1] : token = null;
    }

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
                .clearCookie('access_token', '', { 
                    domain: '.ventdecide.com.br', // O ponto liga a 'api.' com a raiz
                    httpOnly: true, 
                    secure: true, 
                    sameSite: 'lax', // Pode usar lax, já que estão no mesmo domínio raiz
                })
                .json({ error: 'Token inválido ou expirado' });
        }

        console.log(user);
        req.user = user;

        next(); 
    });
};

module.exports = authMiddleware;