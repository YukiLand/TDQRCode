const express = require("express");
const router = express.Router();
// use fs to read and write to database.json
const { existsSync, readFileSync, writeFileSync } = require('fs');

router.get('/user', async (req, res) => {

    //get users form database.json
    const database = readFileSync('./database.json', 'utf8');
    const users = JSON.parse(database);

    res.send(users); 
});

router.post('/user', async (req, res) => {  

    const database = readFileSync('./database.json', 'utf8');
    const users = JSON.parse(database);
    users.push(req.body);
    writeFileSync('database.json', JSON.stringify(users));

  return res;
});

router.delete('/user/:id', async (req, res) => {
  const database = readFileSync('./database.json', 'utf8');
  const users = JSON.parse(database);
  const id = req.params.id;
  const index = users.findIndex(user => user.email === id);
  users.splice(index, 1);
  writeFileSync('database.json', JSON.stringify(users));
  return res;
});



module.exports = router;
