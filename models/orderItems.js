const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db');
const Orders = require('./orders');


class OrderItems extends Model {}
OrderItems.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sku_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_item :{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sku_value: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sub_category_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'OrderItems',
    tableName: 'order_items',
    timestamps: false
});


module.exports = OrderItems;