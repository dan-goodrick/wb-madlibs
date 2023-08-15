import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import sample from 'lodash.sample'
const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'oh-so-not-meh',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];
let userName;
// Display the homepage
app.get('/', (req, res) => {
  res.render('index.html');
});

// Display a form that asks for the user's name.
app.get('/hello', (req, res) => {
  res.render('hello.html');
});

// Handle the form from /hello and greet the user.
app.get('/greet', (req, res) => {
  userName = req.query.name
  res.render('greet.html.njk', {...req.query});
});
console.log(userName)
app.get('/game', (req, res) => {
  const ans = req.query.play
  console.log(req.query)
  if (ans === 'no'){
    res.render('goodbye.html.njk', {name:userName})
  } else if (ans === 'yes'){
    res.render('game.html.njk')
  }
})

app.get("/madlib", (req, res) => {
  console.log(req.query)
  res.render('madlib.html.njk', {...req.query})
})