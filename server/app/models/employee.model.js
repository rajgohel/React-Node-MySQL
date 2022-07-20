module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        }
    });

    return Employee;
};
