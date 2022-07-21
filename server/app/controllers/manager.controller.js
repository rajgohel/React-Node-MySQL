const sendToken = require("../jwtToken");
const db = require("../models");
const bcrypt = require('bcryptjs');
const Manager = db.manager;
const Op = db.Sequelize.Op;

// Retrieve all Managers from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Manager.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving managers."
            });
        });
};

// Create and Save a new Manager
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.firstName) {
        res.status(400).send({
            message: "First Name can not be empty!"
        });
        return;
    }

    var condition = { email: { [Op.like]: `%${req.body.email}%` } };
    // Check User already exists or not
    let oldUser = await Manager.findOne({ where: condition });

    if (oldUser) {
        res.status(409).send({
            message: "User Already Exist. Please Login."
        });
        return;
    }

    // Create a Manager
    const manager = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: await bcrypt.hash(req.body.password, 10),
        address: req.body.address,
        dob: req.body.dob,
        company: req.body.company
    };

    // Save Manager in the database
    Manager.create(manager)
        .then(data => {
            res.status(200).send({
                message: "User registered."
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Manager."
            });
        });
};

// Login for manager
exports.loginuser = async (req, res) => {
    const { email, password } = req.body;

    //Check if email or password is entered by user
    if (!email || !password) {
        res.status(400).send({
            message: 'Please enter Password & email.'
        });
    }

    var condition = { email: { [Op.like]: `%${email}%` } };

    Manager.findOne({ where: condition })
        .then(async (manager) => {
            if (manager) {
                // Compare password
                let isPasswordValid = await bcrypt.compare(password, manager.dataValues.password);
                if (isPasswordValid) {
                    sendToken(manager, 200, res);
                }
                else {
                    res.status(500).send({
                        message: "Invalid Email or password."
                    });
                }
            }
            else {
                res.status(404).send({
                    message: "User not found."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Invalid Email or password."
            });
        });
};
