const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

app.use(logger);

// gets all members
app.get('/api/members', (req, res) =>
    res.json(members));

// get a single member with id

app.get('/api/members/:id', (req, res) => {

  const found = members.some(member => member.id === parseInt(req.params.id));


  if(found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  }else {
    res.status(400).json ({msg:'member not found'});
  }
});

//set static folder

app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log('Server started at 5000'));
