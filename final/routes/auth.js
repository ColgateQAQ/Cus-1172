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
        res.send('<form action="/auth/register",method="get">' +
            '<label>User already exists</label>' +
            '<br>' +
            '<button>Register page');
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
        res.send('<form action="/auth/login",method="get">' +
            '<label>Invalid username or password</label>' +
            '<br>' +
            '<button>Login page' );
    }
});

module.exports = router;
