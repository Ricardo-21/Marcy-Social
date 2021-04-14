const express = require('express');
const PORT = process.env.PORT || 8000;

const apiRouter = require('./router/apiRouter');
const appRouter = require('./router/appRouter');

const app = express();
app.set('view engine', 'ejs');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const session = require('express-session')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

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


app.listen(PORT, () => {console.log(`Server started on ${PORT}`)});