const db = require('../db');
const Orders = require('../models/orders');
const Customers = require('../models/customer');
const OrderItems = require('../models/orderItems');

exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const resp = await Orders.findAll({
            where: { uuid_order: orderId },
            attributes: ['uuid_order', 'created_at', 'type'],
            include: [
                {
                    model: Customers,
                    as: 'customer',
                },
                {
                    model: OrderItems,
                    as: 'items',
                    attributes: ['id_item', 'sku_id', 'sku_value', 'quantity', 'category_id', 'sub_category_id'],
                }
            ]
        });
        if (!resp) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(resp);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.getAllOrders = async (req, res) => {
    const { customer_id } = req.query;
    if (customer_id) {
        try {
            const resp = await Orders.findAll({
                attributes: ['uuid_order', 'created_at', 'type'],
                include: [
                    {
                        model: Customers,
                        as: 'customer',
                        where: {
                            id: customer_id
                        }
                    },
                    {
                        model: OrderItems,
                        as: 'items',
                        attributes: ['id_item', 'sku_id', 'sku_value', 'quantity', 'category_id', 'sub_category_id'],
                    }
                ]
            });
            res.status(200).json(resp);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    const { item_id } = req.query;
    if (item_id) {
        try {
            const resp = await Orders.findAll({
            attributes: ['uuid_order', 'created_at', 'type'],
            include: [
                {
                    model: Customers,
                    as: 'customer',
                },
                {
                    model: OrderItems,
                    as: 'items',
                    attributes: ['id_item', 'sku_id', 'sku_value', 'quantity', 'category_id', 'sub_category_id'],
                    where: {
                        id_item: item_id
                    }
                }
            ]
            });
            res.status(200).json(resp);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    if (!customer_id && !item_id){
        try {
            const resp = await Orders.findAll({
                attributes: ['uuid_order', 'created_at', 'type'],
                include: [
                    {
                        model: Customers,
                        as: 'customer',
                    },
                    {
                        model: OrderItems,
                        as: 'items',
                        attributes: ['id_item', 'sku_id', 'sku_value', 'quantity', 'category_id', 'sub_category_id'],
                    }
                ]
            });
            res.status(200).json(resp);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

};