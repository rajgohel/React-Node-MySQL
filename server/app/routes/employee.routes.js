module.exports = app => {
  const employees = require("../controllers/employee.controller.js");

  var router = require("express").Router();

  // Retrieve all Employees
  router.get("/", employees.findAll);

  // Create a new Employee
  router.post("/", employees.create);

  // Update a Employee with id
  router.put("/:id", employees.update);

  // Delete a Employee with id
  router.delete("/:id", employees.delete);

  app.use('/api/employees', router);
};
