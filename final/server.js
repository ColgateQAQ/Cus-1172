const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const session = require('express-session');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "resources")))
app.use(
    session({
        secret: 'my-video-website-secret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
    })
);

app.use('/auth', authRoutes);
app.get('/',(req,res) =>{
    res.render("index");
})
app.use('/dashboard', dashboardRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});