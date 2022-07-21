const authToken = require("../middlewares/authToken");

module.exports = app => {
  const employees = require("../controllers/employee.controller.js");

  var router = require("express").Router();

  // Retrieve all Employees
  router.get("/", authToken, employees.findAll);

  // Create a new Employee
  router.post("/", authToken, employees.create);

  // Update a Employee with id
  router.put("/:id", authToken, employees.update);

  // Delete a Employee with id
  router.delete("/:id", authToken, employees.delete);

  app.use('/api/employees', router);
};
