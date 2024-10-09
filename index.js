const express = require('express');
/**
 * mysqljs doesn't support the new default authentication method
(caching_sha2_password) of MySQL 8. Use mysql2 instead
 */
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 1337;

// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

const SECRET_KEY =
  '9bbfcb41fac77c526c39144a247bd1dfa2eea762a630ad746ff58c920e8e06f8';

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(cors());
// Node mysql prevents running of multiple statement by default

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'nodejsdb',
  multipleStatements: false
});

connection.connect(function (err) {
  if (!err) return console.log('Connected to database!');
  return console.error('Error in connection!');
});

// Get All Employees
app.get('/employees', (req, res) => {
  const id = req.query.id;

  const sql = 'SELECT * FROM employees';
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Error: 'Get employee error in sql' });
    return res.json({
      Status: 'Success',
      Result: result
    });
  });
});

// Get An Employee
app.get('/employees/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM employees WHERE id = ?';
  const sql2 = 'SELECT * FROM employees WHERE id = ' + id;

  // connection.query(sql, [id], (err, result) => {
  //   if (err) return res.json({ Error: 'Get employee error in sql' });
  //   return res.json({
  //     Status: 'Success',
  //     Result: result
  //   });
  // });

  connection.query(sql2, (err, result) => {
    if (err) return res.json({ Error: 'Get employee error in sql' });
    return res.json({
      Status: 'Success',
      Result: result
    });
  });
});

//Update Employee
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, address, salary } = req.body;

  const sql =
    'UPDATE employees SET `name` = ?, `email` = ?, `address` = ?, `salary` = ? WHERE id = ?';

  const sql2 = 'UPDATE employees SET ? WHERE `id` = ' + id;

  const values = [
    req.body.name,
    req.body.email,
    req.body.address,
    req.body.salary
  ];

  const employeeData = {
    name,
    email,
    address,
    salary
  };

  // spread operator allows you to copy all elements of an array into
  // another array or function arguments.

  // connection.query(sql, [...values, id], (err) => {
  //   if (err) return res.json({ Error: err });
  //   return res.json({ Message: 'Employee updated!' });
  // });

  connection.query(sql2, employeeData, (err) => {
    if (err) return res.json({ Error: err });
    return res.json({ Message: 'Employee updated!' });
  });
});

//Delete Employee
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM employees WHERE id = ' + id;
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Error: 'Delete employee error in sql' });
    return res.json({
      Status: 'Success'
    });
  });
});

// Admin Count
app.get('/adminCount', (req, res) => {
  const sql = 'SELECT COUNT(id) AS admins FROM users';

  connection.query(sql, (err, result) => {
    if (err) return res.json({ Error: 'Error in running sql' });
    return res.json(result);
  });
});

// Employees Count
app.get('/employeeCount', (req, res) => {
  const sql = 'SELECT COUNT(id) AS employees FROM employees';

  connection.query(sql, (err, result) => {
    if (err) return res.json({ Error: 'Error in running query' });
    return res.json(result);
  });
});

// Employee Salary Sum
app.get('/salary', (req, res) => {
  const sql = 'SELECT SUM(salary) AS sumOfSalary FROM employees';
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Error: 'Error in running query' });
    return res.json(result);
  });
});

// Create Employee
app.post('/employees', (req, res) => {
  const { name, address, email, salary } = req.body;
  const employeeData = {
    name,
    email,
    address,
    salary
  };

  const sql =
    'INSERT INTO employees (name, email, address, salary) VALUES (?,?,?,?)';

  const sql2 = 'INSERT INTO employees SET ?';

  // connection.query(sql, [name, email, address, salary], (err, result) => {
  //   if (result) {
  //     res.json({ Message: 'Employee Created Successfully!' });
  //   } else {
  //     res.send({ message: 'Enter Correct Details!' });
  //   }
  // });

  connection.query(sql2, employeeData, (err, result) => {
    if (err) return res.json({ message: 'Enter Correct Details!' });
    return res.json(result);
  });
});

// Login User
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  connection.query(sql, [email], (err, result) => {
    if (err)
      return res.json({
        Error: 'Error in running query'
      });

    if (result.length > 0) {
      bcrypt.compare(
        password.toString(),
        result[0].password,
        (err, response) => {
          if (err) return res.json({ Error: 'Password Error' });
          if (response) {
            const token = jwt.sign({ role: 'admin' }, SECRET_KEY, {
              expiresIn: '1d'
            });
            return res.json({
              Status: 'Success',
              Token: token
            });
          } else {
            res.json({ Error: 'Wrong Password' });
          }
        }
      );
    } else {
      return res.json({
        Error: 'Wrong email or password'
      });
    }
  });
});

// Register New User
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;

  const sql = 'INSERT INTO users (`name`, `email`,`password`) VALUES(?)';
  bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
    if (err) return res.json({ Error: 'Error in hasing password' });

    const values = [name, email, hash];

    connection.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: 'Error in query' });
      return res.json({
        message: 'User Created Successfully!'
      });
    });
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
