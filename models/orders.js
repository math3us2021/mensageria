const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db');
const Customers = require('./customer');
const OrderItems = require('./orderItems');

    class Orders extends Model {}
        Orders.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            uuid_order: {
                type: DataTypes.STRING,
                allowNull: false
            },
            customers_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            order_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Orders',
            tableName: 'orders',
            timestamps: false
        });

    Orders.belongsTo(Customers , { foreignKey: 'customers_id', as: 'customer' });
Orders.hasMany(OrderItems, { foreignKey: 'order_id', as: 'items' });

    module.exports = Orders;