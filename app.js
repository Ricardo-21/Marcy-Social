const express = require('express');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 8000;

const apiRouter = require('./router/apiRouter');
const appRouter = require('./router/appRouter');
const {Auth} = require('./models/Auth')

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
app.use('/', (req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.use("/", appRouter);


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


app.post('/login', async (req, res) => {
    let user = await Auth.getUser(req.body);
    const {username, password} = req.body;
    // debugger;
    if(user) {
        bcrypt.compare(password, user.encrypted_password, (err, results) =>{
            if (results) {
                // the email exists in the db and the password was a match
                req.session.user = user
                res.send(`${username} is logged in`)
                // res.send('Right email and password');
              } else {
                res.send("Invalid credentials"); // password is incorrect
              }
        })
    }
    else {
        res.send('wrong creds');
    }

})

app.post('/register', async (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if(err){
            res.send("error", error);
        }
        else {
            req.body.encrypt = hash;
            Auth.register(req.body);
            // res.send(`Thank you ${req.body.name} for signing up!`)
            res.redirect('/login');
        }
    })
})

app.listen(PORT, () => {console.log(`Server started on ${PORT}`)});