const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync(usersPath));
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        res.status(409).send('User already exists.');
    } else {
        users.push({ username, password });
        fs.writeFileSync(usersPath, JSON.stringify(users));
        res.redirect('/auth/login');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync(usersPath));
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        req.session.user = user;
        req.session.username = username;
        res.redirect('/dashboard');
    } else {
        res.status(401).send('Invalid credentials.');
    }
});

module.exports = router;
