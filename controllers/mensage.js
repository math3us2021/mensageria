const Orders = require('../models/orders');
const Customers = require('../models/customer');
const OrderItems = require('../models/orderItems');
const { sequelize } = require('../db');

async function saveOrderToDatabase(data) {
    console.log("Recebi Mensagem");
    try {
        // return
        // await sequelize.transaction(async (t) => {
        const userId = await saveUser(data);
        const createOrder = await saveOrder(data, userId);
        const save_items = await saveItems(data, createOrder.id);
            // const userId = await saveUser(data, t);
            // const createOrder = await saveOrder(data, userId, t);
            // const save_items = await saveItems(data, createOrder.id, t);
            if (save_items) return true
            else return false
        // });
    } catch (error){
        console.error('Erro ao salvar pedido no banco de dados:', error);
    }
}

async function saveUser(data) {
    // console.log('Teste Usuário', customer);
    const verifyCustomer = await Customers.findOne({where: {id: data.customer.id}});
    if (!verifyCustomer) {
    console.log('Teste Usuário', data.customer.id, data.customer.name);
        const customer_create = await Customers.create({
            "id": data.customer.id,
            "name": data.customer.name
        });
        console.log('customer_create')
        return customer_create.id
    }
    return data.customer.id
}

async function saveOrder(data, customer_id) {
    const {uuid, created_at, type} = data;

    return await Orders.create({
        "uuid_order": uuid,
        "customers_id": customer_id,
        "order_date": created_at,
        "type": type,
        "created_at": new Date()
    });

    // return await Orders.create(order, {transaction: t});
}

async function saveItems(data, order_id) {
    const items = data.items.map(item => ({
        id_item: item.id,
        sku_id: item.sku.id,
        sku_value: item.sku.value,
        quantity: item.quantity,
        category_id: item.category.id,
        sub_category_id: item.category.sub_category.id,
        order_id: order_id
    }));

    return await OrderItems.bulkCreate(items);
    // return await OrderItems.bulkCreate(items, {transaction: t});
}
module.exports = { saveOrderToDatabase };