module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
  
    var router = require("express").Router();
    // Retrieve all Employees
    router.get("/", employees.findAll);
  };
  