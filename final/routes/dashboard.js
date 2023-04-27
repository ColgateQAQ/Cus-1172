const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const videosPath = path.join(__dirname, '../data/videos.json');

router.get('/', (req, res) => {
    if (!req.session.user){
        res.setHeader('Content-Type', 'text/html');
        res.send('<form action="/auth/login",method="get">' +
            '<label>Please login first</label>' +
            '<br>' +
            '<button>Login page');
    }
    const videos = JSON.parse(fs.readFileSync(videosPath));
    const username = req.session.username;
    res.render('dashboard', { username ,videos });
});

router.get('/mine', (req, res) => {
    if (!req.session.user){
        res.setHeader('Content-Type', 'text/html');
        res.send('<form action="/auth/login",method="get">' +
            '<label>Please login first</label>' +
            '<br>' +
            '<button>Login page');
    }
    var videos = JSON.parse(fs.readFileSync(videosPath));
    const username = req.session.username;
    videos = videos.filter(video => video.username == username);
    res.render('dashboard', { username ,videos });
});

router.post('/add', (req, res) => {
    if (!req.session.user){
        res.setHeader('Content-Type', 'text/html');
        res.send('<form action="/auth/login",method="get">' +
            '<label>Please login first</label>' +
            '<br>' +
            '<button>Login page');
    }
    const { name, url } = req.body;
    const username = req.session.username;
    const videos = JSON.parse(fs.readFileSync(videosPath));
    videos.push({ name, url, username });
    fs.writeFileSync(videosPath, JSON.stringify(videos));
    res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


router.get('/upload', (req, res) => {
    if (!req.session.user){
        res.setHeader('Content-Type', 'text/html');
        res.send('<form action="/auth/login",method="get">' +
            '<label>Please login first</label>' +
            '<br>' +
            '<button>Login page');
    }
    res.render('upload');
});

module.exports = router;