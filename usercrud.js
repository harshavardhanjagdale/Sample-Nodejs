const conn = require("./config");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  let id = req?.query?.id;
  console.log(req.query.id);
  if (id) {
    conn.query(`SELECT * FROM users WHERE id=${id}`, (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.status(200).json(data);
      }
    });
  } else {
    conn.query(`SELECT * FROM users`, (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    });
  }
});

app.post("/users", (req, res) => {
  console.log("hi");
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let email = req.body.email;
  if (!email) {
    res.status(400).json("please enter email");
  }
  if (!firstName) {
    res.status(400).json("please enter first name");
  }
  if (!lastName) {
    res.status(400).json("please enter last name");
  }

  conn.query(
    `Insert into users (firstName,lastName,email) values('${firstName}','${lastName}','${email}')`,
    (err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

app.put("/users/:id", (req, res) => {
  console.log("hi");
  let id = req.params.id;
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let email = req.body.email;
  conn.query(
    `update users set firstName='${firstName}',lastName='${lastName}',email='${email}' where id=${id}`,
    (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    }
  );
});

app.delete("/users/:id", (req, res) => {
  console.log("hi");
  let id = req.params.id;
  if (id) {
    conn.query(`delete from users where id=${id}`, (err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(data);
      }
    });
  }
});

app.listen(3000);
