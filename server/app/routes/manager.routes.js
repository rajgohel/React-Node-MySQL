module.exports = app => {
    const manager = require("../controllers/manager.controller.js");
  
    var router = require("express").Router();
  
    // Login User
    router.post("/login", manager.loginuser);

    // Sign Up User
    router.post("/signUp", manager.create);
  
    app.use('/api/manager', router);
  };
  