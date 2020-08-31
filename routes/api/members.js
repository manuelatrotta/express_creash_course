const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');


// API ROUTES
// gets all members
router.get('/', (req, res) =>
    res.json(members));

// get a single member with id

router.get('/:id', (req, res) => {

  const found = members.some(member => member.id === parseInt(req.params.id));

  if(found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  }else {
    res.status(400).json ({msg: `member wit id: ${req.params.id} not found`});
  }
});

// create a member
router.post('/', (req, res) => {
  //res.send(req.body); prova su postman
  const newMember = {
    id : uuid.v4(),
    name : req.body.name,
    email : req.body.email,
    status :'active'
  }
  if(!newMember.name || !newMember.email) {
    return res.status(400).json({msg : 'Please insert a name and email'});
  }
  members.push(newMember);
  //res.json(members);
  res.redirect('/');
});

//update member

router.put('/:id', (req, res) =>{
  const found = members.some(member => member.id === parseInt(req.params.id));

  if(found) {
    const updMember = req.body;
    members.forEach(member => {
      if(member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({msg: 'member update', member})
      }
    })
  }else {
    res.status(400).json ({msg: `member wit id: ${req.params.id} not found`});
  }
});

// delete

router.delete('/:id', (req, res) => {

  const found = members.some(member => member.id === parseInt(req.params.id));

  if(found) {
    res.json({
      msg:'member deleted',
      members: members.filter(member => member.id !== parseInt(req.params.id))});
  }else {
    res.status(400).json ({msg: `member wit id: ${req.params.id} not found`});
  }
});



module.exports = router;
