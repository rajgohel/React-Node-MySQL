module.exports = (sequelize, Sequelize) => {
    const Manager = sequelize.define("manager", {
        email: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.STRING
        },
        company: {
            type: Sequelize.STRING
        }
    });

    return Manager;
};
