const express = require('express');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 8000;


const apiRouter = require('./router/apiRouter');
// const appRouter = require('./router/appRouter');
// const {Auth} = require('./models/Auth')

const app = express();
app.set('view engine', 'ejs');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const session = require('express-session')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//sessionID COOKIE STUFF

app.use(session({
    secret: 'shhh',
    resave: false,
    saveUninitialized: false,
    name: 'marcy_social'
}))

app.use('/api', apiRouter);


app.get("/", (req, res) => {
    const {user} = req.session;
    if(user) {
      res.render("home", {title: 'Welcome ' + user.username})
    } else {
      res.redirect("/login")
    }
  });

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.listen(PORT, () => {console.log(`Server started on ${PORT}`)});