const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// GET all users
const getUsers = async (req, res) => {
  const data = await pool.query('SELECT * FROM users ORDER BY id ASC');

  try {
    res.status(200).json(data.rows)
  }
  catch (err) {
    console.log(err)
  }
};

// GET one user by id
const getUserById = async (req, res) => {
  const id = parseInt(req.params.id)
  const data = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

  try {
    res.status(200).json(data.rows)
  }
  catch (err) {
    console.log(err)
  }
};

// POST a new user
const createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const data = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email]);
    res.status(201).send(`User added with ID: ${data.rows[0].id}`)
  }
  catch (err) {
    console.log(err)
  }
};

// PUT update a user
const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  try {
    const data = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 ', [name, email, id]);
    res.status(200).send(`User with ID: ${id} was modified`);
  }
  catch (err) {
    console.log(err)
  }
};

// DELETE a user
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(200).send(`User with ID: ${id} was deleted`);
  }
  catch (err) {
    console.log(err)
  }
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}