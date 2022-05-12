const router = require('express').Router()
const db = require("../../db");

router.post("/createUser", (req, res) => {
	try {
	  const inputs = req.body;
	  let users = db.users || [];
	  users = [inputs, ...users];
	  db.users = users;
	  return res.status(201).json({ message: `created user successfully` });
	} catch (error) {
	  return res.status(500).json({ message: `internal server error` });
	}
  });
  
  router.get("/getUsers", (req, res) => {
	try {
	  const users = db.users || [];
	  if (users.length < 1) {
		throw new Error("no-users-found");
	  }
	  return res.status(201).json(users);
	} catch (error) {
	  if (error.toString().match("no-users-found")) {
		return res.status(400).json({ message: `No Users Found` });
	  }
	  return res.status(500).json({ message: `internal server error` });
	}
  });
  
  router.get("/getUser/:id", (req, res) => {
	try {
	  const users = db.users || [];
	  const { id } = req.params;
	  let user;
	  users.forEach((u) => {
		if (u.id == id) {
		  user = u;
		}
	  });
	  if (user) {
		return res.status(201).json(user);
	  }
	  throw new Error("failed-to-get");
	} catch (error) {
	  if (error.toString().match("failed-to-get")) {
		return res.status(400).json({ message: `failed to get user` });
	  }
	  return res.status(500).json({ message: `server error` });
	}
  });
  
  router.put("/updateUser/:id", (req, res) => {
	try {
	  let users = db.users || [];
	  const { id } = req.params;
	  const inputs = req.body;
	  const indexOfUser = users.findIndex((u) => {
		return u.id == id;
	  });
	  if (indexOfUser == -1) {
		throw new Error("no-user-found");
	  }
	  users[indexOfUser] = inputs;
	  users[indexOfUser].id = id;
	  db.users = users;
	  return res.status(201).json({ message: `updated user successfully` });
	} catch (error) {
	  if (error.toString().match("no-user-found")) {
		return res.status(400).json({ message: `no user found` });
	  }
	  return res.status(500).json({ message: `internal server error` });
	}
  });
  
  router.put("/deleteUser/:id", (req, res) => {
	try {
	  let users = db.users || [];
	  const { id } = req.params;
	  const indexOfUser = users.findIndex((u) => {
		return u.id == id;
	  });
	  if (indexOfUser == -1) {
		throw new Error("no-user-found");
	  }
	  users.splice(indexOfUser, 1);
	  db.users = users;
	  return res.status(201).json({ message: `deleted user successfully` });
	} catch (error) {
	  if (error.toString().match("no-user-found")) {
		return res.status(400).json({ message: `no user found` });
	  }
	  return res.status(500).json({ message: `internal server error` });
	}
  });
  
  module.exports = router