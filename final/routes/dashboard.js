const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const videosPath = path.join(__dirname, '../data/videos.json');

router.get('/', (req, res) => {
    const videos = JSON.parse(fs.readFileSync(videosPath));
    const username = req.session.username;
    res.render('dashboard', { username ,videos });
});

router.get('/mine', (req, res) => {
    var videos = JSON.parse(fs.readFileSync(videosPath));
    const username = req.session.username;
    videos = videos.filter(video => video.username == username);
    res.render('dashboard', { username ,videos });
});

router.post('/add', (req, res) => {
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
    res.render('upload');
});

module.exports = router;