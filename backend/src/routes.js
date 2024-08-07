module.exports = (pool, jwt, bcrypt) => {
    const express = require('express');
    const router = express.Router();

    router.post('/register', async (req, res) => {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, hashedPassword]);
        res.status(201).send({ message: 'User registered successfully!' });
    });

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length > 0) {
            const validPassword = await bcrypt.compare(password, user.rows[0].password);
            if (validPassword) {
                const token = jwt.sign({ id: user.rows[0].id }, 'your_jwt_secret', { expiresIn: '1h' });
                res.status(200).send({ token });
            } else {
                res.status(401).send({ message: 'Invalid password' });
            }
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    });

    router.get('/urls', authenticateJWT, async (req, res) => {
        const userId = req.user.id;
        const urls = await pool.query('SELECT * FROM urls WHERE userid = $1', [userId]);
        res.status(200).send(urls.rows);
    });

    router.post('/urls', authenticateJWT, async (req, res) => {
        const { url } = req.body;
        const userId = req.user.id;
        await pool.query('INSERT INTO urls (userid, urlstring, active) VALUES ($1, $2, $3)', [userId, url, true]);
        res.status(201).send({ message: 'URL added successfully!' });
    });

    router.delete('/urls/:id', authenticateJWT, async (req, res) => {
        const id = req.params.id;
        const userId = req.user.id;
        await pool.query('DELETE FROM urls WHERE id = $1 AND userid = $2', [id, userId]);
        res.status(200).send({ message: 'URL deleted successfully!' });
    });

    function authenticateJWT(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            jwt.verify(token, 'your_jwt_secret', (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }

    return router;
};