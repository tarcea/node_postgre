const express = require('express');
const app = express();
const db = require('./queries');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(express.json())

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.listen(port, () => console.log(`server up on port ${port}`));