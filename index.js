const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');


const app = express();

//app.use(logger);

// handlebars middleware

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// body parser middleware for post member
app.use(express.json());
app.use(express.urlencoded({extended :false}));

// homepage route se sposto static folder la home sarà index.html
app.get('/', (req, res) => res.render('index', {title:'Member App', members}));

//set static folder

app.use(express.static(path.join(__dirname, 'public')));

// route api members
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log('Server started at 5000'));
