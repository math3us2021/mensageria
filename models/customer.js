const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../db');


class Customer extends Model {
}

Customer.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'Customer',
        tableName: 'customers',
        timestamps: false
    });
module.exports = Customer;
